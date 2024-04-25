"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHotspots = void 0;
var _createPopperInstace = require("../create-popper-instace");
var _createHotspotIcon = require("./create-hotspot-icon");
var _createPopup = require("./create-popup");
var createHotspots = function createHotspots(container, hotspotsProps) {
  hotspotsProps.forEach(function (hotspotProps) {
    var popupProps = hotspotProps.popupProps;
    var popup = (0, _createPopup.createPopup)(container, hotspotProps, popupProps);
    var popperInstance = (0, _createPopperInstace.createPopperInstance)(popup, popupProps, container);
    var hotspotIcon = (0, _createHotspotIcon.createHotspotIcon)(container, hotspotProps, popup, popperInstance);
    popperInstance.state.elements.reference = hotspotIcon;
    popperInstance.update();
  });
};
exports.createHotspots = createHotspots;