"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFullscreenModal = void 0;
var createFullscreenModal = function createFullscreenModal(container) {
  var fullscreenModal = document.createElement('div');
  fullscreenModal.className = 'cloudimage-360-fullscreen-modal';
  var fullscreenContainer = container.cloneNode();
  fullscreenContainer.style.height = '100%';
  fullscreenContainer.style.maxHeight = '100%';
  fullscreenModal.appendChild(fullscreenContainer);
  window.document.body.style.overflow = 'hidden';
  window.document.body.appendChild(fullscreenModal);
  return fullscreenContainer;
};
exports.createFullscreenModal = createFullscreenModal;