# react-dnd-scrollzone

Cross browser compatible scrolling containers for drag and drop interactions.

### [Basic Example](./examples/basic)

```js
import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import withScrolling from 'react-dnd-scrollzone';
import DragItem from './DragItem';
import './App.css';

const ScrollingComponent = withScrolling('div');

const ITEMS = [1,2,3,4,5,6,7,8,9,10];

export default class App extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <ScrollingComponent className="App">
          {ITEMS.map(n => (
            <DragItem key={n} label={`Item ${n}`} />
          ))}
        </ScrollingComponent>
      </DragDropContextProvider>
    );
  }
}
```

### Easing Example

```js
import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import withScrolling, { createHorizontalStrength, createVerticalStrength } from 'react-dnd-scrollzone';
import DragItem from './DragItem';
import './App.css';


const ScrollZone = withScrolling('ul');
const linearHorizontalStrength = createHorizontalStrength(150);
const linearVerticalStrength = createVerticalStrength(150);
const ITEMS = [1,2,3,4,5,6,7,8,9,10];

// this easing function is from https://gist.github.com/gre/1650294 and
// expects/returns a number between [0, 1], however strength functions
// expects/returns a value between [-1, 1]
function ease(val) {
  const t = val / 2 + 1; // [-1, 1] -> [0, 1]
  const easedT = t<.5 ? 2*t*t : -1+(4-2*t)*t;
  return easedT * 2 - 1; // [0, 1] -> [-1, 1]
}

function hStrength(box, point) {
  return ease(linearHorizontalStrength(box, point));
}

function vStrength(box, point) {
  return ease(linearVerticalStrength(box, point));
}

export default App(props) {
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <ScrollingComponent
        className="App"
        verticalStrength={vStrength}
        horizontalStrength={hStrength} >

        {ITEMS.map(n => (
          <DragItem key={n} label={`Item ${n}`} />
        ))}
      </ScrollingComponent>
    </DragDropContextProvider>
  );
}
```

### Virtualized Example

Since react-dnd-scrollzone utilizes the Higher Order Components (HOC) pattern, drag and drop scrolling behaviour can easily be added to existing components. For example to speedup huge lists by using [react-virtualized](https://github.com/bvaughn/react-virtualized) for a windowed view where only the visible rows are rendered:

```js
import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import withScrolling from 'react-dnd-scrollzone';
import { List } from 'react-virtualized';
import DragItem from './DragItem';
import './App.css';

const ScrollingVirtualList = withScrolling(List);

// creates array with 1000 entries
const ITEMS = Array.from(Array(1000)).map((e,i)=> `Item ${i}`);


export default App(props) {
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <ScrollingVirtualList
        className="App"
        height={600}
        width={800}
        rowCount={ITEMS.length}
        rowHeight={34}
        rowRenderer={
          ({ key, index, style }) => (
            <DragItem
              key={key}
              style={style}
              label={ITEMS[index]}
            />
          )
        }
       />
    </DragDropContextProvider>
  );
}
```


### API

#### `withScrolling`

A React higher order component with the following properties:

```js
const ScrollZone = withScrolling(String|Component);

<ScrollZone
  strengthMultiplier={Number}
  horizontalStrength={Function}
  verticalStrength={Function}
  onScrollChange={Function} >

  {children}
</Scrollzone>
```
Apply the withScrolling function to any html-identifier ("div", "ul" etc) or react component to add drag and drop scrolling behaviour.

 * `horizontalStrength` a function that returns the strength of the horizontal scroll direction
 * `verticalStrength` - a function that returns the strength of the vertical scroll direction
 * `strengthMultiplier` - strength multiplier, play around with this (default 30)
 * `onScrollChange` - a function that is called when `scrollLeft` or `scrollTop` of the component are changed. Called with those two arguments in that order.

The strength functions are both called with two arguments. An object representing the rectangle occupied by the Scrollzone, and an object representing the coordinates of mouse.

They should return a value between -1 and 1.
 * Negative values scroll up or left.
 * Positive values scroll down or right.
 * 0 stops all scrolling.

#### `createVerticalStrength(buffer)` and `createHorizontalStrength(buffer)`

These allow you to create linearly scaling strength functions with a sensitivity different than the default value of 150px.

##### Example

```js
import withScrolling, { createVerticalStrength, createHorizontalStrength } from 'react-dnd-scrollzone';

const Scrollzone = withScrolling('ul');
const vStrength = createVerticalStrength(500);
const hStrength = createHorizontalStrength(300);

// zone will scroll when the cursor drags within
// 500px of the top/bottom and 300px of the left/right
const zone = (
  <Scrollzone verticalStrength={vStrength} horizontalStrength={hStrength}>

  </Scrollzone>
);
```
