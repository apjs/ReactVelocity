'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.intBetween = intBetween;
exports.getCoords = getCoords;
function noop() {}

function intBetween(min, max, val) {
  return Math.floor(Math.min(max, Math.max(min, val)));
}

function getCoords(evt) {
  if (evt.type === 'touchmove') {
    return { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY };
  }

  return { x: evt.clientX, y: evt.clientY };
}