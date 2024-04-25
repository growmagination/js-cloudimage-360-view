"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPropsChangeRequireReload = void 0;
var _propsRequireReload = require("../../constants/props-require-reload");
var isPropsChangeRequireReload = function isPropsChangeRequireReload(currentProps, changedProps) {
  return Object.keys(changedProps).reduce(function (acc, current) {
    var isPropChanged = currentProps[current] !== changedProps[current];
    var isSrcProp = _propsRequireReload.PROPS_REQUIRE_RELOAD.indexOf(current) !== -1;
    if (isSrcProp && isPropChanged) {
      acc = true;
    }
    return acc;
  }, false);
};
exports.isPropsChangeRequireReload = isPropsChangeRequireReload;