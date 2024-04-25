"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModalElements = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createImagesCarousel3 = require("./create-images-carousel");
var _createModalDescription = require("./create-modal-description");
var _createModalTitle = require("./create-modal-title");
var _createReadMoreBtn = require("./create-read-more-btn");
var createModalElements = function createModalElements(variant, container, popup) {
  var images = variant.images,
    title = variant.title,
    description = variant.description,
    moreDetailsUrl = variant.moreDetailsUrl,
    _variant$moreDetailsT = variant.moreDetailsTitle,
    moreDetailsTitle = _variant$moreDetailsT === void 0 ? 'Read more' : _variant$moreDetailsT;
  var modalWrapper = document.createElement('div');
  modalWrapper.className = 'cloudimage-360-modal-wrapper';
  if (images) {
    var imagesCarouselWrapper = document.createElement('div');
    var _createImagesCarousel = (0, _createImagesCarousel3.createImagesCarousel)(images, popup, container),
      _createImagesCarousel2 = (0, _slicedToArray2.default)(_createImagesCarousel, 2),
      imagesCarousel = _createImagesCarousel2[0],
      carouselDots = _createImagesCarousel2[1];
    imagesCarouselWrapper.appendChild(imagesCarousel);
    if (images.length > 1) {
      imagesCarouselWrapper.appendChild(carouselDots);
    }
    modalWrapper.appendChild(imagesCarouselWrapper);
    imagesCarouselWrapper.className = 'cloudimage-360-images-carousel-wrapper';
  }
  if (title) {
    var modalTitle = (0, _createModalTitle.createModalTitle)(title);
    modalWrapper.appendChild(modalTitle);
  }
  if (description) {
    var modalDescription = (0, _createModalDescription.createModalDescription)(description);
    modalWrapper.appendChild(modalDescription);
  }
  if (moreDetailsUrl) {
    var readMoreBtn = (0, _createReadMoreBtn.createReadMoreBtn)(moreDetailsUrl, moreDetailsTitle);
    modalWrapper.appendChild(readMoreBtn);
  }
  popup.appendChild(modalWrapper);
};
exports.createModalElements = createModalElements;