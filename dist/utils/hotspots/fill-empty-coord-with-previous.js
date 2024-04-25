"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillEmptyCoordWithPrevious = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

var fillEmptyCoordWithPrevious = function fillEmptyCoordWithPrevious(positions, hotspotIndex, coord) {
  var coordIndexes = new Array(hotspotIndex);
  var intialValue = '0%';
  for (var i = coordIndexes.length - 1; i > -1; i--) {
    var _positions$i;
    var previousXCoord = (_positions$i = positions[i]) === null || _positions$i === void 0 ? void 0 : _positions$i[coord];
    if (previousXCoord) {
      return previousXCoord;
    }
  }
  return intialValue;
};
exports.fillEmptyCoordWithPrevious = fillEmptyCoordWithPrevious;