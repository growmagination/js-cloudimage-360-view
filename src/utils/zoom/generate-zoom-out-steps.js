"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateZoomOutSteps = void 0;
var generateZoomOutSteps = function generateZoomOutSteps(zoomIntenisty) {
  var transitionStepsFactor = 20;
  return Array.from(Array(transitionStepsFactor)).reduce(function (acc, _, index) {
    var previousIndex = index - 1;
    var previousValue = previousIndex < 0 ? zoomIntenisty : acc[index - 1];
    var step = previousValue - (zoomIntenisty - 1) / transitionStepsFactor;
    var stepFixedValue = +step.toFixed(2);
    (acc || []).push(stepFixedValue);
    return acc;
  }, []);
};
exports.generateZoomOutSteps = generateZoomOutSteps;