"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemSkipped = void 0;
var getItemSkipped = function getItemSkipped(currentPosition, movementStart, speedFactor) {
  var itemsSkipped = Math.floor((currentPosition - movementStart) / speedFactor) || 1;
  return itemsSkipped;
};
exports.getItemSkipped = getItemSkipped;