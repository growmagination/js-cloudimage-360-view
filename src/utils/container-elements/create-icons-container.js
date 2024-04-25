"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIconsContainer = void 0;
var createIconsContainer = function createIconsContainer(innerBox) {
  var iconsContainer = document.createElement('div');
  iconsContainer.className = 'cloudimage-360-icons-container';
  innerBox.appendChild(iconsContainer);
  return iconsContainer;
};
exports.createIconsContainer = createIconsContainer;