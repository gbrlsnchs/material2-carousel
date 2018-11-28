import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCarousel, MatCarouselSlide } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static readonly INSTALL_TEXT =
    'npm install @ngmodule/material-carousel';

  private static readonly defaultCarousel: MatCarousel = {
    timings: '250ms ease-in',
    loop: true,
    autoplay: true,
    autoplayInterval: 5000,
    showArrows: true,
    showIndicators: true,
    awaitAnimation: false,
    proportion: 25,
    maxWidth: undefined,
    maxSlides: undefined,
    color: 'accent'
  };
  private static defaultCarouselSlide: MatCarouselSlide = {
    image: undefined,
    overlayColor: '#00000040',
    showOverlay: true
  };

  constructor(private snackBar: MatSnackBar) {}

  public panels: DemoPanel[] = [
    {
      header: 'Default carousel',
      code: `
<mat-carousel>
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      ...AppComponent.defaultCarousel,
      header: 'No autoplay',
      code: `
<mat-carousel [autoplay]="false">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, autoplay: false },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'No loop',
      code: `
<mat-carousel [loop]="false">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, loop: false },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'No arrows',
      code: `
<mat-carousel [showArrows]="false">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, showArrows: false },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'No indicators',
      code: `
<mat-carousel [showIndicators]="false">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, showIndicators: false },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'Await animation',
      code: `
<mat-carousel [awaitAnimation]="false">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, awaitAnimation: false },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'Different overlay color',
      code: `
<mat-carousel>
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
    overlayColor="#ff000040"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel },
      slides: [
        { ...AppComponent.defaultCarouselSlide, overlayColor: '#ff000040' },
        { ...AppComponent.defaultCarouselSlide, overlayColor: '#ff000040' },
        { ...AppComponent.defaultCarouselSlide, overlayColor: '#ff000040' },
        { ...AppComponent.defaultCarouselSlide, overlayColor: '#ff000040' },
        { ...AppComponent.defaultCarouselSlide, overlayColor: '#ff000040' }
      ]
    },
    {
      header: 'No overlay',
      code: `
<mat-carousel>
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
    [showOverlay]="false"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel },
      slides: [
        { ...AppComponent.defaultCarouselSlide, showOverlay: false },
        { ...AppComponent.defaultCarouselSlide, showOverlay: false },
        { ...AppComponent.defaultCarouselSlide, showOverlay: false },
        { ...AppComponent.defaultCarouselSlide, showOverlay: false },
        { ...AppComponent.defaultCarouselSlide, showOverlay: false }
      ]
    },
    {
      header: 'With custom content',
      code: `
<mat-carousel>
  <mat-carousel-slide
    *ngFor="let slide of slides; let i = index"
    [image]="slide.image"
  >
    <div
      style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center"
    >
      <h1>Slider #{{ i + 1 }}</h1>
      <p>This is the text for slider #{{ i + 1 }}</p>
      <button mat-flat-button>Click me #{{ i + 1 }}</button>
    </div>
  </mat-carousel-slide>
</mat-carousel>
      `,
      hasContent: true,
      carousel: { ...AppComponent.defaultCarousel },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'With limit of slides',
      code: `
<mat-carousel maxSlides="3">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, maxSlides: 3 },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'With custom proportion',
      code: `
<mat-carousel proportion="50">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, proportion: 50 },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'With maximum width',
      code: `
<mat-carousel maxWidth="720px">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, maxWidth: '720px' },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    },
    {
      header: 'With another color',
      code: `
<mat-carousel color="primary">
  <mat-carousel-slide
    *ngFor="let slide of slides"
    [image]="slide.image"
  ></mat-carousel-slide>
</mat-carousel>
      `,
      carousel: { ...AppComponent.defaultCarousel, color: 'primary' },
      slides: [
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide },
        { ...AppComponent.defaultCarouselSlide }
      ]
    }
  ];

  public copy(): void {
    const textarea = document.createElement('textarea');
    textarea.value = AppComponent.INSTALL_TEXT;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-99999px';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.snackBar.open('Command was successfully copied to clipboard!', '', {
      duration: 2000
    });
  }
}

interface DemoPanel {
  header: string;
  code: string;
  hasContent?: boolean;
  carousel: MatCarousel;
  slides: MatCarouselSlide[];
}
