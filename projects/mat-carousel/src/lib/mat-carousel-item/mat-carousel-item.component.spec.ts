import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCarouselItemComponent } from './mat-carousel-item.component';

describe('MatCarouselItemComponent', () => {
  let component: MatCarouselItemComponent;
  let fixture: ComponentFixture<MatCarouselItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatCarouselItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
