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
  color: string;
  maxWidth: string;
  proportion: number;
  slides: number;
  // Accessibility.
  useMouseWheel: boolean;
  useKeyboard: boolean;
  rtl: boolean;
}
