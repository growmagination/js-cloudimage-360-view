"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPopup = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _createHotspotPopupLink = require("./create-hotspot-popup-link");
var _getPopupNode = require("../get-popup-node");
var _createPopupArrow = require("./create-popup-arrow");
var _createModelElements = require("./create-model-elements");
var createPopup = function createPopup(container, hotspotConfig, popupProps) {
  var variant = hotspotConfig.variant;
  var popupSelector = popupProps.popupSelector,
    arrow = popupProps.arrow;
  var url = variant.url,
    images = variant.images,
    title = variant.title,
    anchorId = variant.anchorId,
    description = variant.description,
    moreDetailsUrl = variant.moreDetailsUrl;
  var popup = document.createElement('div');
  popup.className = "cloudimage-360-hotspot-popup ".concat(popupSelector);
  popup.setAttribute('data-hotspot-popup-id', anchorId);
  popup.setAttribute('data-cloudimage-360-hotspot', '');
  popup.style.minHeight = 16;
  popup.style.minWidth = 16;
  popup.style.cursor = 'default';
  popup.onclick = function (e) {
    return e.stopPropagation();
  };
  if ((0, _typeof2.default)(variant) === 'object' && images || description || moreDetailsUrl || title && !url) {
    (0, _createModelElements.createModalElements)(variant, container, popup);
  } else if (url) {
    var hotspotPopupLink = (0, _createHotspotPopupLink.createHotspotPopupLink)(variant);
    popup.appendChild(hotspotPopupLink);
  } else if (typeof variant === 'string') {
    try {
      var popupNode = (0, _getPopupNode.getPopupNode)(variant);
      var userPopup = popupNode.cloneNode(true);
      popup.appendChild(userPopup);
      popupNode.parentNode.removeChild(popupNode);
    } catch (_unused) {
      console.error("Cloudimage-360: Element with anchorId '".concat(anchorId, "' not exist in the DOM"));
    }
  }
  if (arrow) {
    var popupArrow = (0, _createPopupArrow.createPopupArrow)();
    popup.appendChild(popupArrow);
  }
  container.appendChild(popup);
  return popup;
};
exports.createPopup = createPopup;