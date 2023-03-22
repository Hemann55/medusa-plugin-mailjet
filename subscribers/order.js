"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var OrderSubscriber = /*#__PURE__*/(0, _createClass2["default"])(function OrderSubscriber(_ref) {
  var notificationService = _ref.notificationService;
  (0, _classCallCheck2["default"])(this, OrderSubscriber);
  this.notificationService_ = notificationService;
  this.notificationService_.subscribe('order.shipment_created', 'mailjet');
  this.notificationService_.subscribe('order.gift_card_created', 'mailjet');
  this.notificationService_.subscribe('gift_card.created', 'mailjet');
  //this.notificationService_.subscribe('order.placed', 'mailjet')
  this.notificationService_.subscribe('order.canceled', 'mailjet');
  //this.notificationService_.subscribe('customer.password_reset', 'mailjet')
  this.notificationService_.subscribe('claim.shipment_created', 'mailjet');
  this.notificationService_.subscribe('swap.shipment_created', 'mailjet');
  this.notificationService_.subscribe('swap.created', 'mailjet');
  this.notificationService_.subscribe('order.items_returned', 'mailjet');
  this.notificationService_.subscribe('order.return_requested', 'mailjet');
  this.notificationService_.subscribe('order.refund_created', 'mailjet');
});
var _default = OrderSubscriber;
exports["default"] = _default;