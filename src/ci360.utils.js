"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setView360Icon = exports.isTrue = exports.get360ViewProps = exports.debounce = exports.attr = void 0;
var _constants = require("./constants");
var _this = void 0;
//TODO [deprecated]: remove filename, amount in the upcoming versions
var get360ViewProps = function get360ViewProps(image) {
  return {
    folder: attr(image, 'folder') || attr(image, 'data-folder') || '/',
    apiVersion: attr(image, 'api-version') || attr(image, 'data-api-version') || attr(image, 'apiVersion') || attr(image, 'data-apiVersion') || "v7",
    filenameX: attr(image, 'filename') || attr(image, 'data-filename') || attr(image, 'filename-x') || attr(image, 'data-filename-x') || 'image-{index}.jpg',
    filenameY: attr(image, 'filename-y') || attr(image, 'data-filename-y') || 'image-y-{index}.jpg',
    imageListX: attr(image, 'image-list-x') || attr(image, 'data-image-list-x') || null,
    imageListY: attr(image, 'image-list-y') || attr(image, 'data-image-list-y') || null,
    indexZeroBase: parseInt(attr(image, 'index-zero-base') || attr(image, 'data-index-zero-base') || 0, 10),
    amountX: parseInt(attr(image, 'amount') || attr(image, 'data-amount') || attr(image, 'amount-x') || attr(image, 'data-amount-x') || 36, 10),
    amountY: parseInt(attr(image, 'amount-y') || attr(image, 'data-amount-y') || 0, 10),
    speed: parseInt(attr(image, 'speed') || attr(image, 'data-speed') || 80, 10),
    dragSpeed: parseInt(attr(image, 'drag-speed') || attr(image, 'data-drag-speed') || 150, 10),
    keys: isTrue(image, 'keys'),
    keysReverse: isTrue(image, 'keys-reverse'),
    boxShadow: attr(image, 'box-shadow') || attr(image, 'data-box-shadow'),
    autoplay: isTrue(image, 'autoplay'),
    autoplayBehavior: attr(image, 'autoplay-behavior') || attr(image, 'data-autoplay-behavior') || _constants.AUTOPLAY_BEHAVIOR.SPIN_X,
    playOnce: isTrue(image, 'play-once'),
    autoplayReverse: isTrue(image, 'autoplay-reverse'),
    pointerZoom: parseFloat(attr(image, 'pointer-zoom') || attr(image, 'data-pointer-zoom') || 0, 10),
    bottomCircle: isTrue(image, 'bottom-circle'),
    disableDrag: isTrue(image, 'disable-drag'),
    fullscreen: isTrue(image, 'fullscreen') || isTrue(image, 'full-screen'),
    magnifier: (attr(image, 'magnifier') !== null || attr(image, 'data-magnifier') !== null) && parseFloat(attr(image, 'magnifier') || attr(image, 'data-magnifier'), 10),
    bottomCircleOffset: parseInt(attr(image, 'bottom-circle-offset') || attr(image, 'data-bottom-circle-offset') || 5, 10),
    ciToken: attr(image, 'responsive') || attr(image, 'data-responsive'),
    ciFilters: attr(image, 'filters') || attr(image, 'data-filters'),
    ciTransformation: attr(image, 'transformation') || attr(image, 'data-transformation'),
    lazyload: isTrue(image, 'lazyload'),
    lazySelector: attr(image, 'lazyload-selector') || attr(image, 'data-lazyload-selector') || 'lazyload',
    spinReverse: isTrue(image, 'spin-reverse'),
    controlReverse: isTrue(image, 'control-reverse'),
    stopAtEdges: isTrue(image, 'stop-at-edges'),
    hide360Logo: isTrue(image, 'hide-360-logo'),
    logoSrc: attr(image, 'logo-src') || 'https://scaleflex.cloudimg.io/v7/filerobot/js-cloudimage-360-view/360_view.svg',
    ratio: attr(image, 'ratio') || attr(image, 'data-ratio'),
    imageInfo: attr(image, 'info') || attr(image, 'data-info') || isTrue(image, 'info'),
    requestResponsiveImages: isTrue(image, 'request-responsive-images')
  };
};
exports.get360ViewProps = get360ViewProps;
var isTrue = function isTrue(image, type) {
  var imgProp = attr(image, type);
  var imgDataProp = attr(image, "data-".concat(type));
  return imgProp !== null && imgProp !== 'false' || imgDataProp !== null && imgDataProp !== 'false';
};
exports.isTrue = isTrue;
var attr = function attr(element, attribute) {
  return element.getAttribute(attribute);
};
exports.attr = attr;
var setView360Icon = function setView360Icon(view360Icon, logoSrc) {
  view360Icon.style.background = "rgba(255,255,255,0.8) url('".concat(logoSrc, "') 50% 50% / contain no-repeat");
};
exports.setView360Icon = setView360Icon;
var debounce = function debounce(func, timeout) {
  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(_this, args);
    }, timeout);
  };
};
exports.debounce = debounce;