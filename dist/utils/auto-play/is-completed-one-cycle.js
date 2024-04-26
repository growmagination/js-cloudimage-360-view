"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCompletedOneCycle = void 0;

var _autoPlayBehavior = require("../../constants/auto-play-behavior");

var isCompletedOneCycle = function isCompletedOneCycle(autoplayBehavior, activeImageX, activeImageY, amountX, amountY, isReversed) {
 // console.log(`Checking if completed one cycle: AutoplayBehavior=${autoplayBehavior}, ActiveImageX=${activeImageX}, ActiveImageY=${activeImageY}, AmountX=${amountX}, AmountY=${amountY}, IsReversed=${isReversed}`);
  switch (autoplayBehavior) {
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_XY:
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_Y:
      {
        var isReachedTheEdge = isReversed ? activeImageY === 1 : activeImageY === amountY;
     //   console.log(`SPIN_XY or SPIN_Y: isReachedTheEdge=${isReachedTheEdge}`);
        return isReachedTheEdge;
      }
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_X:
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_YX:
    default:
      {
        var _isReachedTheEdge = isReversed ? activeImageX === 1 : activeImageX === amountX;
      //  console.log(`SPIN_X or SPIN_YX or default: isReachedTheEdge=${_isReachedTheEdge}`);
        return _isReachedTheEdge;
      }
  }
};

exports.isCompletedOneCycle = isCompletedOneCycle;