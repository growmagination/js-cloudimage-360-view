"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModalTitle = void 0;
var createModalTitle = function createModalTitle(title) {
  var modalTitle = document.createElement('h4');
  modalTitle.innerText = title;
  modalTitle.className = 'cloudimage-360-modal-title';
  return modalTitle;
};
exports.createModalTitle = createModalTitle;