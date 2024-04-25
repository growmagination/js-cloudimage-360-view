"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideHotspotsIcons = void 0;
var _hideHotspotIcon = require("./hide-hotspot-icon");
var hideHotspotsIcons = function hideHotspotsIcons() {
  var hotspotIconSelector = '[data-hotspot-icon-id]';
  var hotspotIcons = document.querySelectorAll(hotspotIconSelector) || [];
  hotspotIcons.forEach(function (hotspotIcon) {
    (0, _hideHotspotIcon.hideHotspotIcon)(hotspotIcon);
  });
};
exports.hideHotspotsIcons = hideHotspotsIcons;