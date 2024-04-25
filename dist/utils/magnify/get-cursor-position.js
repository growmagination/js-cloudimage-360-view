"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCursorPosition = void 0;
var getCursorPosition = function getCursorPosition() {
  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
  var container = arguments.length > 1 ? arguments[1] : undefined;
  var x = 0;
  var y = 0;
  var a = container.getBoundingClientRect();
  x = event.pageX - a.left;
  y = event.pageY - a.top;
  x -= window.pageXOffset;
  y -= window.pageYOffset;
  return {
    x: x,
    y: y
  };
};
exports.getCursorPosition = getCursorPosition;