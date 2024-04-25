"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpeedFactor = void 0;
var getSpeedFactor = function getSpeedFactor(dragSpeed, amount, containerOffset) {
  var containerOffsetWidth = Math.max(containerOffset, 600);
  var speedFactor = dragSpeed / 150 * (36 / amount) * 25 * (containerOffsetWidth / 1500) || 1;
  return Math.floor(speedFactor);
};
exports.getSpeedFactor = getSpeedFactor;