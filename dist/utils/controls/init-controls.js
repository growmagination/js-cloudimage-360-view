"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initControls = void 0;
var _addClass = require("../class-names/add-class");
var initControls = function initControls(controlsConfig, controlsTriggers) {
  var container = controlsConfig.container,
    controlReverse = controlsConfig.controlReverse,
    spinReverse = controlsConfig.spinReverse,
    stopAtEdges = controlsConfig.stopAtEdges;
  var onRightStart = controlsTriggers.onRightStart,
    onLeftStart = controlsTriggers.onLeftStart,
    onTopStart = controlsTriggers.onTopStart,
    onBottomStart = controlsTriggers.onBottomStart,
    onEventEnd = controlsTriggers.onEventEnd;
  var controlElements = {};
  var isReverse = controlReverse ? !spinReverse : spinReverse;
  var left = container.querySelectorAll('.cloudimage-360-left, .cloudimage-360-prev')[0];
  var right = container.querySelectorAll('.cloudimage-360-right, .cloudimage-360-next')[0];
  var top = container.querySelector('.cloudimage-360-top');
  var bottom = container.querySelector('.cloudimage-360-bottom');
  if (left) {
    left.style.display = 'block';
    left.addEventListener('mousedown', isReverse ? onRightStart : onLeftStart);
    left.addEventListener('touchstart', isReverse ? onRightStart : onLeftStart, {
      passive: true
    });
    left.addEventListener('mouseup', isReverse ? onEventEnd : onEventEnd);
    left.addEventListener('touchend', isReverse ? onEventEnd : onEventEnd);
    controlElements.left = left;
  }
  if (right) {
    right.style.display = 'block';
    right.addEventListener('mousedown', isReverse ? onLeftStart : onRightStart);
    right.addEventListener('touchstart', isReverse ? onLeftStart : onRightStart, {
      passive: true
    });
    right.addEventListener('mouseup', onEventEnd);
    right.addEventListener('touchend', onEventEnd);
    controlElements.right = right;
  }
  if (top) {
    top.style.display = 'block';
    top.addEventListener('mousedown', isReverse ? onBottomStart : onTopStart);
    top.addEventListener('touchstart', isReverse ? onBottomStart : onTopStart);
    top.addEventListener('mouseup', isReverse ? onEventEnd : onEventEnd);
    top.addEventListener('touchend', isReverse ? onEventEnd : onEventEnd);
    controlElements.top = top;
  }
  if (bottom) {
    bottom.style.display = 'block';
    bottom.addEventListener('mousedown', isReverse ? onTopStart : onBottomStart);
    bottom.addEventListener('touchstart', isReverse ? onTopStart : onBottomStart);
    bottom.addEventListener('mouseup', isReverse ? onEventEnd : onEventEnd);
    bottom.addEventListener('touchend', isReverse ? onEventEnd : onEventEnd);
    controlElements.bottom = bottom;
  }
  if (isReverse ? right : left) {
    if (stopAtEdges) {
      (0, _addClass.addClass)(isReverse ? right : left, 'not-active');
      (0, _addClass.addClass)(isReverse ? top : bottom, 'not-active');
    }
  }
  return controlElements;
};
exports.initControls = initControls;