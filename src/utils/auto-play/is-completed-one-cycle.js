"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCompletedOneCycle = void 0;
var _autoPlayBehavior = require("../../constants/auto-play-behavior");
var isCompletedOneCycle = function isCompletedOneCycle(autoplayBehavior, activeImageX, activeImageY, amountX, amountY, isReversed) {
  switch (autoplayBehavior) {
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_XY:
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_Y:
      {
        var isReachedTheEdge = isReversed ? activeImageY === 1 : activeImageY === amountY;
        if (isReachedTheEdge) return true;
        return false;
      }
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_X:
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_YX:
    default:
      {
        var _isReachedTheEdge = isReversed ? activeImageX === 1 : activeImageX === amountX;
        if (_isReachedTheEdge) return true;
        return false;
      }
  }
};
exports.isCompletedOneCycle = isCompletedOneCycle;