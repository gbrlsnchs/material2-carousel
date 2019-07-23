import 'hammerjs';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

  describe('@Output(change)', () => {
    beforeEach(() => {
      spyOn(component.change, 'emit');
      component.loop = true;
    });

    it('should emit when slideTo is called', fakeAsync(() => {
      const idx = (component.currentIndex + 1) % component.slidesList.length;
      component.slideTo(idx);
      tick();

      expect(component.change.emit).toHaveBeenCalledWith(idx);
    }));

    it('should emit when next is called', fakeAsync(() => {
      component.next();
      tick();

      expect(component.change.emit).toHaveBeenCalledWith(1);
    }));

    it('should emit when previous is called', fakeAsync(() => {
      component.previous();
      tick();

      expect(component.change.emit).toHaveBeenCalledWith(component.slidesList.length - 1);
    }));

    it('should emit when autoplay is set', fakeAsync(() => {
      component.autoplay = true;
      component.interval = 100;
      tick(100);

      component.autoplay = false;

      expect(component.change.emit).toHaveBeenCalledWith(1);
    }));
  });
});
