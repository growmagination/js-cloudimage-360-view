"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("core-js/features/array/for-each");
require("core-js/features/array/filter");
require("core-js/features/array/includes");
var _ci = _interopRequireDefault(require("./ci360.service"));
var _ci2 = require("./ci360.utils");
function getContainerWithId(container) {
  var containerId = container.id;
  if (!containerId) {
    var uniqueId = Math.floor(Math.random() * 10000);
    var generatedContainerId = "cloudimage-360-view-".concat(uniqueId);
    container.id = generatedContainerId;
  }
  return container;
}
function init() {
  var viewers = [];
  var view360Array = document.querySelectorAll('.cloudimage-360:not(.initialized)');
  [].slice.call(view360Array).forEach(function (_container) {
    var container = getContainerWithId(_container);
    var isHotspotsEnabled = (0, _ci2.isTrue)(container, 'hotspots');
    if (!isHotspotsEnabled) {
      viewers.push(new _ci.default(container));
    }
  });
  window.CI360._viewers = viewers;
}
function destroy() {
  if (isNoViewers()) return;
  window.CI360._viewers.forEach(function (viewer) {
    viewer.destroy();
  });
  window.CI360._viewers = [];
}
function getActiveIndexByID(id, oriantation) {
  if (isNoViewers()) return;
  var currentViewer = window.CI360._viewers.filter(function (viewer) {
    return viewer.id === id;
  })[0];
  if (oriantation === 'y') {
    return currentViewer && currentViewer.activeImageY - 1;
  }
  return currentViewer && currentViewer.activeImageX - 1;
}
function add(id) {
  var view360Array = Array.from(document.querySelectorAll('.cloudimage-360:not(.initialized)'));
  if (view360Array.length && id) {
    var newViewContainer = view360Array.filter(function (viewer) {
      return viewer.id === id;
    })[0];
    newViewContainer && window.CI360._viewers.push(new _ci.default(newViewContainer));
  }
}
function update() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var hotspotConfigs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (id) {
    var view = window.CI360._viewers.filter(function (viewer) {
      return viewer.id === id;
    })[0];
    if (hotspotConfigs) {
      var view360Array = document.querySelectorAll('.cloudimage-360');
      var _container2 = Array.from(view360Array).find(function (view) {
        return view.id === id;
      });
      _container2.setAttribute('data-hotspots', true);
    }
    view.updateView(forceUpdate, window.CI360._viewers, hotspotConfigs);
  } else {
    window.CI360._viewers.forEach(function (viewer) {
      viewer.updateView(forceUpdate, window.CI360._viewers);
    });
  }
}
function isNoViewers() {
  return !(window.CI360._viewers && window.CI360._viewers.length > 0);
}
function addHotspots(instanceId, config) {
  var view360Array = document.querySelectorAll('.cloudimage-360:not(.initialized)');
  var notInitializedContainer = Array.from(view360Array).find(function (view) {
    return view.id === instanceId;
  });
  if (notInitializedContainer) {
    container.setAttribute('data-hotspots', true);
    return window.CI360._viewers.push(new _ci.default(container, false, config));
  } else {
    update(instanceId, false, config);
  }
}
window.CI360 = window.CI360 || {};
window.CI360.init = init;
window.CI360.destroy = destroy;
window.CI360.getActiveIndexByID = getActiveIndexByID;
window.CI360.update = update;
window.CI360.add = add;
window.CI360.addHotspots = addHotspots;
if (!window.CI360.notInitOnLoad) {
  init();
}