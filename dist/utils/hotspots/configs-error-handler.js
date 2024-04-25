"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configsErrorHandler = void 0;
var configsErrorHandler = function configsErrorHandler(hotspotProps) {
  var _hotspotProps$variant = hotspotProps.variant,
    variant = _hotspotProps$variant === void 0 ? {} : _hotspotProps$variant;
  var url = variant.url,
    title = variant.title,
    anchorId = variant.anchorId,
    images = variant.images,
    description = variant.description,
    moreDetailsUrl = variant.moreDetailsUrl;
  if (url && !title) {
    console.error('Cloudimage-360: Hotspot config with variant link must have title for the link');
  }
  if (!title && !url && !anchorId && !images && !description && !moreDetailsUrl) {
    console.error('Cloudimage-360: Hotspot config with custom variant must provide anchorId');
  }
};
exports.configsErrorHandler = configsErrorHandler;