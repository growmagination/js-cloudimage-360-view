"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fit = void 0;
var fit = function fit(contains) {
  return function (parentWidth, parentHeight, childWidth, childHeight) {
    var scale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var offsetX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.5;
    var offsetY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.5;
    var childRatio = childWidth / childHeight;
    var parentRatio = parentWidth / parentHeight;
    var width = parentWidth * scale;
    var height = parentHeight * scale;
    if (contains ? childRatio > parentRatio : childRatio < parentRatio) {
      height = width / childRatio;
    } else {
      width = height * childRatio;
    }
    return {
      width: width,
      height: height,
      offsetX: (parentWidth - width) * offsetX,
      offsetY: (parentHeight - height) * offsetY
    };
  };
};
exports.fit = fit;