# Changelog

### `v4.0.0`
* Change `speed` prop to `strengthMultiplier`
* Adds a hard dependency on using `react-dnd` which was theoretically
  optional before.
* Fix double dispatch of `onDragOver` prop
* Default strength functions always return 0 if the point is anywhere
  outside the box.

### `v3.2.0`
* Use `prop-types` package instead of deprecated `React.PropTypes`

### `v3.1.0`
* Add `onScrollChange` prop

### `v3.0.0`
* Export a higher order component instead of a component.
* Set displayName on component
* Hoist non-react static properties

##### Before (v2)
```js
import Scrollzone from 'react-dnd-scrollzone';
const zone = <Scrollzone />;
```

##### After (v3)
```js
import withScrolling from 'react-dnd-scrollzone';
const Scrollzone = withScrolling('div');
const zone = <Scrollzone />;
```

### `v2.0.0`
* Remove `buffer` prop.
* Add `horizontalStrength` and `verticalStrength` props.
* Add `createVerticalStrength` and `createHorizontalStrength` exports.
* Fix bug with strength calculations and large buffers.
* Fix bug with scrolling not always stopping when drop targets are nested.

##### Before (v1)
```js
import Scrollzone from 'react-dnd-scrollzone';
const zone = <Scrollzone buffer={300} />;
```

##### After (v2)
```js
import Scrollzone, { createVerticalStrength, createHorizontalStrength } from 'react-dnd-scrollzone';
const vStrength = createVerticalStrength(300);
const hStrength = createHorizontalStrength(300);
const zone = <Scrollzone verticalStrength={vStrength} horizontalStrength={hStrength} />;
```

### `v1.1.0`
* Initial release.
