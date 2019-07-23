import { animate, style, AnimationBuilder } from '@angular/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef, EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy, Output,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ThemePalette } from '@angular/material';
import { interval, BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MatCarousel, Orientation, SvgIconOverrides } from './carousel';
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
  implements AfterContentInit, AfterViewInit, MatCarousel, OnDestroy {
  @Input() public timings = '250ms ease-in';
  @Input() public svgIconOverrides: SvgIconOverrides;

  @Input()
  public set autoplay(value: boolean) {
    this.autoplay$.next(value);
    this._autoplay = value;
  }

  @Input()
  public set interval(value: number) {
    this.interval$.next(value);
  }

  public get loop(): boolean {
    return this._loop;
  }
  @Input()
  public set loop(value: boolean) {
    this.loop$.next(value);
    this._loop = value;
  }

  @Input() public hideArrows = true;
  @Input() public hideIndicators = true;
  @Input() public color: ThemePalette = 'accent';

  public get maxWidth(): string {
    return this._maxWidth;
  }
  @Input()
  public set maxWidth(value: string) {
    this._maxWidth = value;
    this.maxWidth$.next();
  }

  @Input() public proportion = 25;

  @Input()
  public set slides(value: number) {
    this.slides$.next(value);
  }

  @Input() public useKeyboard = false;
  @Input() public useMouseWheel = false;

  public get orientation(): Orientation {
    return this._orientation;
  }
  @Input()
  public set orientation(value: Orientation) {
    this.orientation$.next(value);
    this._orientation = value;
  }

  @Output()
  public change: EventEmitter<number> = new EventEmitter<number>();

  public get currentIndex(): number {
    if (this.listKeyManager) {
      return this.listKeyManager.activeItemIndex;
    }

    return 0;
  }
  public get currentSlide(): MatCarouselSlideComponent {
    if (this.listKeyManager) {
      return this.listKeyManager.activeItem;
    }

    return null;
  }

  @ContentChildren(MatCarouselSlideComponent) public slidesList: QueryList<
    MatCarouselSlideComponent
  >;
  @ViewChild('carouselContainer') private carouselContainer: ElementRef<
    HTMLDivElement
  >;
  @ViewChild('carouselList') private carouselList: ElementRef<HTMLElement>;
  public listKeyManager: ListKeyManager<MatCarouselSlideComponent>;

  private _autoplay = true;
  private autoplay$ = new Subject<boolean>();

  private interval$ = new BehaviorSubject<number>(5000);
  private slides$ = new BehaviorSubject<number>(null);

  private _maxWidth = 'auto';
  private maxWidth$ = new Subject<never>();

  private _loop = true;
  private loop$ = new Subject<boolean>();

  private _orientation: Orientation = 'ltr';
  private orientation$ = new Subject<Orientation>();

  private timer$: Observable<number>;
  private timerStop$ = new Subject<never>();

  private destroy$ = new Subject<never>();
  private playing = false;

  constructor(
    private animationBuilder: AnimationBuilder,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  public ngAfterContentInit(): void {
    this.listKeyManager = new ListKeyManager(this.slidesList)
      .withVerticalOrientation(false)
      .withHorizontalOrientation(this._orientation)
      .withWrap(this._loop);

    this.listKeyManager.updateActiveItem(0);
    this.listKeyManager.change
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.playAnimation());
  }

  public ngAfterViewInit(): void {
    this.autoplay$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.stopTimer();
      this.startTimer(value);
    });

    this.interval$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.stopTimer();
      this.resetTimer(value);
      this.startTimer(this._autoplay);
    });

    this.maxWidth$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.slideTo(0));

    this.loop$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.listKeyManager.withWrap(value));

    this.orientation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.listKeyManager.withHorizontalOrientation(value));

    this.slides$
      .pipe(
        takeUntil(this.destroy$),
        filter(value => value && value < this.slidesList.length)
      )
      .subscribe(value => this.resetSlides(value));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public next(): void {
    this.goto(Direction.Right);
  }

  public previous(): void {
    this.goto(Direction.Left);
  }

  public slideTo(index: number): void {
    this.goto(Direction.Index, index);
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    if (this.useKeyboard && !this.playing) {
      this.listKeyManager.onKeydown(event);
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.stopTimer();
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.startTimer(this._autoplay);
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

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    // Reset carousel when window is resized
    // in order to avoid major glitches.
    this.slideTo(0);
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

  private isOutOfBounds(): boolean {
    const sign = this.orientation === 'rtl' ? -1 : 1;
    const left =
      sign *
      (this.carouselList.nativeElement.getBoundingClientRect().left -
        this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
          .left);
    const lastIndex = this.slidesList.length - 1;
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

    return elemBottom <= docViewBottom || elemTop >= docViewTop;
  }

  private getOffset(): number {
    const offset = this.listKeyManager.activeItemIndex * this.getWidth();
    const sign = this.orientation === 'rtl' ? 1 : -1;
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
      const rtl = this.orientation === 'rtl';

      switch (direction) {
        case Direction.Left:
          return rtl
            ? this.listKeyManager.setNextItemActive()
            : this.listKeyManager.setPreviousItemActive();
        case Direction.Right:
          return rtl
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
      this.change.emit(this.currentIndex);
      this.playing = false;
      this.renderer.setStyle(
        this.carouselList.nativeElement,
        'transform',
        translation
      );
      animation.destroy();
    });
    animation.play();
  }

  private resetSlides(slides: number): void {
    this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
  }

  private resetTimer(value: number): void {
    this.timer$ = interval(value);
  }

  private startTimer(autoplay: boolean): void {
    if (!autoplay) {
      return;
    }

    this.timer$
      .pipe(
        takeUntil(this.timerStop$),
        takeUntil(this.destroy$),
        filter(() => this.isVisible())
      )
      .subscribe(() => {
        this.listKeyManager.withWrap(true).setNextItemActive();
        this.listKeyManager.withWrap(this.loop);
      });
  }

  private stopTimer(): void {
    this.timerStop$.next();
  }
}
