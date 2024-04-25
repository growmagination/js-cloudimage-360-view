"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHotspotIconPosition = void 0;
var updateHotspotIconPosition = function updateHotspotIconPosition(container, initialDimensions, icon, xCoord, yCoord) {
  icon.style.visibility = 'visible';
  icon.style.opacity = 1;
  icon.style.zIndex = 100;
  icon.style.left = "".concat(-icon.offsetWidth / 2, "px");
  icon.style.top = "".concat(-icon.offsetHeight / 2, "px");
  var positionXRatio = container.offsetWidth / initialDimensions[0];
  var positionYRatio = container.offsetHeight / initialDimensions[1];
  var translateX = "".concat(positionXRatio * xCoord, "px");
  var translateY = "".concat(positionYRatio * yCoord, "px");
  icon.style.transform = "translate3d(".concat(translateX, ", ").concat(translateY, ", 0)");
};
exports.updateHotspotIconPosition = updateHotspotIconPosition;