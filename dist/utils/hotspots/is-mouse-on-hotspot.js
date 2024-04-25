"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMouseOnHotspot = void 0;
var isMouseOnHotspot = function isMouseOnHotspot() {
  var hotspotElementsSelector = '[data-cloudimage-360-show]';
  var hostpotElements = document.querySelectorAll(hotspotElementsSelector);
  return !!hostpotElements.length;
};
exports.isMouseOnHotspot = isMouseOnHotspot;