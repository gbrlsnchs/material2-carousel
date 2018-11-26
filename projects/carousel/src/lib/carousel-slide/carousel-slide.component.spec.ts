import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCarouselSlideComponent } from './carousel-slide.component';

describe('MatCarouselSlideComponent', () => {
  let component: MatCarouselSlideComponent;
  let fixture: ComponentFixture<MatCarouselSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatCarouselSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCarouselSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
