"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareHotspotsPositions = void 0;
var _fillEmptyCoordWithPrevious = require("./fill-empty-coord-with-previous");
var prepareHotspotsPositions = function prepareHotspotsPositions(positions) {
  return positions.reduce(function (accumulate, current, currentIndex) {
    var isIncludesXcoord = !!(current !== null && current !== void 0 && current.xCoord);
    var isIncludesYcoord = !!(current !== null && current !== void 0 && current.yCoord);
    if (!isIncludesXcoord) {
      current.xCoord = (0, _fillEmptyCoordWithPrevious.fillEmptyCoordWithPrevious)(positions, currentIndex, 'xCoord');
    }
    if (!isIncludesYcoord) {
      current.yCoord = (0, _fillEmptyCoordWithPrevious.fillEmptyCoordWithPrevious)(positions, currentIndex, 'yCoord');
    }
    accumulate.push(current);
    return accumulate;
  }, []);
};
exports.prepareHotspotsPositions = prepareHotspotsPositions;