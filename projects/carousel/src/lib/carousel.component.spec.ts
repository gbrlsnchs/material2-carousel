import 'hammerjs';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatCarouselComponent } from './carousel.component';
import { MatCarouselModule } from './carousel.module';

@Component({
  selector: 'mat-carousel-test-wrapper-component',
  template: `
    <mat-carousel [autoplay]="false">
      <mat-carousel-slide *ngFor="let slide of slides"></mat-carousel-slide>
    </mat-carousel>
  `
})
class MatCarouselTestWrapperComponent {
  public slides = new Array<never>(5);
}

describe('MatCarouselComponent', () => {
  let component: MatCarouselComponent;
  let fixture: ComponentFixture<MatCarouselTestWrapperComponent>;

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
});
