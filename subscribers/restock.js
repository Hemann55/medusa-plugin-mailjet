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
var RestockNotification = /*#__PURE__*/(0, _createClass2["default"])(function RestockNotification(_ref) {
  var eventBusService = _ref.eventBusService,
    mailjetService = _ref.mailjetService;
  (0, _classCallCheck2["default"])(this, RestockNotification);
  eventBusService.subscribe('restock-notification.restocked', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(eventData) {
      var templateId, data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return mailjetService.getTemplateId('restock-notification.restocked');
          case 2:
            templateId = _context2.sent;
            if (templateId) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return");
          case 5:
            _context2.next = 7;
            return mailjetService.fetchData('restock-notification.restocked', eventData, null);
          case 7:
            data = _context2.sent;
            if (data.emails) {
              _context2.next = 10;
              break;
            }
            return _context2.abrupt("return");
          case 10:
            _context2.next = 12;
            return Promise.all(data.emails.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
                var sendOptions;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      sendOptions = {
                        template_id: templateId,
                        from: mailjetService.options_.from,
                        to: e,
                        dynamic_template_data: data
                      };
                      _context.next = 3;
                      return mailjetService.sendEmail(sendOptions);
                    case 3:
                      return _context.abrupt("return", _context.sent);
                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }()));
          case 12:
            return _context2.abrupt("return", _context2.sent);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
});
var _default = RestockNotification;
exports["default"] = _default;