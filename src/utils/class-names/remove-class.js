"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeClass = void 0;
var removeClass = function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp("(^|\\b)".concat(className.split(' ').join('|'), "(\\b|$)"), 'gi'), ' ');
  }
};
exports.removeClass = removeClass;