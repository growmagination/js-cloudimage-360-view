"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadOriginalImages = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _loadImageAsPromise = require("./load-image-as-promise");
var loadOriginalImages = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(imagesSrcs, cb) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Promise.all(imagesSrcs.map( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(src, index) {
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _loadImageAsPromise.loadImageAsPromise)(src, index, cb);
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function loadOriginalImages(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.loadOriginalImages = loadOriginalImages;