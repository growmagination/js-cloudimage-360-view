"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeChildFromParent = void 0;
var removeChildFromParent = function removeChildFromParent(parent, child) {
  if (parent && child) {
    try {
      parent.removeChild(child);
    } catch (_unused) {}
  }
};
exports.removeChildFromParent = removeChildFromParent;