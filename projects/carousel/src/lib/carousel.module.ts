import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatCarouselComponent } from './carousel.component';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { ModuleWithProviders } from '@angular/compiler/src/core';

// https://github.com/angular/angular/issues/10541#issuecomment-300761387
export class MatCarouselHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}
@NgModule({
  declarations: [MatCarouselComponent, MatCarouselSlideComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [MatCarouselComponent, MatCarouselSlideComponent]
})
export class MatCarouselModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MatCarouselModule,
      providers: [
        { provide: HAMMER_GESTURE_CONFIG, useClass: MatCarouselHammerConfig }
      ]
    };
  }
}
