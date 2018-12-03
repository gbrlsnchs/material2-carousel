import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { animate, style, AnimationBuilder } from '@angular/animations';
import { interval, BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MatCarousel } from './carousel';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';

enum Direction {
  Left,
  Right,
  Index
}

@Component({
  selector: 'mat-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class MatCarouselComponent
  implements AfterContentInit, AfterViewInit, MatCarousel, OnDestroy, OnInit {
  @Input() public timings = '250ms ease-in';
  @Input() public loop = true;
  @Input() public autoplay = true;
  @Input() public autoplayInterval = 5000;
  @Input() public showArrows = true;
  @Input() public showIndicators = true;
  @Input() public proportion = 25;
  @Input() public maxWidth: string;
  @Input() public color = 'accent';
  @Input() public useMouseWheel = false;
  @Input() public useKeyboard = false;
  @Input() public rtl = false;
  @Input()
  public set maxSlides(value: number) {
    this.maxSlides$.next(value);
  }
  @ContentChildren(MatCarouselSlideComponent) public slides: QueryList<
    MatCarouselSlideComponent
  >;
  @ViewChild('carouselContainer') private carouselContainer: ElementRef<
    HTMLDivElement
  >;
  @ViewChild('carouselList') private carouselList: ElementRef<HTMLElement>;
  public listKeyManager: ListKeyManager<MatCarouselSlideComponent>;

  private interval$: Observable<number>;
  private intervalStop$ = new Subject<never>();
  private maxSlides$ = new BehaviorSubject<number>(null);
  private destroy$ = new Subject<never>();
  private playing = false;

  constructor(
    private animationBuilder: AnimationBuilder,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  public ngAfterContentInit(): void {
    this.maxSlides$
      .pipe(
        takeUntil(this.destroy$),
        filter(n => !!n)
      )
      .subscribe((value: number) => {
        this.resetSlides(value);
      });

    this.listKeyManager = new ListKeyManager(this.slides)
      .withVerticalOrientation(false)
      .withHorizontalOrientation(this.rtl ? 'rtl' : 'ltr')
      .withWrap(this.loop);

    this.listKeyManager.updateActiveItem(0);
    this.listKeyManager.change
      .pipe(takeUntil(this.destroy$))
      .subscribe(index => {
        this.playAnimation();
      });
  }

  public ngAfterViewInit(): void {
    this.startTimer();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.interval$ = interval(this.autoplayInterval);
  }

  public next(): void {
    this.goto(Direction.Right);
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    if (this.useKeyboard && !this.playing) {
      this.listKeyManager.onKeydown(event);
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.intervalStop$.next();
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.startTimer();
  }

  @HostListener('mousewheel', ['$event'])
  public onMouseWheel(event: MouseWheelEvent): void {
    if (this.useMouseWheel) {
      event.preventDefault(); // prevent window to scroll
      const Δ = Math.sign(event.wheelDelta);

      if (Δ < 0) {
        this.next();
      } else if (Δ > 0) {
        this.previous();
      }
    }
  }

  public onPan(event: any, slideElem: HTMLElement): void {
    let Δx = event.deltaX;
    if (this.isOutOfBounds()) {
      Δx *= 0.2; // decelerate movement;
    }

    this.renderer.setStyle(slideElem, 'cursor', 'grabbing');
    this.renderer.setStyle(
      this.carouselList.nativeElement,
      'transform',
      this.getTranslation(this.getOffset() + Δx)
    );
  }

  public onPanEnd(event: any, slideElem: HTMLElement): void {
    this.renderer.removeStyle(slideElem, 'cursor');

    if (
      !this.isOutOfBounds() &&
      Math.abs(event.deltaX) > this.getWidth() * 0.25
    ) {
      if (event.deltaX <= 0) {
        this.next();
        return;
      }
      this.previous();
      return;
    }
    this.playAnimation(); // slide back, don't change current index
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    // Reset carousel when window is resized
    // in order to avoid major glitches.
    this.listKeyManager.setFirstItemActive();
  }

  public previous(): void {
    this.goto(Direction.Left);
  }

  public slideTo(index: number): void {
    this.goto(Direction.Index, index);
  }

  private isOutOfBounds(): boolean {
    const sign = this.rtl ? -1 : 1;
    const left =
      sign *
      (this.carouselList.nativeElement.getBoundingClientRect().left -
        this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
          .left);
    const lastIndex = this.slides.length - 1;
    const width = -this.getWidth() * lastIndex;

    return (
      (this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
      (this.listKeyManager.activeItemIndex === lastIndex && left <= width)
    );
  }

  private isVisible(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const elem = this.carouselContainer.nativeElement;
    const docViewTop = window.pageYOffset;
    const docViewBottom = docViewTop + window.innerHeight;
    const elemOffset = elem.getBoundingClientRect();
    const elemTop = docViewTop + elemOffset.top;
    const elemBottom = elemTop + elemOffset.height;

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  private getOffset(): number {
    const offset = this.listKeyManager.activeItemIndex * this.getWidth();
    const sign = this.rtl ? 1 : -1;
    return sign * offset;
  }

  private getTranslation(offset: number): string {
    return `translateX(${offset}px)`;
  }

  private getWidth(): number {
    return this.carouselContainer.nativeElement.clientWidth;
  }

  private goto(direction: Direction, index?: number): void {
    if (!this.playing) {
      switch (direction) {
        case Direction.Left:
          return this.rtl
            ? this.listKeyManager.setNextItemActive()
            : this.listKeyManager.setPreviousItemActive();
        case Direction.Right:
          return this.rtl
            ? this.listKeyManager.setPreviousItemActive()
            : this.listKeyManager.setNextItemActive();
        case Direction.Index:
          return this.listKeyManager.setActiveItem(index);
      }
    }
  }

  private playAnimation(): void {
    const translation = this.getTranslation(this.getOffset());
    const factory = this.animationBuilder.build(
      animate(this.timings, style({ transform: translation }))
    );
    const animation = factory.create(this.carouselList.nativeElement);

    animation.onStart(() => (this.playing = true));
    animation.onDone(() => {
      this.intervalStop$.next();
      this.playing = false;
      this.renderer.setStyle(
        this.carouselList.nativeElement,
        'transform',
        translation
      );
      animation.destroy();
      this.startTimer();
    });
    animation.play();
  }

  private resetSlides(maxSlides: number): void {
    this.slides.reset(this.slides.toArray().slice(0, maxSlides));
  }

  private startTimer(): void {
    if (this.autoplay) {
      this.interval$
        .pipe(
          takeUntil(this.intervalStop$),
          takeUntil(this.destroy$),
          filter(() => this.isVisible())
        )
        .subscribe(() => this.listKeyManager.setNextItemActive());
    }
  }
}
