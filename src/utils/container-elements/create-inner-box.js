"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInnerBox = void 0;
var createInnerBox = function createInnerBox(container) {
  var innerBox = document.createElement('div');
  innerBox.className = 'cloudimage-360-inner-box';
  container.appendChild(innerBox);
  return innerBox;
};
exports.createInnerBox = createInnerBox;