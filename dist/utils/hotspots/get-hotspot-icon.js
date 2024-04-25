"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotspotIcon = void 0;
var getHotspotIcon = function getHotspotIcon(anchorId) {
  var hotspotIconSelector = "[data-hotspot-icon-id=".concat(anchorId, "]");
  var hotspotIcon = document.querySelector(hotspotIconSelector);
  return hotspotIcon;
};
exports.getHotspotIcon = getHotspotIcon;