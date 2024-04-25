"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create360ViewCircleIcon = void 0;
var create360ViewCircleIcon = function create360ViewCircleIcon(circleOffset) {
  var view360CircleIcon = new Image();
  view360CircleIcon.src = 'https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/assets/img/360.svg';
  view360CircleIcon.style.bottom = "".concat(circleOffset, "%");
  view360CircleIcon.className = 'cloudimage-360-view-360-circle';
  return view360CircleIcon;
};
exports.create360ViewCircleIcon = create360ViewCircleIcon;