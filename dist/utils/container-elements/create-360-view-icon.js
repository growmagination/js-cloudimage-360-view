"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create360ViewIcon = void 0;
var create360ViewIcon = function create360ViewIcon() {
  var view360Icon = document.createElement('div');
  view360Icon.className = 'cloudimage-360-view-360-icon';
  view360Icon.innerText = '0%';
  return view360Icon;
};
exports.create360ViewIcon = create360ViewIcon;