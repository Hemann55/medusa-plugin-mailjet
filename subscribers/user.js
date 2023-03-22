"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var UserSubscriber = /*#__PURE__*/(0, _createClass2["default"])(function UserSubscriber(_ref) {
  var _this = this;
  var mailjetService = _ref.mailjetService,
    eventBusService = _ref.eventBusService;
  (0, _classCallCheck2["default"])(this, UserSubscriber);
  this.mailjetService_ = mailjetService;
  this.eventBus_ = eventBusService;
  this.eventBus_.subscribe('user.password_reset', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.mailjetService_.sendNotification('user.password_reset', data, null);
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
});
var _default = UserSubscriber;
exports["default"] = _default;