"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBoxShadow = void 0;
var createBoxShadow = function createBoxShadow(boxShadow, innerBox) {
  var nextBoxShadow = document.createElement('div');
  nextBoxShadow.className = 'cloudimage-360-box-shadow';
  nextBoxShadow.style.boxShadow = boxShadow;
  innerBox.appendChild(nextBoxShadow);
  return nextBoxShadow;
};
exports.createBoxShadow = createBoxShadow;