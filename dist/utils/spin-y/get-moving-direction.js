"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovingDirection = void 0;
var _orientations = require("../../constants/orientations");
var getMovingDirection = function getMovingDirection(isStartSpin, allowSpinY, prevPosition, nextPositions, currentMovingDirection) {
  var movingDirection = _orientations.ORIENTATIONS.CENTER;
  if (isStartSpin) return currentMovingDirection;
  var differenceInPositionX = Math.abs(prevPosition.x - nextPositions.x);
  var differenceInPositionY = Math.abs(prevPosition.y - nextPositions.y);
  var sensitivity = 10;
  if (differenceInPositionX > sensitivity) movingDirection = _orientations.ORIENTATIONS.X;
  if (differenceInPositionY > sensitivity && allowSpinY) movingDirection = _orientations.ORIENTATIONS.Y;
  return movingDirection;
};
exports.getMovingDirection = getMovingDirection;