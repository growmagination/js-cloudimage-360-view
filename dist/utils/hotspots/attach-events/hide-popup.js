"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hidePopup = void 0;
var hidePopup = function hidePopup(popup, isVisible) {
  if (!isVisible) {
    popup.removeAttribute('data-show');
    popup.removeAttribute('data-cloudimage-360-show');
  }
};
exports.hidePopup = hidePopup;