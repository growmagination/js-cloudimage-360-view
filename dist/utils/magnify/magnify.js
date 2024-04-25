"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.magnify = void 0;
var _moveMagnifier = require("./move-magnifier");
var magnify = function magnify(container, offset, currentImage, glass, zoom) {
  var _ref = offset || {},
    _ref$x = _ref.x,
    offsetX = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    offsetY = _ref$y === void 0 ? 0 : _ref$y;
  var backgroundSizeX = (container.offsetWidth - offsetX * 2) * zoom;
  var backgroundSizeY = (container.offsetHeight - offsetY * 2) * zoom;
  glass.setAttribute('class', 'cloudimage-360-img-magnifier-glass');
  container.prepend(glass);
  glass.style.backgroundImage = "url('".concat(currentImage.src, "')");
  glass.style.backgroundSize = "".concat(backgroundSizeX, "px ").concat(backgroundSizeY, "px");
  var bw = 3;
  var w = glass.offsetWidth / 2;
  var h = glass.offsetHeight / 2;
  var containerConfig = {
    container: container,
    w: w,
    h: h,
    zoom: zoom,
    bw: bw,
    offsetX: offsetX,
    offsetY: offsetY
  };
  var MouseMoveHandler = function MouseMoveHandler(event) {
    (0, _moveMagnifier.moveMagnifier)(event, containerConfig, glass);
  };
  var touchHandler = function touchHandler(event) {
    (0, _moveMagnifier.moveMagnifier)(event, containerConfig, glass);
  };
  glass.addEventListener('mousemove', MouseMoveHandler);
  container.addEventListener('mousemove', MouseMoveHandler);
  glass.addEventListener('touchmove', touchHandler, {
    passive: true
  });
  container.addEventListener('touchmove', touchHandler, {
    passive: true
  });
};
exports.magnify = magnify;