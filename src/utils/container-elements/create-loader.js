"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLoader = void 0;
var createLoader = function createLoader(innerBox) {
  var loader = document.createElement('div');
  loader.className = 'cloudimage-360-loader';
  innerBox.appendChild(loader);
  return loader;
};
exports.createLoader = createLoader;