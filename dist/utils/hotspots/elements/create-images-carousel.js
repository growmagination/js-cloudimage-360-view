"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImagesCarousel = void 0;
var _createCarouselDot = require("./create-carousel-dot");
var _createCarouselImage = require("./create-carousel-image");
var createImagesCarousel = function createImagesCarousel(images, popup, container) {
  var imagesCarousel = document.createElement('div');
  var carouselDots = document.createElement('div');
  imagesCarousel.className = 'cloudimage-360-images-carousel';
  imagesCarousel.style.maxWidth = "".concat(container.offsetWidth, "px");
  carouselDots.className = 'cloudimage-360-carousel-dots';
  images.forEach(function (image, imageIndex) {
    var carouselImage = (0, _createCarouselImage.createCarouselImage)(image, imageIndex);
    var carouselDot = (0, _createCarouselDot.createCarouselDot)(carouselImage, imageIndex, popup);
    carouselDots.appendChild(carouselDot);
    imagesCarousel.appendChild(carouselImage);
  });
  return [imagesCarousel, carouselDots];
};
exports.createImagesCarousel = createImagesCarousel;