"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyStylesToContainer = void 0;
var applyStylesToContainer = function applyStylesToContainer(container) {
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.cursor = 'wait';
  container.setAttribute('draggable', 'false');
  container.className = "".concat(container.className, " initialized");
};
exports.applyStylesToContainer = applyStylesToContainer;