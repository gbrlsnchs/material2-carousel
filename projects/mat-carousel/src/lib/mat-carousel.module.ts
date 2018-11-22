import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatCarouselComponent } from './mat-carousel.component';
import { MatCarouselItemComponent } from './mat-carousel-item/mat-carousel-item.component';

@NgModule({
  declarations: [MatCarouselComponent, MatCarouselItemComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [MatCarouselComponent, MatCarouselItemComponent]
})
export class MatCarouselModule {}
