"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveMagnifier = void 0;
var _getCursorPosition = require("./get-cursor-position");
var moveMagnifier = function moveMagnifier(e, containerConfig, glass) {
  var container = containerConfig.container,
    w = containerConfig.w,
    h = containerConfig.h,
    zoom = containerConfig.zoom,
    bw = containerConfig.bw,
    offsetX = containerConfig.offsetX,
    offsetY = containerConfig.offsetY;
  var x;
  var y;
  var pos = (0, _getCursorPosition.getCursorPosition)(e, container);
  x = pos.x;
  y = pos.y;
  if (x > container.offsetWidth - w / zoom) {
    x = container.offsetWidth - w / zoom;
  }
  if (x < w / zoom) {
    x = w / zoom;
  }
  if (y > container.offsetHeight - h / zoom) {
    y = container.offsetHeight - h / zoom;
  }
  if (y < h / zoom) {
    y = h / zoom;
  }
  glass.style.left = "".concat(x - w, "px");
  glass.style.top = "".concat(y - h, "px");
  var backgroundPosX = (x - offsetX) * zoom - w + bw;
  var backgroundPosY = (y - offsetY) * zoom - h + bw;
  glass.style.backgroundPosition = "-".concat(backgroundPosX, "px -").concat(backgroundPosY, "px");
};
exports.moveMagnifier = moveMagnifier;