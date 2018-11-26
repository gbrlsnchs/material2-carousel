import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Default settings</h1>
    <mat-carousel>
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>No autoplay</h1>
    <mat-carousel [autoplay]="false">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>No loop</h1>
    <mat-carousel [loop]="false">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>No arrows</h1>
    <mat-carousel [showArrows]="false">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>No indicators</h1>
    <mat-carousel [showIndicators]="false">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>Await animation</h1>
    <mat-carousel [awaitAnimation]="true">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>Different overlay color</h1>
    <mat-carousel>
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
        overlayColor="#ff000040"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>No overlay</h1>
    <mat-carousel>
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
        [showOverlay]="false"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>With custom content</h1>
    <mat-carousel>
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
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

    <h1>With maximum slides limit</h1>
    <mat-carousel maxSlides="3">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>Custom proportion</h1>
    <mat-carousel [proportion]="25">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>

    <h1>With maximum width</h1>
    <mat-carousel maxWidth="1280px">
      <mat-carousel-slide
        *ngFor="let slide of slides; let i = index"
        [backgroundImage]="'assets/demo' + (i + 1) + '.jpg'"
      ></mat-carousel-slide>
    </mat-carousel>
  `
})
export class AppComponent {
  public slides = new Array<never>(5);
}
