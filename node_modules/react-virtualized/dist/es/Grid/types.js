import * as React from 'react';
import ScalingCellSizeAndPositionManager from './utils/ScalingCellSizeAndPositionManager';

var babelPluginFlowReactPropTypes_proptype_CellPosition = process.env.NODE_ENV === 'production' ? null : {
  columnIndex: require('prop-types').number.isRequired,
  rowIndex: require('prop-types').number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellPosition', {
  value: babelPluginFlowReactPropTypes_proptype_CellPosition,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRendererParams = process.env.NODE_ENV === 'production' ? null : {
  columnIndex: require('prop-types').number.isRequired,
  isScrolling: require('prop-types').bool.isRequired,
  isVisible: require('prop-types').bool.isRequired,
  key: require('prop-types').string.isRequired,
  parent: require('prop-types').object.isRequired,
  rowIndex: require('prop-types').number.isRequired,
  style: require('prop-types').object.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRendererParams', {
  value: babelPluginFlowReactPropTypes_proptype_CellRendererParams,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRenderer = process.env.NODE_ENV === 'production' ? null : require('prop-types').func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRenderer', {
  value: babelPluginFlowReactPropTypes_proptype_CellRenderer,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams = process.env.NODE_ENV === 'production' ? null : {
  cellCache: require('prop-types').object.isRequired,
  cellRenderer: require('prop-types').func.isRequired,
  columnSizeAndPositionManager: typeof ScalingCellSizeAndPositionManager === 'function' ? require('prop-types').instanceOf(ScalingCellSizeAndPositionManager).isRequired : require('prop-types').any.isRequired,
  columnStartIndex: require('prop-types').number.isRequired,
  columnStopIndex: require('prop-types').number.isRequired,
  deferredMeasurementCache: require('prop-types').object,
  horizontalOffsetAdjustment: require('prop-types').number.isRequired,
  isScrolling: require('prop-types').bool.isRequired,
  parent: require('prop-types').object.isRequired,
  rowSizeAndPositionManager: typeof ScalingCellSizeAndPositionManager === 'function' ? require('prop-types').instanceOf(ScalingCellSizeAndPositionManager).isRequired : require('prop-types').any.isRequired,
  rowStartIndex: require('prop-types').number.isRequired,
  rowStopIndex: require('prop-types').number.isRequired,
  scrollLeft: require('prop-types').number.isRequired,
  scrollTop: require('prop-types').number.isRequired,
  styleCache: require('prop-types').object.isRequired,
  verticalOffsetAdjustment: require('prop-types').number.isRequired,
  visibleColumnIndices: require('prop-types').object.isRequired,
  visibleRowIndices: require('prop-types').object.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams', {
  value: babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRangeRenderer = process.env.NODE_ENV === 'production' ? null : require('prop-types').func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRangeRenderer', {
  value: babelPluginFlowReactPropTypes_proptype_CellRangeRenderer,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellSizeGetter = process.env.NODE_ENV === 'production' ? null : require('prop-types').func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellSizeGetter', {
  value: babelPluginFlowReactPropTypes_proptype_CellSizeGetter,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellSize = process.env.NODE_ENV === 'production' ? null : require('prop-types').oneOfType([require('prop-types').func, require('prop-types').number]);
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellSize', {
  value: babelPluginFlowReactPropTypes_proptype_CellSize,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_NoContentRenderer = process.env.NODE_ENV === 'production' ? null : require('prop-types').func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NoContentRenderer', {
  value: babelPluginFlowReactPropTypes_proptype_NoContentRenderer,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_Scroll = process.env.NODE_ENV === 'production' ? null : {
  clientHeight: require('prop-types').number.isRequired,
  clientWidth: require('prop-types').number.isRequired,
  scrollHeight: require('prop-types').number.isRequired,
  scrollLeft: require('prop-types').number.isRequired,
  scrollTop: require('prop-types').number.isRequired,
  scrollWidth: require('prop-types').number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_Scroll', {
  value: babelPluginFlowReactPropTypes_proptype_Scroll,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange = process.env.NODE_ENV === 'production' ? null : {
  horizontal: require('prop-types').bool.isRequired,
  vertical: require('prop-types').bool.isRequired,
  size: require('prop-types').number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange', {
  value: babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_RenderedSection = process.env.NODE_ENV === 'production' ? null : {
  columnOverscanStartIndex: require('prop-types').number.isRequired,
  columnOverscanStopIndex: require('prop-types').number.isRequired,
  columnStartIndex: require('prop-types').number.isRequired,
  columnStopIndex: require('prop-types').number.isRequired,
  rowOverscanStartIndex: require('prop-types').number.isRequired,
  rowOverscanStopIndex: require('prop-types').number.isRequired,
  rowStartIndex: require('prop-types').number.isRequired,
  rowStopIndex: require('prop-types').number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_RenderedSection', {
  value: babelPluginFlowReactPropTypes_proptype_RenderedSection,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams = process.env.NODE_ENV === 'production' ? null : {
  // One of SCROLL_DIRECTION_HORIZONTAL or SCROLL_DIRECTION_VERTICAL
  direction: require('prop-types').oneOf(['horizontal', 'vertical']).isRequired,


  // One of SCROLL_DIRECTION_BACKWARD or SCROLL_DIRECTION_FORWARD
  scrollDirection: require('prop-types').oneOf([-1, 1]).isRequired,


  // Number of rows or columns in the current axis
  cellCount: require('prop-types').number.isRequired,


  // Maximum number of cells to over-render in either direction
  overscanCellsCount: require('prop-types').number.isRequired,


  // Begin of range of visible cells
  startIndex: require('prop-types').number.isRequired,


  // End of range of visible cells
  stopIndex: require('prop-types').number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams', {
  value: babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_OverscanIndices = process.env.NODE_ENV === 'production' ? null : {
  overscanStartIndex: require('prop-types').number.isRequired,
  overscanStopIndex: require('prop-types').number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_OverscanIndices', {
  value: babelPluginFlowReactPropTypes_proptype_OverscanIndices,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter = process.env.NODE_ENV === 'production' ? null : require('prop-types').func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter', {
  value: babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_Alignment = process.env.NODE_ENV === 'production' ? null : require('prop-types').oneOf(['auto', 'end', 'start', 'center']);
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_Alignment', {
  value: babelPluginFlowReactPropTypes_proptype_Alignment,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_VisibleCellRange = process.env.NODE_ENV === 'production' ? null : {
  start: require('prop-types').number,
  stop: require('prop-types').number
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_VisibleCellRange', {
  value: babelPluginFlowReactPropTypes_proptype_VisibleCellRange,
  configurable: true
});