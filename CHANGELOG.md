# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.5.1] - 2019-10-03
### Fixed
- Fix vertical scrolling on mobile devices (by [chriswnewman]).

## [0.5.0] - 2019-07-24
### Added
- Support for remote images (by [alerubis]).
- Event for changing slides (by [tiagoblackcode]).

### Fixed
- Prevent carousel buttons to submit forms (by [tiagoblackcode]).

## [0.4.0] - 2019-06-03
### Added
- Support for overriding icons with other SVG icons (by [lenart91]).

### Fixed
- Enable autoplay when carousel is partially visible.

## [0.3.1] - 2018-12-04
### Fixed
- Prevent cleanup when publishing via Travis CI. 

## [0.3.0] - 2018-12-04
### Added
- Keyboard navigation.
- Mouse navigation (via mouse wheel).
- Optional right-to-left orientation.

### Changed
- Layout for demo page.
- Make the carousel more reactive to changes.

## [0.2.1] - 2018-11-28
### Added
- Demo badge to README file.
- Publishing via Travis CI.

### Fixed
- Fix last slide panning being broken due to its parent's padding.
- Set a proper demo title.

## [0.2.0] - 2018-11-28
### Added
- `hammerjs` to peer dependencies.
- `docs` folder in order to have a demo at Github Pages.

### Changed
- Rename `backgroundImage` to `image`.

## [0.1.3] - 2018-11-27
### Fixed
- Copy license and README file to build directory via `npm run build`.

## [0.1.2] - 2018-11-27
### Added
- Missing NPM metadata.

### Changed
- Update README file.

## [0.1.1] - 2018-11-27
### Added
- This changelog file.

### Fixed
- Add license to `package.json`.

## 0.1.0 - 2018-11-27
### Added
- MIT License.
- Travis CI configuration file.
- Angular CLI files.
- Demo application project.

[0.5.0]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/gbrlsnchs/material2-carousel/compare/v0.1.0...v0.1.1

[lenart91]: https://github.com/lenart91
[alerubis]: https://github.com/alerubis
[tiagoblackcode]: https://github.com/tiagoblackcode
[chriswnewman]: https://github.com/chriswnewman
