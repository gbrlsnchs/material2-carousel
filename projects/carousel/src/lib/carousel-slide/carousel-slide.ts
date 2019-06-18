import { SafeStyle } from '@angular/platform-browser';

export interface MatCarouselSlide {
  image: SafeStyle;
  overlayColor: string;
  hideOverlay: boolean;
  disabled: boolean;
}
