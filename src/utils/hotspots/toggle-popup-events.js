"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.togglePopupEvents = void 0;
var _ci = require("../../ci360.utils");
var _getHotspotIcon = require("./get-hotspot-icon");
var togglePopupEvents = function togglePopupEvents(hotspotsProps, event, isMouseDown) {
  var iClickOnHotspotIcon = event && (0, _ci.isTrue)(event.target, 'data-cloudimage-360-hotspot');
  if (iClickOnHotspotIcon) return;
  hotspotsProps.forEach(function (hotspotProps) {
    var variant = hotspotProps.variant;
    var anchorId = variant.anchorId;
    var hotspotIcon = (0, _getHotspotIcon.getHotspotIcon)(anchorId);
    hotspotIcon.style.pointerEvents = isMouseDown ? 'none' : 'all';
  });
};
exports.togglePopupEvents = togglePopupEvents;