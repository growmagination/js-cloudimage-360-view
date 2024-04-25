"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotspotOriantaion = void 0;
var getHotspotOriantaion = function getHotspotOriantaion(orientation) {
  switch (orientation.toLowerCase()) {
    case 'x-axis':
      return 'x';
    case 'y-axis':
      return 'y';
    default:
      return 'x';
  }
};
exports.getHotspotOriantaion = getHotspotOriantaion;