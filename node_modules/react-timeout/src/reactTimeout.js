var createReactClass = require('create-react-class')
var objectAssign = require('object-assign')
var hoistNonReactStatics = require('hoist-non-react-statics')

var createReactTimeout = function (React) {
  var GLOBAL = typeof window === 'undefined' ? global : window

  var setter = function (_setter, _clearer, array) {
    return function (callback, delta) {
      var id = _setter(function () {
        _clearer.call(this, id)
        callback.apply(this, arguments)
      }.bind(this), delta)

      if (!this[array]) {
        this[array] = [id]
      } else {
        this[array].push(id)
      }
      return id
    }
  }

  var clearer = function (_clearer, array) {
    return function (id) {
      if (this[array]) {
        var index = this[array].indexOf(id)
        if (index !== -1) {
          this[array].splice(index, 1)
        }
      }
      _clearer(id)
    }
  }

  var _timeouts = '_ReactTimeout_timeouts'
  var _clearTimeout = clearer(GLOBAL.clearTimeout, _timeouts)
  var _setTimeout = setter(GLOBAL.setTimeout, _clearTimeout, _timeouts)

  var _intervals = '_ReactTimeout_intervals'
  var _clearInterval = clearer(GLOBAL.clearInterval, _intervals)
  var _setInterval = setter(GLOBAL.setInterval, function () {}, _intervals)

  var _immediates = '_ReactTimeout_immediates'
  var _clearImmediate = clearer(GLOBAL.clearImmediate, _immediates)
  var _setImmediate = setter(GLOBAL.setImmediate, _clearImmediate, _immediates)

  var _rafs = '_ReactTimeout_rafs'
  var _cancelAnimationFrame = clearer(GLOBAL.cancelAnimationFrame, _rafs)
  var _requestAnimationFrame = setter(GLOBAL.requestAnimationFrame, _cancelAnimationFrame, _rafs)

  var cloneArray = function (a) {
    return (!a || typeof a.slice !== 'function') ? [] : a.slice(0)
  }

  var ReactTimeout = function (SourceComponent) {
    var Component = createReactClass({
      displayName: 'ReactTimeout',

      setTimeout: _setTimeout,
      clearTimeout: _clearTimeout,

      setInterval: _setInterval,
      clearInterval: _clearInterval,

      setImmediate: _setImmediate,
      clearImmediate: _clearImmediate,

      requestAnimationFrame: _requestAnimationFrame,
      cancelAnimationFrame: _cancelAnimationFrame,

      componentWillUnmount: function () {
        cloneArray(this[_timeouts]).forEach(this.clearTimeout)
        cloneArray(this[_intervals]).forEach(this.clearInterval)
        cloneArray(this[_immediates]).forEach(this.clearImmediate)
        cloneArray(this[_rafs]).forEach(this.cancelAnimationFrame)
      },

      getWrappedInstance: function () {
        return this.wrappedInstance;
      },

      render: function () {
        return React.createElement(
          SourceComponent,
          objectAssign(
            {},
            this.props,
            {
              ref: function (component) { this.wrappedInstance = component; }.bind(this),
              setTimeout: this.setTimeout,
              clearTimeout: this.clearTimeout,

              setInterval: this.setInterval,
              clearInterval: this.clearInterval,

              setImmediate: this.setImmediate,
              clearImmediate: this.clearImmediate,

              requestAnimationFrame: this.requestAnimationFrame,
              cancelAnimationFrame: this.cancelAnimationFrame
            }))
      }
    })
    return hoistNonReactStatics(Component, SourceComponent)
  }

  return ReactTimeout
}

module.exports = createReactTimeout
