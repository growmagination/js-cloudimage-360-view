"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHotspotIcon = void 0;
var _hidePopup = require("../attach-events/hide-popup");
var _showPopup = require("../attach-events/show-popup");
var _hideHotspotIcon = require("../hide-hotspot-icon");
var createHotspotIcon = function createHotspotIcon(container, hotspotConfig, popup, popperInstance) {
  var indicatorSelector = hotspotConfig.indicatorSelector,
    variant = hotspotConfig.variant;
  var url = variant.url,
    anchorId = variant.anchorId;
  var _hotspotConfig$popupP = hotspotConfig.popupProps.open,
    open = _hotspotConfig$popupP === void 0 ? false : _hotspotConfig$popupP;
  var isVisible;
  var hotspotIcon = document.createElement('div');
  hotspotIcon.style.position = 'absolute';
  hotspotIcon.className = "cloudimage-360-hotspot-".concat(url ? 'link' : 'custom', "-icon ").concat(indicatorSelector);
  hotspotIcon.setAttribute('data-hotspot-icon-id', anchorId);
  hotspotIcon.setAttribute('data-cloudimage-360-hotspot', '');
  var popupMouseEnter = function popupMouseEnter() {
    isVisible = true;
  };
  var popupMouseLeave = function popupMouseLeave() {
    isVisible = false;
    !open && (0, _hidePopup.hidePopup)(popup, isVisible);
  };
  hotspotIcon.onclick = function (e) {
    return e.stopPropagation();
  };
  var showEvents = ['mouseenter', 'touchstart', 'focus'];
  var hideEvents = ['mouseleave', 'blur'];
  showEvents.forEach(function (event) {
    hotspotIcon.addEventListener(event, function () {
      return (0, _showPopup.showPopup)(popup, popperInstance);
    });
  });
  if (!open) {
    hideEvents.forEach(function (event) {
      hotspotIcon.addEventListener(event, function () {
        return setTimeout(function () {
          return (0, _hidePopup.hidePopup)(popup, isVisible);
        }, 160);
      });
    });
  }
  popup.addEventListener('mouseenter', popupMouseEnter);
  popup.addEventListener('mouseleave', popupMouseLeave);
  (0, _hideHotspotIcon.hideHotspotIcon)(hotspotIcon);
  container.appendChild(hotspotIcon);
  return hotspotIcon;
};
exports.createHotspotIcon = createHotspotIcon;