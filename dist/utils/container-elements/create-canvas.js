"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanvas = void 0;
var createCanvas = function createCanvas(innerBox) {
  var canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.fontSize = '0';
  innerBox.appendChild(canvas);
  return canvas;
};
exports.createCanvas = createCanvas;