"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _ci = require("./ci360.utils");
var _constants = require("./constants/");
require("./static/css/style.css");
require("./static/css/hotspots.css");
var _utils = require("./utils");
var _togglePopupEvents = require("./utils/hotspots/toggle-popup-events");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var CI360Viewer = /*#__PURE__*/function () {
  function CI360Viewer(container, fullscreen, hotspotsConfigs) {
    (0, _classCallCheck2.default)(this, CI360Viewer);
    this.container = container;
    this.movementStart = {
      x: 0,
      y: 0
    };
    this.isStartSpin = false;
    this.movingDirection = _constants.ORIENTATIONS.CENTER;
    this.isClicked = false;
    this.loadedImagesX = 0;
    this.loadedImagesY = 0;
    this.imagesLoaded = false;
    this.reversed = false;
    this.fullscreenView = !!fullscreen;
    this.imagesX = [];
    this.imagesY = [];
    this.originalImagesX = [];
    this.originalImagesY = [];
    this.resizedImagesX = [];
    this.resizedImagesY = [];
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
    this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    this.id = container.id;
    this.hotspotsConfigs = hotspotsConfigs && (0, _utils.generateHotspotsConfigs)(hotspotsConfigs);
    this.isMagnifyOpen = false;
    this.isDragged = false;
    this.startPointerZoom = false;
    this.zoomIntensity = 0;
    this.mouseTracked = false;
    this.intialPositions = {
      x: 0,
      y: 0
    };
    this.pointerCurrentPosition = {
      x: 0,
      y: 0
    };
    this.isStartedLoadOriginalImages = false;
    this.init(container);
  }
  (0, _createClass2.default)(CI360Viewer, [{
    key: "isReady",
    value: function isReady() {
      var totalAmount = this.amountX + this.amountY;
      return this.imagesX.length + this.imagesY.length === totalAmount;
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(event) {
      if (!this.imagesLoaded) return;
      var isMouseOnHotspotElement = (0, _utils.isMouseOnHotspot)();
      var pageX = event.pageX,
        pageY = event.pageY;
      this.hideInitialIcons();
      if (this.autoplay || this.loopTimeoutId) {
        this.stop();
        this.autoplay = false;
        this.isZoomReady = true;
      }
      this.intialPositions = {
        x: pageX,
        y: pageY
      };
      this.movementStart = {
        x: pageX,
        y: pageY
      };
      this.isClicked = true;
      this.isDragged = false;
      if (this.hotspotsConfigs) {
        (0, _togglePopupEvents.togglePopupEvents)(this.hotspotsConfigs, event, true);
      }
      if (isMouseOnHotspotElement) {
        this.isClicked = false;
      }
      if (this.hotspotsConfigs) {
        (0, _utils.updateHotspots)(this.container, this.hotspotsConfigs, this.activeImageX, this.activeImageY, this.movingDirection);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      var _this = this;
      if (!this.imagesLoaded || !this.isClicked) return;
      this.movementStart = {
        x: 0,
        y: 0
      };
      this.isStartSpin = false;
      this.isClicked = false;
      if (this.bottomCircle && !this.mouseTracked) {
        this.show360ViewCircleIcon();
      }
      if (this.hotspotsConfigs) {
        (0, _togglePopupEvents.togglePopupEvents)(this.hotspotsConfigs);
      }
      if (this.pointerZoom && !this.fullscreenView) {
        setTimeout(function () {
          _this.isZoomReady = true;
        }, 50);
        if (this.mouseTracked) {
          this.container.style.cursor = 'zoom-out';
        } else {
          this.container.style.cursor = 'zoom-in';
        }
      } else {
        this.container.style.cursor = 'grab';
      }
    }
  }, {
    key: "mouseClick",
    value: function mouseClick(event) {
      if (!this.pointerZoom || this.fullscreenView) return;
      this.setCursorPosition(event);
      this.hideInitialIcons();
      if (!this.isStartedLoadOriginalImages && !this.isDragged && this.isZoomReady) {
        this.prepareOriginalImages(event);
      }
      if (this.isAllOriginalImagesLoaded && !this.isDragged && this.isZoomReady) {
        this.togglePointerZoom(event);
      }
      ;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(event) {
      if (!this.imagesLoaded) return;
      var pageX = event.pageX,
        pageY = event.pageY;
      if (this.mouseTracked) {
        this.setCursorPosition(event);
        if (!this.isClicked) {
          this.update();
        }
      }
      if (this.isClicked) {
        var nextPositions = {
          x: pageX,
          y: pageY
        };
        this.container.style.cursor = 'grabbing';
        this.isDragged = true;
        this.movingDirection = (0, _utils.getMovingDirection)(this.isStartSpin, this.allowSpinY, this.intialPositions, nextPositions, this.movingDirection);
        this.onMoveHandler(event);
      }
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave() {
      if (!this.imagesLoaded) return;
      if (this.pointerZoom && this.mouseTracked) {
        this.togglePointerZoom();
      }
      if (this.isMagnifyOpen) {
        this.closeMagnifier();
      }
    }
  }, {
    key: "togglePointerZoom",
    value: function togglePointerZoom() {
      var _this2 = this;
      if (this.autoplay || this.loopTimeoutId) {
        this.stop();
        this.autoplay = false;
      }
      if (this.mouseTracked) {
        var zoomSteps = (0, _utils.generateZoomOutSteps)(this.pointerZoom);
        this.container.style.cursor = 'zoom-in';
        zoomSteps.forEach(function (step, index) {
          setTimeout(function () {
            _this2.zoomIntensity = step;
            _this2.update();
            var isReachedIntialScale = index === zoomSteps.length - 1;
            if (isReachedIntialScale) {
              _this2.mouseTracked = false;
              _this2.update();
            }
            ;
          }, (_this2.pointerZoom - step) * 200);
        });
      } else {
        if (this.bottomCircle) this.hide360ViewCircleIcon();
        var _zoomSteps = (0, _utils.generateZoomInSteps)(this.pointerZoom);
        if (this.hotspotsConfigs) {
          (0, _utils.hideHotspotsIcons)();
        }
        _zoomSteps.forEach(function (step) {
          setTimeout(function () {
            _this2.zoomIntensity = step;
            _this2.update();
          }, step * 200);
        });
        this.mouseTracked = true;
        this.container.style.cursor = 'zoom-out';
      }
    }
  }, {
    key: "onOriginalImageLoad",
    value: function onOriginalImageLoad(orientation, event, image, index) {
      if (orientation === _constants.ORIENTATIONS.Y) {
        this.originalImagesY[index] = image;
      } else {
        this.originalImagesX[index] = image;
      }
      var loadedOriginalXImages = this.originalImagesX.filter(function (image) {
        return image;
      });
      var loadedOriginalYImages = this.originalImagesY.filter(function (image) {
        return image;
      });
      var totalAmount = this.amountX + this.amountY;
      var totalLoadedImages = loadedOriginalXImages.length + loadedOriginalYImages.length;
      var isAllImagesLoaded = loadedOriginalXImages.length + loadedOriginalYImages.length === this.amountX + this.amountY;
      var percentage = Math.round(totalLoadedImages / totalAmount * 100);
      this.updatePercentageInLoader(percentage);
      if (isAllImagesLoaded) {
        this.removeLoader();
        this.togglePointerZoom(event);
        this.mouseTracked = true;
        this.isAllOriginalImagesLoaded = true;
      }
    }
  }, {
    key: "prepareOriginalImages",
    value: function prepareOriginalImages(event) {
      var srcX = (0, _utils.generateImagesPath)(this.srcXConfig);
      this.isStartedLoadOriginalImages = true;
      this.loader = (0, _utils.createLoader)(this.innerBox);
      this.container.style.cursor = 'wait';
      (0, _utils.preloadOriginalImages)(this.srcXConfig, srcX, this.onOriginalImageLoad.bind(this, _constants.ORIENTATIONS.X, event));
      if (this.allowSpinY) {
        var srcY = (0, _utils.generateImagesPath)(this.srcYConfig);
        (0, _utils.preloadOriginalImages)(this.srcYConfig, srcY, this.onOriginalImageLoad.bind(this, _constants.ORIENTATIONS.Y, event));
      }
    }
  }, {
    key: "touchStart",
    value: function touchStart(event) {
      if (!this.imagesLoaded) return;
      var isMouseOnHotspotElement = (0, _utils.isMouseOnHotspot)();
      this.hideInitialIcons();
      if (this.autoplay || this.loopTimeoutId) {
        this.stop();
        this.autoplay = false;
      }
      this.intialPositions = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      this.movementStart = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      this.isClicked = true;
      if (isMouseOnHotspotElement) {
        this.isClicked = false;
      }
    }
  }, {
    key: "touchEnd",
    value: function touchEnd() {
      if (!this.imagesLoaded) return;
      if (this.bottomCircle) this.show360ViewCircleIcon();
      this.movementStart = {
        x: 0,
        y: 0
      };
      this.isStartSpin = false;
      this.isClicked = false;
    }
  }, {
    key: "touchMove",
    value: function touchMove(event) {
      if (!this.isClicked || !this.imagesLoaded) return;
      if (event.cancelable && this.allowSpinY) {
        event.preventDefault();
      }
      var nextPositions = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      this.movingDirection = (0, _utils.getMovingDirection)(this.isStartSpin, this.allowSpinY, this.intialPositions, nextPositions, this.movingDirection);
      this.onMoveHandler(event);
    }
  }, {
    key: "keyDownGeneral",
    value: function keyDownGeneral(event) {
      if (!this.imagesLoaded) return;
      if (this.glass) {
        this.closeMagnifier();
      }
      if (event.keyCode === 27) {
        //ESC
        if (this.mouseTracked) {
          this.togglePointerZoom();
        }
      }
    }
  }, {
    key: "hideInitialIcons",
    value: function hideInitialIcons() {
      if (this.glass) {
        this.closeMagnifier();
      }
      if (this.view360Icon) {
        this.remove360ViewIcon();
      }
    }
  }, {
    key: "setCursorPosition",
    value: function setCursorPosition(event) {
      this.mousePositions = {
        x: event.clientX,
        y: event.clientY
      };
    }
  }, {
    key: "getCursorPositionInCanvas",
    value: function getCursorPositionInCanvas() {
      var canvasRect = this.canvas.getBoundingClientRect();
      this.pointerCurrentPosition = {
        x: this.mousePositions.x - canvasRect.left,
        y: this.mousePositions.y - canvasRect.top
      };
      return this.pointerCurrentPosition;
    }
  }, {
    key: "keyDown",
    value: function keyDown(event) {
      if (!this.imagesLoaded) return;
      if (this.glass) {
        this.closeMagnifier();
      }
      if (event.keyCode === 37) {
        // left
        this.keysReverse ? this.left() : this.right();
        this.onSpin();
      }
      if (event.keyCode === 39) {
        // right
        this.keysReverse ? this.right() : this.left();
        this.onSpin();
      }
      if (this.allowSpinY) {
        event.preventDefault();
        if (event.keyCode === 38) {
          // up
          this.keysReverse ? this.top() : this.bottom();
          this.onSpin();
        }
        if (event.keyCode === 40) {
          // down
          this.keysReverse ? this.bottom() : this.top();
          this.onSpin();
        }
      }
    }
  }, {
    key: "onSpin",
    value: function onSpin() {
      if (this.bottomCircle) {
        this.hide360ViewCircleIcon();
      }
      if (this.view360Icon) {
        this.remove360ViewIcon();
      }
      if (this.autoplay || this.loopTimeoutId) {
        this.stop();
        this.autoplay = false;
      }
    }
  }, {
    key: "keyUp",
    value: function keyUp(event) {
      if (!this.imagesLoaded) return;
      if ([37, 39].indexOf(event.keyCode) !== -1) {
        this.onFinishSpin();
      }
    }
  }, {
    key: "onFinishSpin",
    value: function onFinishSpin() {
      if (this.bottomCircle) this.show360ViewCircleIcon();
    }
  }, {
    key: "moveActiveIndexUp",
    value: function moveActiveIndexUp(itemsSkipped) {
      var isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;
      if (this.stopAtEdges) {
        var isReachedTheEdge = this.activeImageX + itemsSkipped >= this.amountX;
        if (isReachedTheEdge) {
          this.activeImageX = this.amountX;
          if (isReverse ? this.leftElem : this.rightElem) {
            (0, _utils.addClass)(isReverse ? this.leftElem : this.rightElem, 'not-active');
          }
        } else {
          this.activeImageX += itemsSkipped;
          if (this.rightElem) (0, _utils.removeClass)(this.rightElem, 'not-active');
          if (this.leftElem) (0, _utils.removeClass)(this.leftElem, 'not-active');
        }
      } else {
        this.activeImageX = (this.activeImageX + itemsSkipped) % this.amountX || this.amountX;
        if (this.activeImageX === this.amountX && this.allowSpinY) this.spinY = true;
      }
    }
  }, {
    key: "moveActiveIndexDown",
    value: function moveActiveIndexDown(itemsSkipped) {
      var isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;
      if (this.stopAtEdges) {
        var isReachedTheEdge = this.activeImageX - itemsSkipped <= 1;
        if (isReachedTheEdge) {
          this.activeImageX = 1;
          if (isReverse ? this.rightElem : this.leftElem) {
            (0, _utils.addClass)(isReverse ? this.rightElem : this.leftElem, 'not-active');
          }
        } else {
          this.activeImageX -= itemsSkipped;
          if (this.leftElem) (0, _utils.removeClass)(this.leftElem, 'not-active');
          if (this.rightElem) (0, _utils.removeClass)(this.rightElem, 'not-active');
        }
      } else {
        if (this.activeImageX - itemsSkipped < 1) {
          this.activeImageX = this.amountX + (this.activeImageX - itemsSkipped);
          this.spinY = true;
        } else {
          this.activeImageX -= itemsSkipped;
        }
      }
    }
  }, {
    key: "moveActiveYIndexUp",
    value: function moveActiveYIndexUp(itemsSkipped) {
      var isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;
      if (this.stopAtEdges) {
        var isReachedTheEdge = this.activeImageY + itemsSkipped >= this.amountY;
        if (isReachedTheEdge) {
          this.activeImageY = this.amountY;
          if (isReverse ? this.bottomElem : this.topElem) {
            (0, _utils.addClass)(isReverse ? this.bottomElem : this.topElem, 'not-active');
          }
        } else {
          this.activeImageY += itemsSkipped;
          if (this.topElem) (0, _utils.removeClass)(this.topElem, 'not-active');
          if (this.bottomElem) (0, _utils.removeClass)(this.bottomElem, 'not-active');
        }
      } else {
        this.activeImageY = (this.activeImageY + itemsSkipped) % this.amountY || this.amountY;
        if (this.activeImageY === this.amountY) this.spinY = false;
      }
    }
  }, {
    key: "moveActiveYIndexDown",
    value: function moveActiveYIndexDown(itemsSkipped) {
      var isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;
      if (this.stopAtEdges) {
        var isReachedTheEdge = this.activeImageY - itemsSkipped <= 1;
        if (isReachedTheEdge) {
          this.activeImageY = 1;
          if (isReverse ? this.topElem : this.bottomElem) {
            (0, _utils.addClass)(isReverse ? this.topElem : this.bottomElem, 'not-active');
          }
        } else {
          this.activeImageY -= itemsSkipped;
          if (this.bottomElem) (0, _utils.removeClass)(this.bottomElem, 'not-active');
          if (this.topElem) (0, _utils.removeClass)(this.topElem, 'not-active');
        }
      } else {
        if (this.activeImageY - itemsSkipped < 1) {
          this.activeImageY = this.amountY + (this.activeImageY - itemsSkipped);
          this.spinY = false;
        } else {
          this.activeImageY -= itemsSkipped;
        }
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight(currentPositionX) {
      var itemsSkippedRight = (0, _utils.getItemSkipped)(currentPositionX, this.movementStart.x, this.speedFactor);
      this.spinReverse ? this.moveActiveIndexDown(itemsSkippedRight) : this.moveActiveIndexUp(itemsSkippedRight);
      this.movementStart.x = currentPositionX;
      this.activeImageY = 1;
      this.update();
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(currentPositionX) {
      var itemsSkippedLeft = (0, _utils.getItemSkipped)(this.movementStart.x, currentPositionX, this.speedFactor);
      this.spinReverse ? this.moveActiveIndexUp(itemsSkippedLeft) : this.moveActiveIndexDown(itemsSkippedLeft);
      this.activeImageY = 1;
      this.movementStart.x = currentPositionX;
      this.update();
    }
  }, {
    key: "moveTop",
    value: function moveTop(currentPositionY) {
      var itemsSkippedTop = (0, _utils.getItemSkipped)(this.movementStart.y, currentPositionY, this.speedFactor);
      this.spinReverse ? this.moveActiveYIndexUp(itemsSkippedTop) : this.moveActiveYIndexDown(itemsSkippedTop);
      this.activeImageX = 1;
      this.movementStart.y = currentPositionY;
      this.update();
    }
  }, {
    key: "moveBottom",
    value: function moveBottom(currentPositionY) {
      var itemsSkippedBottom = (0, _utils.getItemSkipped)(currentPositionY, this.movementStart.y, this.speedFactor);
      this.spinReverse ? this.moveActiveYIndexDown(itemsSkippedBottom) : this.moveActiveYIndexUp(itemsSkippedBottom);
      this.activeImageX = 1;
      this.movementStart.y = currentPositionY;
      this.update();
    }
  }, {
    key: "onMoveHandler",
    value: function onMoveHandler(event) {
      var currentPositionX = this.isMobile ? event.touches[0].clientX : event.pageX;
      var currentPositionY = this.isMobile ? event.touches[0].clientY : event.pageY;
      var isMoveRight = currentPositionX - this.movementStart.x >= this.speedFactor;
      var isMoveLeft = this.movementStart.x - currentPositionX >= this.speedFactor;
      var isMoveTop = this.movementStart.y - currentPositionY >= this.speedFactor;
      var isMoveBottom = currentPositionY - this.movementStart.y >= this.speedFactor;
      if (this.bottomCircle) this.hide360ViewCircleIcon();
      if (isMoveRight && this.movingDirection === _constants.ORIENTATIONS.X) {
        this.moveRight(currentPositionX);
        this.isStartSpin = true;
      } else if (isMoveLeft && this.movingDirection === _constants.ORIENTATIONS.X) {
        this.moveLeft(currentPositionX);
        this.isStartSpin = true;
      } else if (isMoveTop && this.movingDirection === _constants.ORIENTATIONS.Y) {
        this.moveTop(currentPositionY);
        this.isStartSpin = true;
      } else if (isMoveBottom && this.movingDirection === _constants.ORIENTATIONS.Y) {
        this.moveBottom(currentPositionY);
        this.isStartSpin = true;
      }
    }
  }, {
    key: "left",
    value: function left() {
      this.movingDirection = _constants.ORIENTATIONS.X;
      this.activeImageY = this.reversed ? this.amountY : 1;
      this.moveActiveIndexDown(1);
      this.update();
    }
  }, {
    key: "right",
    value: function right() {
      this.movingDirection = _constants.ORIENTATIONS.X;
      this.activeImageY = this.reversed ? this.amountY : 1;
      this.moveActiveIndexUp(1);
      this.update();
    }
  }, {
    key: "top",
    value: function top() {
      this.movingDirection = _constants.ORIENTATIONS.Y;
      this.activeImageX = this.reversed ? this.amountX : 1;
      this.moveActiveYIndexUp(1);
      this.update();
    }
  }, {
    key: "bottom",
    value: function bottom() {
      this.movingDirection = _constants.ORIENTATIONS.Y;
      this.activeImageX = this.reversed ? this.amountX : 1;
      this.moveActiveYIndexDown(1);
      this.update();
    }
  }, {
    key: "loop",
    value: function loop(reversed) {
      var loopTriggers = {
        left: this.left.bind(this),
        right: this.right.bind(this),
        top: this.top.bind(this),
        bottom: this.bottom.bind(this)
      };
      (0, _utils.loop)(this.autoplayBehavior, this.spinY, reversed, loopTriggers);
    }
  }, {
    key: "updateContainerAndCanvasSize",
    value: function updateContainerAndCanvasSize(image) {
      var imageAspectRatio = (0, _utils.getImageAspectRatio)(image, this.ratio);
      if (this.fullscreenView) {
        this.container.width = window.innerWidth * this.devicePixelRatio;
        this.container.style.width = window.innerWidth + 'px';
        this.container.height = window.innerHeight * this.devicePixelRatio;
        this.container.style.height = window.innerHeight + 'px';
        this.container.style.maxWidth = 'unset';
        this.canvas.width = window.innerWidth * this.devicePixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.height = window.innerHeight * this.devicePixelRatio;
        this.canvas.style.height = window.innerHeight + 'px';
        return;
      }
      this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
      this.canvas.style.width = this.container.offsetWidth + 'px';
      this.canvas.height = this.container.offsetWidth / imageAspectRatio * this.devicePixelRatio;
      this.canvas.style.height = this.container.offsetWidth / imageAspectRatio + 'px';
    }
  }, {
    key: "onResizedImageLoad",
    value: function onResizedImageLoad(orientation, image, index) {
      if (orientation === _constants.ORIENTATIONS.Y) {
        this.resizedImagesY[index] = image;
      } else {
        this.resizedImagesX[index] = image;
      }
      var isAllImagesLoaded = this.resizedImagesX.length + this.resizedImagesY.length === this.amountX + this.amountY;
      if (isAllImagesLoaded) {
        this.imagesX = this.resizedImagesX;
        this.imagesY = this.resizedImagesY;
        this.update();
      }
    }
  }, {
    key: "showImageInfo",
    value: function showImageInfo(ctx) {
      ctx.font = "".concat(this.fullscreenView ? 28 : 14, "px serif");
      ctx.fillStyle = this.info === 'white' ? '#FFF' : '#000';
      var imageDimension = "image-dimension: ".concat(this.container.offsetWidth, "x").concat(this.container.offsetHeight, "px");
      var currentXImage = 'active-index-x: ' + this.activeImageX;
      var currentYImage = 'active-index-y: ' + this.activeImageY;
      var imageIndex = [currentXImage, currentYImage].join(' | ');
      ctx.fillText(imageDimension, 20, this.container.offsetHeight - 35);
      ctx.fillText(imageIndex, 20, this.container.offsetHeight - 10);
    }
  }, {
    key: "requestResizedImages",
    value: function requestResizedImages() {
      if (!this.isReady()) return;
      var responsive = this.ciParams.ciToken;
      var firstImage = this.imagesX[0];
      this.update();
      if (!responsive || !this.requestResponsiveImages || this.container.offsetWidth < firstImage.width * 1.5) return;
      this.speedFactor = (0, _utils.getSpeedFactor)(this.dragSpeed, this.amountX, this.container.offsetWidth);
      var srcX = (0, _utils.generateImagesPath)(this.srcXConfig);
      (0, _utils.preloadImages)(this.srcXConfig, srcX, this.onResizedImageLoad.bind(this, _constants.ORIENTATIONS.X));
      if (this.allowSpinY) {
        var srcY = (0, _utils.generateImagesPath)(this.srcYConfig);
        (0, _utils.preloadImages)(this.srcYConfig, srcY, this.onResizedImageLoad.bind(this, _constants.ORIENTATIONS.Y));
      }
    }
  }, {
    key: "update",
    value: function update() {
      var image = this.imagesX[this.activeImageX - 1];
      if (this.movingDirection === _constants.ORIENTATIONS.Y) {
        image = this.imagesY[this.activeImageY - 1];
      }
      if (!image) return;
      var ctx = this.canvas.getContext("2d");
      ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
      this.updateContainerAndCanvasSize(image);
      if (this.fullscreenView) {
        var _contain = (0, _utils.contain)(this.canvas.width, this.canvas.height, image.width, image.height),
          width = _contain.width,
          height = _contain.height,
          offsetX = _contain.offsetX,
          offsetY = _contain.offsetY;
        ctx.drawImage(image, offsetX, offsetY, width, height);
      } else {
        if (this.mouseTracked) {
          this.updateImageScale(ctx);
        } else {
          if (this.hotspotsConfigs && !this.autoplay) {
            (0, _utils.updateHotspots)(this.container, this.hotspotsConfigs, this.activeImageX, this.activeImageY, this.movingDirection, this.isClicked);
          }
          ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        }
      }
      if (this.info) {
        this.showImageInfo(ctx);
      }
    }
  }, {
    key: "updateImageScale",
    value: function updateImageScale(ctx) {
      var image = this.originalImagesX[this.activeImageX - 1];
      if (this.movingDirection === _constants.ORIENTATIONS.Y) {
        image = this.originalImagesY[this.activeImageY - 1];
      }
      var position = this.getCursorPositionInCanvas();
      var imageWidth = this.canvas.width;
      var imageHeight = this.canvas.height;
      var width = this.canvas.width * this.zoomIntensity;
      var height = this.canvas.height * this.zoomIntensity;
      var pointX = 0 - position.x / imageWidth * (width - this.canvas.width);
      var pointY = 0 - position.y / imageHeight * (height - this.canvas.height);
      ctx.drawImage(image, pointX, pointY, width, height);
    }
  }, {
    key: "updatePercentageInLoader",
    value: function updatePercentageInLoader(percentage) {
      if (this.loader) {
        this.loader.style.width = percentage + '%';
      }
      if (this.view360Icon) {
        this.view360Icon.innerText = percentage + '%';
      }
    }
  }, {
    key: "onFirstImageLoaded",
    value: function onFirstImageLoaded(image) {
      this.add360ViewIcon();
      var ctx = this.canvas.getContext("2d");
      ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
      this.updateContainerAndCanvasSize(image);
      if (this.fullscreenView) {
        var _contain2 = (0, _utils.contain)(this.canvas.width, this.canvas.height, image.width, image.height),
          offsetX = _contain2.offsetX,
          offsetY = _contain2.offsetY,
          width = _contain2.width,
          height = _contain2.height;
        this.offset = {
          x: offsetX,
          y: offsetY
        };
        this.addCloseFullscreenView();
        ctx.drawImage(image, offsetX, offsetY, width, height);
      } else {
        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      }
      if (this.info) {
        this.showImageInfo(ctx);
      }
      if (this.magnifier) {
        this.addMagnifier();
      }
      if (this.boxShadow && !this.fullscreenView) {
        this.boxShadowEl = (0, _utils.createBoxShadow)(this.boxShadow, this.innerBox);
      }
      if (this.bottomCircle && !this.fullscreenView) {
        this.add360ViewCircleIcon();
      }
      if (this.fullscreen && !this.fullscreenView) {
        this.addFullscreenIcon();
      }
    }
  }, {
    key: "onAllImagesLoaded",
    value: function onAllImagesLoaded() {
      this.removeLoader();
      this.imagesLoaded = true;
      if (this.autoplay && this.pointerZoom) {
        this.container.style.cursor = 'zoom-in';
      } else {
        this.container.style.cursor = 'grab';
      }
      this.speedFactor = (0, _utils.getSpeedFactor)(this.dragSpeed, this.amountX, this.container.offsetWidth);
      if (this.autoplay) {
        this.play();
      }
      if (this.disableDrag) {
        this.container.style.cursor = 'default';
      }
      if (this.view360Icon) {
        if (this.hide360Logo) return this.remove360ViewIcon();
        this.view360Icon.innerText = '';
        //TODO [deprecated]: remove setView360Icon in the upcoming versions
        if (this.logoSrc) (0, _ci.setView360Icon)(this.view360Icon, this.logoSrc);
      }
      this.initControls();
    }
  }, {
    key: "magnify",
    value: function magnify(event) {
      var _this3 = this;
      event.stopPropagation();
      if (this.mouseTracked) this.togglePointerZoom();
      var currentOriginalImage = (0, _utils.getCurrentOriginalImage)(this.movingDirection, this.imagesX, this.imagesY, this.activeImageX, this.activeImageY);
      this.isMagnifyOpen = true;
      currentOriginalImage.onload = function () {
        if (_this3.glass) {
          _this3.glass.style.cursor = 'none';
        }
      };
      this.glass = document.createElement('div');
      this.container.style.overflow = 'hidden';
      (0, _utils.magnify)(this.container, this.offset, currentOriginalImage, this.glass, this.magnifier || 3);
    }
  }, {
    key: "closeMagnifier",
    value: function closeMagnifier() {
      if (!this.glass) return;
      this.container.style.overflow = 'visible';
      this.container.removeChild(this.glass);
      this.glass = null;
      this.isMagnifyOpen = false;
    }
  }, {
    key: "openFullscreenModal",
    value: function openFullscreenModal(event) {
      event.stopPropagation();
      if (this.mouseTracked) this.togglePointerZoom();
      var fullscreenContainer = (0, _utils.createFullscreenModal)(this.container);
      new CI360Viewer(fullscreenContainer, true, this.hotspotsConfigs);
    }
  }, {
    key: "setFullscreenEvents",
    value: function setFullscreenEvents(_, event) {
      if (event.type === 'click') return this.closeFullscreenModal(event);
      if (event.key === 'Escape' && this.container.parentNode.parentNode === document.body) {
        this.closeFullscreenModalOnEsc(event);
      }
    }
  }, {
    key: "closeFullscreenModalOnEsc",
    value: function closeFullscreenModalOnEsc(event) {
      this.closeFullscreenModal(event);
    }
  }, {
    key: "play",
    value: function play() {
      var _this4 = this;
      if (this.bottomCircle) this.hide360ViewCircleIcon();
      this.remove360ViewIcon();
      this.loopTimeoutId = window.setInterval(function () {
        _this4.loop(_this4.reversed);
        var isPlayedOnce = (0, _utils.isCompletedOneCycle)(_this4.autoplayBehavior, _this4.activeImageX, _this4.activeImageY, _this4.amountX, _this4.amountY, _this4.reversed);
        if (_this4.playOnce && isPlayedOnce) {
          window.clearTimeout(_this4.loopTimeoutId);
          _this4.autoplay = false;
          if (_this4.hotspotsConfigs) {
            (0, _utils.updateHotspots)(_this4.container, _this4.hotspotsConfigs, _this4.activeImageX, _this4.activeImageY, _this4.movingDirection, _this4.isClicked);
          }
        }
      }, this.autoplaySpeed);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.bottomCircle) this.show360ViewCircleIcon();
      window.clearTimeout(this.loopTimeoutId);
    }
  }, {
    key: "updateView",
    value: function updateView(forceUpdate, viewers, hotspotConfigs) {
      var _this5 = this;
      var container = this.container;
      var imageProps = (0, _ci.get360ViewProps)(container);
      var srcPropsChanged = (0, _utils.isPropsChangeRequireReload)(this, imageProps);
      var reInitView = srcPropsChanged || forceUpdate;
      if (reInitView) {
        var oldElement = this.container;
        var viewIndex = viewers.findIndex(function (view) {
          return view.id === _this5.container.id;
        });
        container.removeChild(this.innerBox);
        container = container.cloneNode(true);
        container.className = container.className.replace(' initialized', '');
        oldElement.parentNode.replaceChild(container, oldElement);
        return viewers.splice(viewIndex, 1, new CI360Viewer(container));
      }
      container.style.position = 'relative';
      container.style.width = '100%';
      container.style.cursor = 'default';
      container.setAttribute('draggable', 'false');
      this.stop();
      this.init(container, true, hotspotConfigs);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      var oldElement = this.container;
      var newElement = oldElement.cloneNode(true);
      var innerBox = newElement.querySelector('.cloudimage-360-inner-box');
      newElement.className = newElement.className.replace(' initialized', '');
      newElement.style.position = 'relative';
      newElement.style.width = '100%';
      newElement.style.cursor = 'default';
      newElement.setAttribute('draggable', 'false');
      newElement.style.minHeight = 'auto';
      newElement.removeChild(innerBox);
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
  }, {
    key: "addCloseFullscreenView",
    value: function addCloseFullscreenView(event) {
      var closeFullscreenIcon = (0, _utils.createCloseFullscreenIcon)();
      closeFullscreenIcon.onclick = this.setFullscreenEvents.bind(this, event);
      window.onkeyup = this.setFullscreenEvents.bind(this, event);
      this.iconsContainer.appendChild(closeFullscreenIcon);
    }
  }, {
    key: "add360ViewIcon",
    value: function add360ViewIcon() {
      this.view360Icon = (0, _utils.create360ViewIcon)();
      this.innerBox.appendChild(this.view360Icon);
    }
  }, {
    key: "addFullscreenIcon",
    value: function addFullscreenIcon() {
      this.fullscreenIcon = (0, _utils.createFullscreenIcon)();
      this.fullscreenIcon.onclick = this.openFullscreenModal.bind(this);
      this.iconsContainer.appendChild(this.fullscreenIcon);
    }
  }, {
    key: "showFullscreenIcon",
    value: function showFullscreenIcon() {
      if (!this.fullscreenIcon) return;
      this.fullscreenIcon.style.display = 'block';
      this.fullscreenIcon.style.pointerEvents = 'auto';
    }
  }, {
    key: "hideFullscreenIcon",
    value: function hideFullscreenIcon() {
      if (!this.fullscreenIcon) return;
      this.fullscreenIcon.style.display = 'none';
      this.fullscreenIcon.style.pointerEvents = 'none';
    }
  }, {
    key: "addMagnifier",
    value: function addMagnifier() {
      this.magnifierIcon = (0, _utils.createMagnifierIcon)();
      this.magnifierIcon.onclick = this.magnify.bind(this);
      this.iconsContainer.appendChild(this.magnifierIcon);
    }
  }, {
    key: "enableMagnifierIcon",
    value: function enableMagnifierIcon() {
      if (!this.magnifierIcon) return;
      this.magnifierIcon.style.display = 'block';
      this.magnifierIcon.style.pointerEvents = 'auto';
    }
  }, {
    key: "disableMagnifierIcon",
    value: function disableMagnifierIcon() {
      if (!this.magnifierIcon) return;
      this.magnifierIcon.style.display = 'none';
      this.magnifierIcon.style.pointerEvents = 'none';
    }
  }, {
    key: "closeFullscreenModal",
    value: function closeFullscreenModal(event) {
      event.stopPropagation();
      document.body.removeChild(this.container.parentNode);
      window.document.body.style.overflow = 'visible';
    }
  }, {
    key: "add360ViewCircleIcon",
    value: function add360ViewCircleIcon() {
      this.view360CircleIcon = (0, _utils.create360ViewCircleIcon)(this.bottomCircleOffset);
      this.innerBox.appendChild(this.view360CircleIcon);
    }
  }, {
    key: "show360ViewCircleIcon",
    value: function show360ViewCircleIcon() {
      if (!this.view360CircleIcon) return;
      this.view360CircleIcon.style.opacity = '1';
    }
  }, {
    key: "hide360ViewCircleIcon",
    value: function hide360ViewCircleIcon() {
      if (!this.view360CircleIcon) return;
      this.view360CircleIcon.style.opacity = '0';
    }
  }, {
    key: "remove360ViewCircleIcon",
    value: function remove360ViewCircleIcon() {
      if (!this.view360CircleIcon) return;
      this.innerBox.removeChild(this.view360CircleIcon);
      this.view360CircleIcon = null;
    }
  }, {
    key: "removeLoader",
    value: function removeLoader() {
      if (!this.loader) return;
      this.innerBox.removeChild(this.loader);
      this.loader = null;
    }
  }, {
    key: "remove360ViewIcon",
    value: function remove360ViewIcon() {
      if (!this.view360Icon) return;
      try {
        this.innerBox.removeChild(this.view360Icon);
        this.view360Icon = null;
      } catch (_unused) {}
    }
  }, {
    key: "initControls",
    value: function initControls() {
      var _this6 = this;
      var onLeftStart = function onLeftStart(event) {
        event.stopPropagation();
        _this6.onSpin();
        _this6.left();
        _this6.loopTimeoutId = window.setInterval(_this6.left.bind(_this6), _this6.autoplaySpeed);
      };
      var onRightStart = function onRightStart(event) {
        event.stopPropagation();
        _this6.onSpin();
        _this6.right();
        _this6.loopTimeoutId = window.setInterval(_this6.right.bind(_this6), _this6.autoplaySpeed);
      };
      var onTopStart = function onTopStart(event) {
        event.stopPropagation();
        _this6.onSpin();
        _this6.top();
        _this6.loopTimeoutId = window.setInterval(_this6.top.bind(_this6), _this6.autoplaySpeed);
      };
      var onBottomStart = function onBottomStart(event) {
        event.stopPropagation();
        _this6.onSpin();
        _this6.bottom();
        _this6.loopTimeoutId = window.setInterval(_this6.bottom.bind(_this6), _this6.autoplaySpeed);
      };
      var onEventEnd = function onEventEnd() {
        _this6.onFinishSpin();
        window.clearTimeout(_this6.loopTimeoutId);
      };
      var controlsConfig = {
        container: this.container,
        controlReverse: this.controlReverse,
        spinReverse: this.spinReverse,
        stopAtEdges: this.stopAtEdges
      };
      var controlsTriggers = {
        onLeftStart: onLeftStart,
        onRightStart: onRightStart,
        onTopStart: onTopStart,
        onBottomStart: onBottomStart,
        onEventEnd: onEventEnd
      };
      var controlsElements = (0, _utils.initControls)(controlsConfig, controlsTriggers);
      this.topElem = controlsElements.top;
      this.bottomElem = controlsElements.bottom;
      this.leftElem = controlsElements.left;
      this.rightElem = controlsElements.right;
    }
  }, {
    key: "attachEvents",
    value: function attachEvents(draggable, swipeable, keys) {
      window.addEventListener('resize', this.requestResizedImages.bind(this));
      if (draggable && !this.disableDrag) {
        this.container.addEventListener('click', this.mouseClick.bind(this));
        this.container.addEventListener('mousedown', this.mouseDown.bind(this));
        this.container.addEventListener('mousemove', this.mouseMove.bind(this));
        this.container.addEventListener('mouseleave', this.mouseLeave.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
      }
      if (swipeable && !this.disableDrag) {
        this.container.addEventListener('touchstart', this.touchStart.bind(this), {
          passive: true
        });
        this.container.addEventListener('touchend', this.touchEnd.bind(this));
        this.container.addEventListener('touchmove', this.touchMove.bind(this));
      }
      if (keys) {
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
      }
      document.addEventListener('keydown', this.keyDownGeneral.bind(this));
    }
  }, {
    key: "init",
    value: function init(container) {
      var _this7 = this;
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var hotspotsConfigs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var _get360ViewProps = (0, _ci.get360ViewProps)(container),
        folder = _get360ViewProps.folder,
        apiVersion = _get360ViewProps.apiVersion,
        filenameX = _get360ViewProps.filenameX,
        filenameY = _get360ViewProps.filenameY,
        imageListX = _get360ViewProps.imageListX,
        imageListY = _get360ViewProps.imageListY,
        indexZeroBase = _get360ViewProps.indexZeroBase,
        amountX = _get360ViewProps.amountX,
        amountY = _get360ViewProps.amountY,
        _get360ViewProps$drag = _get360ViewProps.draggable,
        draggable = _get360ViewProps$drag === void 0 ? true : _get360ViewProps$drag,
        _get360ViewProps$swip = _get360ViewProps.swipeable,
        swipeable = _get360ViewProps$swip === void 0 ? true : _get360ViewProps$swip,
        keys = _get360ViewProps.keys,
        keysReverse = _get360ViewProps.keysReverse,
        bottomCircle = _get360ViewProps.bottomCircle,
        bottomCircleOffset = _get360ViewProps.bottomCircleOffset,
        boxShadow = _get360ViewProps.boxShadow,
        autoplay = _get360ViewProps.autoplay,
        autoplayBehavior = _get360ViewProps.autoplayBehavior,
        playOnce = _get360ViewProps.playOnce,
        speed = _get360ViewProps.speed,
        autoplayReverse = _get360ViewProps.autoplayReverse,
        _get360ViewProps$disa = _get360ViewProps.disableDrag,
        disableDrag = _get360ViewProps$disa === void 0 ? true : _get360ViewProps$disa,
        fullscreen = _get360ViewProps.fullscreen,
        magnifier = _get360ViewProps.magnifier,
        ciToken = _get360ViewProps.ciToken,
        ciFilters = _get360ViewProps.ciFilters,
        ciTransformation = _get360ViewProps.ciTransformation,
        lazyload = _get360ViewProps.lazyload,
        lazySelector = _get360ViewProps.lazySelector,
        spinReverse = _get360ViewProps.spinReverse,
        dragSpeed = _get360ViewProps.dragSpeed,
        stopAtEdges = _get360ViewProps.stopAtEdges,
        controlReverse = _get360ViewProps.controlReverse,
        hide360Logo = _get360ViewProps.hide360Logo,
        logoSrc = _get360ViewProps.logoSrc,
        pointerZoom = _get360ViewProps.pointerZoom,
        ratio = _get360ViewProps.ratio,
        _get360ViewProps$imag = _get360ViewProps.imageInfo,
        imageInfo = _get360ViewProps$imag === void 0 ? 'black' : _get360ViewProps$imag,
        requestResponsiveImages = _get360ViewProps.requestResponsiveImages;
      var ciParams = {
        ciToken: ciToken,
        ciFilters: ciFilters,
        ciTransformation: ciTransformation
      };
      this.folder = folder;
      this.apiVersion = apiVersion;
      this.filenameX = filenameX;
      this.filenameY = filenameY;
      this.imageListX = imageListX;
      this.imageListY = imageListY;
      this.indexZeroBase = indexZeroBase;
      this.amountX = imageListX ? JSON.parse(imageListX).length : amountX;
      this.amountY = imageListY ? JSON.parse(imageListY).length : amountY;
      this.allowSpinY = !!this.amountY;
      this.activeImageX = autoplayReverse ? this.amountX : 1;
      this.activeImageY = autoplayReverse ? this.amountY : 1;
      this.spinY = autoplayBehavior === _constants.AUTOPLAY_BEHAVIOR.SPIN_YX ? true : false;
      this.bottomCircle = bottomCircle;
      this.bottomCircleOffset = bottomCircleOffset;
      this.boxShadow = boxShadow;
      this.autoplay = autoplay;
      this.autoplayBehavior = autoplayBehavior;
      this.playOnce = playOnce;
      this.speed = speed;
      this.reversed = autoplayReverse;
      this.disableDrag = disableDrag;
      this.fullscreen = fullscreen;
      this.magnifier = !this.isMobile && magnifier > 1 ? Math.min(magnifier, 5) : 0;
      this.lazySelector = lazySelector;
      this.spinReverse = spinReverse;
      this.controlReverse = controlReverse;
      this.dragSpeed = Math.max(dragSpeed, 50);
      this.autoplaySpeed = this.speed * 36 / this.amountX;
      this.stopAtEdges = stopAtEdges;
      this.hide360Logo = hide360Logo;
      this.logoSrc = logoSrc;
      this.ciParams = ciParams;
      this.apiVersion = apiVersion;
      this.pointerZoom = pointerZoom > 1 ? Math.min(pointerZoom, 3) : 0;
      this.keysReverse = keysReverse;
      this.info = imageInfo;
      this.keys = keys;
      this.ratio = ratio && JSON.parse(ratio);
      this.requestResponsiveImages = requestResponsiveImages;
      if (update) {
        (0, _utils.removeChildFromParent)(this.innerBox, this.iconsContainer);
        (0, _utils.removeChildFromParent)(this.innerBox, this.boxShadowEl);
        (0, _utils.removeChildFromParent)(this.innerBox, this.view360Icon);
        this.remove360ViewCircleIcon();
        this.iconsContainer = (0, _utils.createIconsContainer)(this.innerBox);
        if (!this.hide360Logo && !this.lazyload && this.logoSrc) {
          this.add360ViewIcon();
          (0, _ci.setView360Icon)(this.view360Icon, this.logoSrc);
        }
        if (this.magnifier) {
          this.addMagnifier();
        }
        if (this.bottomCircle && !this.fullscreenView) {
          this.add360ViewCircleIcon();
        }
        if (this.fullscreen && !this.fullscreenView) {
          this.addFullscreenIcon();
        }
        if (this.boxShadow && !this.fullscreenView) {
          this.boxShadowEl = (0, _utils.createBoxShadow)(this.boxShadow, this.innerBox);
        }
        if (hotspotsConfigs && !this.fullscreenView) {
          this.hotspotsConfigs = (0, _utils.generateHotspotsConfigs)(hotspotsConfigs);
          (0, _utils.createHotspots)(container, this.hotspotsConfigs);
        }
        return this.onAllImagesLoaded();
      }
      this.innerBox = (0, _utils.createInnerBox)(this.container);
      this.iconsContainer = (0, _utils.createIconsContainer)(this.innerBox);
      this.canvas = (0, _utils.createCanvas)(this.innerBox);
      this.loader = (0, _utils.createLoader)(this.innerBox);
      if (this.hotspotsConfigs && !this.fullscreenView) {
        (0, _utils.createHotspots)(container, this.hotspotsConfigs);
      }
      (0, _utils.applyStylesToContainer)(this.container);
      this.srcXConfig = {
        folder: folder,
        filename: filenameX,
        imageList: imageListX,
        container: container,
        innerBox: this.innerBox,
        apiVersion: apiVersion,
        ciParams: ciParams,
        lazySelector: lazySelector,
        amount: this.amountX,
        indexZeroBase: indexZeroBase,
        fullscreen: this.fullscreenView
      };
      this.srcYConfig = _objectSpread(_objectSpread({}, this.srcXConfig), {}, {
        filename: filenameY,
        orientation: _constants.ORIENTATIONS.Y,
        imageList: imageListY,
        amount: this.amountY
      });
      var srcX = (0, _utils.generateImagesPath)(this.srcXConfig);
      var onImageLoad = function onImageLoad(orientation, image, index) {
        if (orientation === _constants.ORIENTATIONS.X) {
          _this7.imagesX[index] = image;
        } else {
          _this7.imagesY[index] = image;
        }
        var totalAmount = _this7.amountX + _this7.amountY;
        var totalLoadedImages = _this7.imagesX.length + _this7.imagesY.length;
        var isFirstImageLoaded = !index && orientation !== _constants.ORIENTATIONS.Y;
        var percentage = Math.round(totalLoadedImages / totalAmount * 100);
        _this7.updatePercentageInLoader(percentage);
        if (isFirstImageLoaded) {
          _this7.onFirstImageLoaded(image);
        } else if (_this7.autoplay) {
          _this7.moveRight(index);
        }
        if (_this7.isReady()) {
          _this7.onAllImagesLoaded();
        }
      };
      var loadImages = function loadImages() {
        (0, _utils.preloadImages)(_this7.srcXConfig, srcX, onImageLoad.bind(_this7, _constants.ORIENTATIONS.X));
        if (_this7.allowSpinY) {
          var srcY = (0, _utils.generateImagesPath)(_this7.srcYConfig);
          (0, _utils.preloadImages)(_this7.srcYConfig, srcY, onImageLoad.bind(_this7, _constants.ORIENTATIONS.Y));
        }
      };
      if (lazyload) {
        var onFirstImageLoad = function onFirstImageLoad(image) {
          _this7.innerBox.removeChild(image);
          loadImages();
        };
        (0, _utils.initLazyload)(srcX, this.srcXConfig, onFirstImageLoad);
      } else {
        loadImages();
      }
      this.attachEvents(draggable, swipeable, keys);
    }
  }]);
  return CI360Viewer;
}();
var _default = CI360Viewer;
exports.default = _default;