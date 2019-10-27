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
    MatCarouselModule.forRoot(),
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
| Input                 |  Type              | Description                                                                | Default value     |
| --------------------- | ------------------ | -------------------------------------------------------------------------- | :---------------: |
| `timings`             | `string`           | Timings for slide animation.                                               | `'250ms ease-in'` |
| `autoplay`            | `boolean`          | Enable automatic sliding.                                                  | `true`            |
| `interval`            | `number`           | Autoplay's interval in milliseconds.                                       | `5000`            |
| `loop`                | `boolean`          | Enable loop through arrows.                                                | `true`            |
| `hideArrows`          | `boolean`          | Hide navigation arrows.                                                    | `false`           |
| `hideIndicators`      | `boolean`          | Hide navigation indicators.                                                | `false`           |
| `color`               | `ThemePalette`     | Color palette from Material.                                               | `'accent'`        |
| `maxWidth`            | `string`           | Maximum width.                                                             | `'auto'`          |
| `maintainAspectRatio` | `boolean`          | If true, use `proportion` to determine height, else `slideHeight` is used. | `true`            |
| `proportion`          | `number`           | Height proportion compared to width.                                       | `25`              |
| `slideHeight`         | `string`           | Explicit slide height. Used when maintainAspectRatio is false.             | `'100%'`          |
| `slides`              | `number`           | Maximum amount of displayed slides.                                        |                   |
| `useKeyboard`         | `boolean`          | Enable keyboard navigation.                                                | `true`            |
| `useMouseWheel`       | `boolean`          | Enable navigation through mouse wheeling.                                  | `false`           |
| `orientation`         | `Orientation`      | Orientation of the sliding panel.                                          | `'ltr'`           |
| `svgIconOverrides`    | `SvgIconOverrides` | Override default carousel icons with registered SVG icons.                 |                   |

#### Size Considerations and Recommendations
By default, `maintainAspectRatio` is true, which means height is controlled through `proportion`.

If you want to have a carousel with constant height (regardless of width), you must set `maintainAspectRatio` to false.

By default, `slideHeight` is set to `100%`, which will not work if the parent element height isn't defined (i.e. relative heights do not work if the parent height is `auto`). In that case you could pass a valid css string for `slideHeight`. You can use any valid css height string like `100px` or `25vh`.

Play around with the [demo](https://gbrlsnchs.github.io/material2-carousel/) to see how you can use this carousel with or without explicit parent height.

**With parent elements that have height:auto**
* use `proportion` if you want a carousel that resizes responsively (this is the default configuration).
* use `maintainAspectRatio="false"` and a non-percentage `slideHeight` if you want a fixed height carousel.
* **DO NOT** use relative (%) values for `slideHeight`; the carousel will not render.

**With parent elements that have a set height**
* use `maintainAspectRatio="false"` if you want a fixed height carousel that fills the parent element (`slideHeight` is `100%` by default).
* **DO NOT** use `maintainAspectRatio="false"` **and** `slideHeight` (unless `slideHeight="100%"`); the carousel will not render correctly because the buttons and indicators will be positioned with respect to the parent.
* **DO NOT** use `proportion`; this will lead to gaps or unwanted overflow.

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
