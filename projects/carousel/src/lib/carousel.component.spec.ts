import 'hammerjs';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatCarouselComponent } from './carousel.component';
import { MatCarouselModule } from './carousel.module';
import { MatCarouselImage } from '@ngmodule/material-carousel/public_api';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'mat-carousel-test-wrapper-component',
  template: `
    <mat-carousel [autoplay]="false">
      <mat-carousel-slide *ngFor="let slide of slides" [image]="{altText: null, url: null}"></mat-carousel-slide>
    </mat-carousel>
  `
})
class MatCarouselTestWrapperComponent {
  public slides = new Array<never>(5);
}

describe('MatCarouselComponent', () => {
  let component: MatCarouselComponent;
  let fixture: ComponentFixture<MatCarouselTestWrapperComponent>;
  let carouselSlide:HTMLSpanElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatCarouselTestWrapperComponent],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCarouselModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCarouselTestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
    carouselSlide = fixture.debugElement.query(By.css('span.carousel-slide')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with index 0', () => {
    expect(component.currentIndex).toBe(0);
  });

  it('should have 5 children', () => {
    expect(component.slidesList.length).toBe(5);
  });

  it('should adjust itself to have 3 children', () => {
    component.slides = 3;
    expect(component.slidesList.length).toBe(3);
  });

  it('should change index to 1', () => {
    component.next();
    expect(component.currentIndex).toBe(1);
  });

  it('should change index to last element', () => {
    component.slideTo(component.slidesList.length - 1);
    expect(component.currentIndex).toBe(4);
  });

  it('should go from last to first slide', () => {
    component.slideTo(component.slidesList.length - 1);
    component.next();
    expect(component.currentIndex).toBe(0);
  });

  it('should go from first to last slide', () => {
    component.previous();
    expect(component.currentIndex).toBe(4);
  });

  it('should not loop to previous', () => {
    component.loop = false;
    component.previous();
    expect(component.currentIndex).toBe(0);
  });

  it('should have aria-label equal to supplied altText on slides', () => {
    const image: MatCarouselImage = {altText: 'alt text', url: 'url'};
    component.slidesList.forEach(slide => slide.image = image);
    fixture.detectChanges();
    expect(carouselSlide.getAttribute("aria-label")).toEqual(image.altText);
  })

  it('should not have aria-label on slides when altText is not supplied', () => {
    const image: MatCarouselImage = {altText: null, url: 'url'};
    component.slidesList.forEach(slide => slide.image = image);
    fixture.detectChanges();
    expect(carouselSlide.getAttribute("aria-label")).toBeNull();
  })
});
