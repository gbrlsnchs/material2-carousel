export interface MatCarouselSlide {
  image: MatCarouselImage;
  overlayColor: string;
  hideOverlay: boolean;
  disabled: boolean;
}

export interface MatCarouselImage{
  url: string;
  altText: string;
}
