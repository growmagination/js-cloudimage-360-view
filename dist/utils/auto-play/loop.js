"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loop = void 0;
var _autoPlayBehavior = require("../../constants/auto-play-behavior");
var loop = function loop(autoplayBehavior, spinY, reversed, loopTriggers) {
  var bottom = loopTriggers.bottom,
    top = loopTriggers.top,
    left = loopTriggers.left,
    right = loopTriggers.right;
  switch (autoplayBehavior) {
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_Y:
      if (reversed) {
        bottom();
      } else {
        top();
      }
      break;
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_XY:
      if (spinY) {
        if (reversed) {
          bottom();
        } else {
          top();
        }
      } else if (reversed) {
        left();
      } else {
        right();
      }
      break;
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_YX:
      if (spinY) {
        if (reversed) {
          bottom();
        } else {
          top();
        }
      } else if (reversed) {
        left();
      } else {
        right();
      }
      break;
    case _autoPlayBehavior.AUTOPLAY_BEHAVIOR.SPIN_X:
    default:
      if (reversed) {
        left();
      } else {
        right();
      }
  }
};
exports.loop = loop;