# Material Carousel
[![Build Status](https://travis-ci.org/gbrlsnchs/material2-carousel.svg?branch=master)](https://travis-ci.org/gbrlsnchs/material2-carousel)
[![npm version](https://badge.fury.io/js/%40ngmodule%2Fmaterial-carousel.svg)](https://badge.fury.io/js/%40ngmodule%2Fmaterial-carousel)
[![Live demo](https://img.shields.io/badge/demo-page-blue.svg)](https://gbrlsnchs.github.io/material2-carousel/)

## About
This package is a carousel component for Angular using Material Design.

### Installing
`npm install --save @ngmodule/material-carousel`

### Importing
```typescript
//...
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  // ...
  imports: [
    // ...
    MatCarouselModule,
    // ...
  ]
})
export class AppModule {}
```

## Usage
### `MatCarouselComponent`
```typescript
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
```
```html
<mat-carousel>
  ...
</mat-carousel>
```
#### Attributes
| Input              |  Type     | Description                                   | Default value     |
| ------------------ | --------- | --------------------------------------------- | :---------------: |
| `timings`          | `string`  | Slide animation timings.                      | `'250ms ease-in'` |
| `loop`             | `boolean` | Enable loop through arrows.                   | `true`            |
| `autoplay`         | `boolean` | Enable automatic sliding.                     | `true`            |
| `autoplayInterval` | `number`  | Interval time in milliseconds.                | `5000`            |
| `showArrows`       | `boolean` | Show navigation arrows.                       | `true`            |
| `showIndicators`   | `boolean` | Show navigation indicators.                   | `true`            |
| `awaitAnimation`   | `boolean` | Disable arrows while switching slides.        | `false`           |
| `proportion`       | `number`  | Height proportion compared to width.          | `25`              |
| `maxWidth`         | `string`  | Maximum width.                                |                   |
| `maxSlides`        | `number`  | Maximum slides. Exceeding slides are trimmed. |                   |
| `color`            | `string`  | Material color values of button elements.     | `'accent'`        |

### `MatCarouselSlide`
```typescript
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
```
```html
<mat-carousel>
  <mat-carousel-slide>
    ...
  </mat-carousel-slide>
</mat-carousel>
```
#### Attributes
| Input          | Type      | Description                   | Default value |
| -------------- | --------- | ----------------------------- | :-----------: |
| `image`        | `string`  | Image displayed in the slide. |               |
| `overlayColor` | `string`  | Color of the slide's overlay. | `'#00000040'` |
| `showOverlay`  | `boolean` | Toggle overlay on/off.        | `true`        |

## Contributing
### How to help
- For bugs and opinions, please [open an issue](https://github.com/gbrlsnchs/material2-carousel/issues/new)
- For pushing changes, please [open a pull request](https://github.com/gbrlsnchs/material2-carousel/compare)

### How to develop and test
#### Testing
`ng test carousel --watch false`
#### Running the demo application
`ng serve demo --source-map`
