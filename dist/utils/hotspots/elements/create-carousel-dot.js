"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCarouselDot = void 0;
var _setCurrentSlide = require("../set-current-slide");
var createCarouselDot = function createCarouselDot(image, imageIndex, popup) {
  var imageDot = document.createElement('button');
  imageDot.className = 'cloudimage-360-carousel-dot';
  imageDot.onclick = function () {
    return (0, _setCurrentSlide.setCurrentSlide)(image, imageDot, popup);
  };
  if (!imageIndex) {
    imageDot.className += ' active-dot';
    imageDot.setAttribute('data-active-dot', '');
  }
  return imageDot;
};
exports.createCarouselDot = createCarouselDot;