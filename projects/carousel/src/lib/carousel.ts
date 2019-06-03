import { ThemePalette } from '@angular/material';

export type Orientation = 'ltr' | 'rtl';

export interface MatCarouselSvgIconDefs{
  arrow_back: string,
  arrow_forward: string
}

export interface MatCarousel {
  // Animations.
  timings: string;
  autoplay: boolean;
  interval: number;
  // Navigation.
  loop: boolean;
  hideArrows: boolean;
  hideIndicators: boolean;
  // Appearance.
  color: ThemePalette;
  maxWidth: string;
  proportion: number;
  slides: number;
  svgIconDefs: MatCarouselSvgIconDefs;
  // Accessibility.
  useKeyboard: boolean;
  useMouseWheel: boolean;
  orientation: Orientation;
}
