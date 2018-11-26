import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatCarouselComponent } from './carousel.component';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';

@NgModule({
  declarations: [MatCarouselComponent, MatCarouselSlideComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [MatCarouselComponent, MatCarouselSlideComponent]
})
export class MatCarouselModule {}
