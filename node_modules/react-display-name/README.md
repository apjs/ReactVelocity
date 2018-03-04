```javascript
npm install --save react-display-name
```

Get the displayName from a Component. This is a common pattern with React Higher Order Components (HoCs). This is a simple reusable utility to get the name of a component.

Usage:

```javascript
import {expect} from 'chai';
import React, {Component} from 'react';
import getDisplayName from 'react-display-name';

const container = (WrappedComponent) => {
  class Container extends Component {
    static displayName = `Container(${getDisplayName(WrappedComponent)})`;
    render() {
      return (
        <WrappedComponent />
      );
    }
  }
  return Container;
}

class HelloWorld extends Component {
  render() {
    return (
      <div>Hello</div>
    );
  }
}

const HelloWorldPrime = container(HelloWorld);

expect(getDisplayName(HelloWorldPrime)).to.equal('Container(HelloWorld)');
expect(HelloWorldPrime.displayName).to.equal('Container(HelloWorld)');
```
