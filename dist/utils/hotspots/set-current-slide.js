"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentSlide = void 0;
var setCurrentSlide = function setCurrentSlide(image, imageDot, popup) {
  var activeDotSelector = '[data-active-dot]';
  var activeImageSelector = '[data-active-image]';
  var previousActiveDot = popup.querySelector(activeDotSelector);
  var previousActiveImage = popup.querySelector(activeImageSelector);
  previousActiveDot.classList.remove('active-dot');
  previousActiveDot.removeAttribute('data-active-dot');
  previousActiveImage.classList.remove('active-image');
  previousActiveImage.removeAttribute('data-active-image');
  image.className += ' active-image';
  image.setAttribute('data-active-image', '');
  imageDot.className += ' active-dot';
  imageDot.setAttribute('data-active-dot', '');
};
exports.setCurrentSlide = setCurrentSlide;