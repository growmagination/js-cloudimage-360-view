"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCarouselImage = void 0;
var createCarouselImage = function createCarouselImage(image, imageIndex) {
  var carouselImage = document.createElement('img');
  carouselImage.className = 'cloudimage-360-carousel-image';
  carouselImage.setAttribute('src', image.src || '');
  carouselImage.setAttribute('alt', image.alt || 'more-info');
  if (!imageIndex) {
    carouselImage.setAttribute('data-active-image', '');
    carouselImage.className += ' active-image';
  }
  return carouselImage;
};
exports.createCarouselImage = createCarouselImage;