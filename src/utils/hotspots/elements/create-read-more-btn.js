"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReadMoreBtn = void 0;
var createReadMoreBtn = function createReadMoreBtn(moreDetailsUrl, moreDetailsTitle) {
  var readMoreBtn = document.createElement('a');
  readMoreBtn.href = moreDetailsUrl;
  readMoreBtn.innerText = moreDetailsTitle;
  readMoreBtn.className = 'cloudimage-360-modal-more-details';
  readMoreBtn.target = '_blank';
  return readMoreBtn;
};
exports.createReadMoreBtn = createReadMoreBtn;