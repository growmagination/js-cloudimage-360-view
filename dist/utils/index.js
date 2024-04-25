"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  isPropsChangeRequireReload: true,
  generateImagesPath: true,
  preloadImages: true,
  preloadOriginalImages: true,
  initLazyload: true,
  contain: true,
  getImageAspectRatio: true,
  getCurrentOriginalImage: true,
  magnify: true,
  generateZoomInSteps: true,
  generateZoomOutSteps: true,
  loop: true,
  getSpeedFactor: true,
  isCompletedOneCycle: true,
  addClass: true,
  removeClass: true,
  getMovingDirection: true,
  getItemSkipped: true,
  initControls: true,
  updateHotspots: true,
  createHotspots: true,
  generateHotspotsConfigs: true,
  isMouseOnHotspot: true,
  hideHotspotsIcons: true
};
Object.defineProperty(exports, "addClass", {
  enumerable: true,
  get: function get() {
    return _addClass.addClass;
  }
});
Object.defineProperty(exports, "contain", {
  enumerable: true,
  get: function get() {
    return _contain.contain;
  }
});
Object.defineProperty(exports, "createHotspots", {
  enumerable: true,
  get: function get() {
    return _createHotspots.createHotspots;
  }
});
Object.defineProperty(exports, "generateHotspotsConfigs", {
  enumerable: true,
  get: function get() {
    return _generateHotspotsConfigs.generateHotspotsConfigs;
  }
});
Object.defineProperty(exports, "generateImagesPath", {
  enumerable: true,
  get: function get() {
    return _generateImagesPath.generateImagesPath;
  }
});
Object.defineProperty(exports, "generateZoomInSteps", {
  enumerable: true,
  get: function get() {
    return _generateZoomInSteps.generateZoomInSteps;
  }
});
Object.defineProperty(exports, "generateZoomOutSteps", {
  enumerable: true,
  get: function get() {
    return _generateZoomOutSteps.generateZoomOutSteps;
  }
});
Object.defineProperty(exports, "getCurrentOriginalImage", {
  enumerable: true,
  get: function get() {
    return _getCurrentOriginalImage.getCurrentOriginalImage;
  }
});
Object.defineProperty(exports, "getImageAspectRatio", {
  enumerable: true,
  get: function get() {
    return _getImageAspectRatio.getImageAspectRatio;
  }
});
Object.defineProperty(exports, "getItemSkipped", {
  enumerable: true,
  get: function get() {
    return _getItemSkipped.getItemSkipped;
  }
});
Object.defineProperty(exports, "getMovingDirection", {
  enumerable: true,
  get: function get() {
    return _getMovingDirection.getMovingDirection;
  }
});
Object.defineProperty(exports, "getSpeedFactor", {
  enumerable: true,
  get: function get() {
    return _getSpeedFactor.getSpeedFactor;
  }
});
Object.defineProperty(exports, "hideHotspotsIcons", {
  enumerable: true,
  get: function get() {
    return _hideHotspotsIcons.hideHotspotsIcons;
  }
});
Object.defineProperty(exports, "initControls", {
  enumerable: true,
  get: function get() {
    return _initControls.initControls;
  }
});
Object.defineProperty(exports, "initLazyload", {
  enumerable: true,
  get: function get() {
    return _initLazyload.initLazyload;
  }
});
Object.defineProperty(exports, "isCompletedOneCycle", {
  enumerable: true,
  get: function get() {
    return _isCompletedOneCycle.isCompletedOneCycle;
  }
});
Object.defineProperty(exports, "isMouseOnHotspot", {
  enumerable: true,
  get: function get() {
    return _isMouseOnHotspot.isMouseOnHotspot;
  }
});
Object.defineProperty(exports, "isPropsChangeRequireReload", {
  enumerable: true,
  get: function get() {
    return _isPropsChangeRequireReload.isPropsChangeRequireReload;
  }
});
Object.defineProperty(exports, "loop", {
  enumerable: true,
  get: function get() {
    return _loop.loop;
  }
});
Object.defineProperty(exports, "magnify", {
  enumerable: true,
  get: function get() {
    return _magnify.magnify;
  }
});
Object.defineProperty(exports, "preloadImages", {
  enumerable: true,
  get: function get() {
    return _preloadImages.preloadImages;
  }
});
Object.defineProperty(exports, "preloadOriginalImages", {
  enumerable: true,
  get: function get() {
    return _preloadOriginalImages.preloadOriginalImages;
  }
});
Object.defineProperty(exports, "removeClass", {
  enumerable: true,
  get: function get() {
    return _removeClass.removeClass;
  }
});
Object.defineProperty(exports, "updateHotspots", {
  enumerable: true,
  get: function get() {
    return _updateHotspots.updateHotspots;
  }
});
var _isPropsChangeRequireReload = require("./image-src/is-props-change-require-reload");
var _generateImagesPath = require("./image-src/generate-images-path");
var _preloadImages = require("./load-images/preload-images");
var _preloadOriginalImages = require("./load-images/preload-original-images");
var _initLazyload = require("./load-images/lazyload/init-lazyload");
var _contain = require("./responsive/contain");
var _getImageAspectRatio = require("./responsive/get-image-aspect-ratio");
var _getCurrentOriginalImage = require("./magnify/get-current-original-image");
var _magnify = require("./magnify/magnify");
var _generateZoomInSteps = require("./zoom/generate-zoom-in-steps");
var _generateZoomOutSteps = require("./zoom/generate-zoom-out-steps");
var _loop = require("./auto-play/loop");
var _getSpeedFactor = require("./auto-play/get-speed-factor");
var _isCompletedOneCycle = require("./auto-play/is-completed-one-cycle");
var _addClass = require("./class-names/add-class");
var _removeClass = require("./class-names/remove-class");
var _getMovingDirection = require("./spin-y/get-moving-direction");
var _getItemSkipped = require("./controls/get-item-skipped");
var _initControls = require("./controls/init-controls");
var _containerElements = require("./container-elements");
Object.keys(_containerElements).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _containerElements[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _containerElements[key];
    }
  });
});
var _updateHotspots = require("./hotspots/update-hotspots");
var _createHotspots = require("./hotspots/elements/create-hotspots");
var _generateHotspotsConfigs = require("./hotspots/generate-hotspots-configs");
var _isMouseOnHotspot = require("./hotspots/is-mouse-on-hotspot");
var _hideHotspotsIcons = require("./hotspots/hide-hotspots-icons");