"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModalDescription = void 0;
var createModalDescription = function createModalDescription(description) {
  var modalDescription = document.createElement('p');
  modalDescription.innerText = description;
  modalDescription.className = 'cloudimage-360-modal-description';
  return modalDescription;
};
exports.createModalDescription = createModalDescription;