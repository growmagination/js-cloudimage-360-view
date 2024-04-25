"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = void 0;
var addClass = function addClass(el, className) {
  var element = el || {};
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " ".concat(className);
  }
};
exports.addClass = addClass;