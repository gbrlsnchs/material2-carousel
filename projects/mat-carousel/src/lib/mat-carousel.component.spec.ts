import 'hammerjs';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatCarouselComponent } from './mat-carousel.component';
import { MatCarouselModule } from './mat-carousel.module';

@Component({
  selector: 'mat-carousel-test-wrapper-component',
  template: `
    <mat-carousel [autoplay]="false">
      <mat-carousel-item *ngFor="let item of items"></mat-carousel-item>
    </mat-carousel>
  `
})
class MatCarouselTestWrapperComponent {
  public items = new Array<never>(5);
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
    expect(component.items.length).toBe(5);
  });

  it('should adjust itself to have 3 children', () => {
    component.maxItems = 3;
    expect(component.items.length).toBe(3);
  });

  it('should change index to 1', () => {
    component.next();
    expect(component.currentIndex).toBe(1);
  });

  it('should change index to last element', () => {
    component.show(component.items.length - 1);
    expect(component.currentIndex).toBe(4);
  });

  it('should go from last to first item', () => {
    component.show(component.items.length - 1);
    component.next();
    expect(component.currentIndex).toBe(0);
  });

  it('should go from first to last item', () => {
    component.previous();
    expect(component.currentIndex).toBe(4);
  });

  it('should not loop to previous', () => {
    component.loop = false;
    component.previous();
    expect(component.currentIndex).toBe(0);
  });
});
