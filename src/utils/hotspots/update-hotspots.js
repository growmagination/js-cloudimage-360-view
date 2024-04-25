"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHotspots = void 0;
var _prepareHotspotsPositions = require("./prepare-hotspots-positions");
var _getHotspotIcon = require("./get-hotspot-icon");
var _updateHotspotIconPosition = require("./update-hotspot-icon-position");
var _hideHotspotIcon = require("./hide-hotspot-icon");
var _getHotspotOrientation = require("./get-hotspot-orientation");
var updateHotspots = function updateHotspots(container, hotspotsProps) {
  var activeImageX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var activeImageY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var movingDirection = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'x-axis';
  hotspotsProps.forEach(function (hotspotProps) {
    var positions = hotspotProps.positions,
      initialDimensions = hotspotProps.initialDimensions,
      orientation = hotspotProps.orientation,
      variant = hotspotProps.variant;
    var anchorId = variant.anchorId;
    var hotspotOriantaion = (0, _getHotspotOrientation.getHotspotOriantaion)(movingDirection);
    var currentImageIndex = orientation === 'x' ? activeImageX : activeImageY;
    var hotspotsPositions = (0, _prepareHotspotsPositions.prepareHotspotsPositions)(positions);
    var currentPosition = hotspotsPositions.find(function (hotspotPosition) {
      return hotspotPosition.imageIndex === currentImageIndex;
    });
    var hotspotIcon = (0, _getHotspotIcon.getHotspotIcon)(anchorId);
    if (currentPosition && hotspotOriantaion === orientation) {
      var _currentPosition$xCoo = currentPosition.xCoord,
        xCoord = _currentPosition$xCoo === void 0 ? 0 : _currentPosition$xCoo,
        _currentPosition$yCoo = currentPosition.yCoord,
        yCoord = _currentPosition$yCoo === void 0 ? 0 : _currentPosition$yCoo;
      (0, _updateHotspotIconPosition.updateHotspotIconPosition)(container, initialDimensions, hotspotIcon, xCoord, yCoord);
    } else {
      (0, _hideHotspotIcon.hideHotspotIcon)(hotspotIcon);
    }
  });
};
exports.updateHotspots = updateHotspots;