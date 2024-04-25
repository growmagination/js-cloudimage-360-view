"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHotspotPopupLink = void 0;
var createHotspotPopupLink = function createHotspotPopupLink(variant) {
  var url = variant.url,
    title = variant.title,
    newTab = variant.newTab;
  var hyperLink = document.createElement('a');
  hyperLink.href = url;
  hyperLink.innerText = title;
  if (newTab) {
    hyperLink.target = '_blank';
  }
  return hyperLink;
};
exports.createHotspotPopupLink = createHotspotPopupLink;