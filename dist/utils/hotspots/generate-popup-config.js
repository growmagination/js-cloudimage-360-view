"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePopupConfig = void 0;
var generatePopupConfig = function generatePopupConfig(popupProps) {
  var _popupProps$popupSele = popupProps.popupSelector,
    popupSelector = _popupProps$popupSele === void 0 ? '' : _popupProps$popupSele,
    _popupProps$arrow = popupProps.arrow,
    arrow = _popupProps$arrow === void 0 ? true : _popupProps$arrow,
    _popupProps$offset = popupProps.offset,
    offset = _popupProps$offset === void 0 ? [0, 10] : _popupProps$offset,
    _popupProps$placement = popupProps.placement,
    placement = _popupProps$placement === void 0 ? 'auto' : _popupProps$placement,
    _popupProps$open = popupProps.open,
    open = _popupProps$open === void 0 ? false : _popupProps$open;
  var popupConfig = {
    popupSelector: popupSelector,
    arrow: arrow,
    offset: offset,
    placement: placement,
    open: open
  };
  return popupConfig;
};
exports.generatePopupConfig = generatePopupConfig;