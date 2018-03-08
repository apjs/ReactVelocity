# React Timeout

[![Greenkeeper badge](https://badges.greenkeeper.io/plougsgaard/react-timeout.svg)](https://greenkeeper.io/) [![travis build](https://img.shields.io/travis/plougsgaard/react-timeout.svg)](https://travis-ci.org/plougsgaard/react-timeout) [![npm version](https://badge.fury.io/js/react-timeout.svg)](https://badge.fury.io/js/react-timeout)

> Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op.

> Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.

Seeing a lot of the above? If so this might be useful!

React Timeout is a higher order component for [React](https://github.com/facebook/react) and [React Native](https://github.com/facebook/react-native) providing the wrapped component with **safe** versions of

Set                     | Clear
------------------------|------------------------
`setTimeout`            | `clearTimeout`
`setInterval`           | `clearInterval`
`setImmediate`          | `clearImmediate`
`requestAnimationFrame` | `cancelAnimationFrame`

When the wrapped component is *unmounted*, any lingering timers will be canceled automatically.

# Installation

`npm install --save react-timeout`

## React / React Native

```javascript
import ReactTimeout from 'react-timeout'
```

# Examples

## ES6 Classes - "The Light Switch"

The component simulates a light switch. It has a state `on` which is `true` or `false`. When the button is clicked it waits `5000ms` before switching the `on` state.

```javascript
import React from 'react'
import ReactTimeout from 'react-timeout'

class LightSwitchExample extends React.Component {
  state = {
    on: false
  }
  toggle = () => {
    this.setState({ on: !this.state.on })
  }
  handleClick = (e) => {
    this.props.setTimeout(this.toggle, 5000) // call the `toggle` function after 5000ms
  }
  render () {
    return (
      <div style={{ backgroundColor: (this.state.on ? 'yellow' : 'gray') }}>
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    )
  }
}
export default ReactTimeout(LightSwitchExample)
```

If the component is unmounted before the `5000ms` is up, the timeout is canceled by `ReactTimeout`.

Had we just called the regular old `setTimeout`, the callback `toggle` would still fire and try setting the state of an unmounted component.

## Functional Stateless Components

```javascript
const Example = (props) => {
  return (
    <button
      onClick={() => props.setTimeout(..)}>Click me!</button>
  )
}
export default ReactTimeout(Example)
```

## With ES7 Annotations

```javascript
@ReactTimeout
class Example extends React.Component {
  render () {
    return (
      <button
        onClick={() => this.props.setTimeout(..)}>Click me!</button>
    )
  }
}
```

## To access the wrapped instance
If you need access to the component wrapped by `ReactTimeout`, use `component.getWrappedInstance()`.

# Something similar

## [react-timer-mixin](https://github.com/reactjs/react-timer-mixin)

The timer mixin recommended by the  [react-native](https://github.com/facebook/react-native) docs.

# Caveats

## React Native 0.17 and below

If you're using a version of React Native that is `0.17` or below you have to import from the `/native` namespace.

```javascript
import ReactTimeout from 'react-timeout/native' // only for react-native 0.17 or below
```
