"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotspotPopupNode = void 0;
var getHotspotPopupNode = function getHotspotPopupNode(anchorId) {
  var hotspotPopupSelector = "[data-hotspot-popup-id=".concat(anchorId, "]");
  var hotspotPopup = document.querySelector(hotspotPopupSelector);
  return hotspotPopup;
};
exports.getHotspotPopupNode = getHotspotPopupNode;