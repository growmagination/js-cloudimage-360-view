"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPopperInstance = void 0;
var _core = require("@popperjs/core");
var createPopperInstance = function createPopperInstance(popper, popupProps, container) {
  var placement = popupProps.placement,
    offset = popupProps.offset;
  var virtualReference = document.createElement('div');
  var popperInstance = (0, _core.createPopper)(virtualReference, popper);
  popperInstance.setOptions({
    placement: placement,
    modifiers: [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        boundary: container
      }
    }]
  });
  return popperInstance;
};
exports.createPopperInstance = createPopperInstance;