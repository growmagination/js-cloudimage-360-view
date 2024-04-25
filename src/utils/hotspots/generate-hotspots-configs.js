"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHotspotsConfigs = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _configsErrorHandler = require("./configs-error-handler");
var _generatePopupConfig = require("./generate-popup-config");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var generateHotspotsConfigs = function generateHotspotsConfigs(hotspotsProps) {
  var hotspotsConfigs = hotspotsProps.map(function (hotspotProps) {
    var _hotspotProps$variant = hotspotProps.variant,
      variant = _hotspotProps$variant === void 0 ? {} : _hotspotProps$variant,
      _hotspotProps$positio = hotspotProps.positions,
      positions = _hotspotProps$positio === void 0 ? [] : _hotspotProps$positio,
      _hotspotProps$indicat = hotspotProps.indicatorSelector,
      indicatorSelector = _hotspotProps$indicat === void 0 ? '' : _hotspotProps$indicat,
      _hotspotProps$popupPr = hotspotProps.popupProps,
      popupProps = _hotspotProps$popupPr === void 0 ? {} : _hotspotProps$popupPr,
      _hotspotProps$orienta = hotspotProps.orientation,
      orientation = _hotspotProps$orienta === void 0 ? 'x' : _hotspotProps$orienta,
      _hotspotProps$initial = hotspotProps.initialDimensions,
      initialDimensions = _hotspotProps$initial === void 0 ? [500, 500] : _hotspotProps$initial;
    (0, _configsErrorHandler.configsErrorHandler)(hotspotProps);
    var popupConfig = (0, _generatePopupConfig.generatePopupConfig)(popupProps);
    var anchorId = variant === null || variant === void 0 ? void 0 : variant.anchorId;
    if (!anchorId) {
      var uniqueID = Math.floor(Math.random() * 10000);
      anchorId = "cloudimage-360-".concat(uniqueID);
    }
    var hotspotConfig = {
      variant: _objectSpread(_objectSpread({}, variant), {}, {
        anchorId: anchorId
      }),
      popupProps: popupConfig,
      positions: positions,
      indicatorSelector: indicatorSelector,
      initialDimensions: initialDimensions,
      orientation: orientation.toLowerCase()
    };
    return hotspotConfig;
  });
  return hotspotsConfigs;
};
exports.generateHotspotsConfigs = generateHotspotsConfigs;