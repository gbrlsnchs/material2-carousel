# Material Carousel
[![Build Status](https://travis-ci.org/gbrlsnchs/material2-carousel.svg?branch=master)](https://travis-ci.org/gbrlsnchs/material2-carousel)
[![npm version](https://badge.fury.io/js/%40ngmodule%2Fmaterial-carousel.svg)](https://badge.fury.io/js/%40ngmodule%2Fmaterial-carousel)
[![Live demo](https://img.shields.io/badge/demo-blue.svg)](https://gbrlsnchs.github.io/material2-carousel/)

## About
This package is a carousel component for Angular using Material Design.

Until `v1` is reached, breaking changes may be introduced.

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
| Input              |  Type              | Description                                                | Default value     |
| ------------------ | ------------------ | ---------------------------------------------------------- | :---------------: |
| `timings`          | `string`           | Timings for slide animation.                               | `'250ms ease-in'` |
| `autoplay`         | `boolean`          | Enable automatic sliding.                                  | `true`            |
| `interval`         | `number`           | Autoplay's interval in milliseconds.                       | `5000`            |
| `loop`             | `boolean`          | Enable loop through arrows.                                | `true`            |
| `hideArrows`       | `boolean`          | Hide navigation arrows.                                    | `false`           |
| `hideIndicators`   | `boolean`          | Hide navigation indicators.                                | `false`           |
| `color`            | `ThemePalette`     | Color palette from Material.                               | `'accent'`        |
| `maxWidth`         | `string`           | Maximum width.                                             | `'auto'`          |
| `proportion`       | `number`           | Height proportion compared to width.                       | `25`              |
| `slides`           | `number`           | Maximum amount of displayed slides.                        |                   |
| `useKeyboard`      | `boolean`          | Enable keyboard navigation.                                | `true`            |
| `useMouseWheel`    | `boolean`          | Enable navigation through mouse wheeling.                  | `false`           |
| `orientation`      | `Orientation`      | Orientation of the sliding panel.                          | `'ltr'`           |
| `svgIconOverrides` | `SvgIconOverrides` | Override default carousel icons with registered SVG icons. |                   |

### `MatCarouselSlideComponent`
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
| `hideOverlay`  | `boolean` | Toggle overlay on/off.        | `false`       |
| `disabled`     | `boolean` | Skip slide when navigating.   | `false`       |

## Contributing
### How to help
- For bugs and opinions, please [open an issue](https://github.com/gbrlsnchs/material2-carousel/issues/new)
- For pushing changes, please [open a pull request](https://github.com/gbrlsnchs/material2-carousel/compare)

### How to develop and test
#### Testing
`ng test carousel --watch false`
#### Running the demo application
`ng serve demo --source-map`
