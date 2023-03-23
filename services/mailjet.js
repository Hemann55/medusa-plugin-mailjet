"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _nodeMailjet = _interopRequireDefault(require("node-mailjet"));
var _medusaCoreUtils = require("medusa-core-utils");
var _medusaInterfaces = require("medusa-interfaces");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
//Mailjet docs: https://dev.mailjet.com/email/guides/send-api-v31/
var MailJetService = /*#__PURE__*/function (_NotificationService) {
  (0, _inherits2["default"])(MailJetService, _NotificationService);
  var _super = _createSuper(MailJetService);
  /**
   * @param {Object} options - options defined in `medusa-config.js`
   *    e.g.
   *    {
   *      public_key: process.env.MAILJET_PUBLIC_KEY,
   *      private_key: process.env.MAILJET_PRIVATE_KEY,
   *      from: 'Medusa hello@medusa.example',
   *      template_error_reporting: 'Medusa hello@medusa.example',
   *      customer_created_template: 4612040,
   *      order_placed_template: 01234,
   *      order_updated_template: 56789,
   *      order_canceled_template: 4242,
   *      user_password_reset_template: 0000,
   *      customer_password_reset_template: 1111,
   *    }
   */

  function MailJetService(_ref, options) {
    var _this;
    var storeService = _ref.storeService,
      orderService = _ref.orderService,
      returnService = _ref.returnService,
      swapService = _ref.swapService,
      cartService = _ref.cartService,
      lineItemService = _ref.lineItemService,
      claimService = _ref.claimService,
      fulfillmentService = _ref.fulfillmentService,
      fulfillmentProviderService = _ref.fulfillmentProviderService,
      totalsService = _ref.totalsService,
      productVariantService = _ref.productVariantService;
    (0, _classCallCheck2["default"])(this, MailJetService);
    _this = _super.call(this);
    _this.options_ = options;
    _this.fulfillmentProviderService_ = fulfillmentProviderService;
    _this.storeService_ = storeService;
    _this.lineItemService_ = lineItemService;
    _this.orderService_ = orderService;
    _this.cartService_ = cartService;
    _this.claimService_ = claimService;
    _this.returnService_ = returnService;
    _this.swapService_ = swapService;
    _this.fulfillmentService_ = fulfillmentService;
    _this.totalsService_ = totalsService;
    _this.productVariantService_ = productVariantService;
    _this.mailjet_ = new _nodeMailjet["default"]({
      apiKey: options.public_key,
      apiSecret: options.private_key
    });
    return _this;
  }

  /**
   * Sends an email using Mailjet.
   * @param {string} templateId - id of template in Mailjet
   * @param {string} from - sender of email
   * @param {string} to - receiver of email
   * @param {Object} data - data to send in mail (match with template)
   * @return {Promise} result of the send operation
   */
  (0, _createClass2["default"])(MailJetService, [{
    key: "sendEmail",
    value: function () {
      var _sendEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var template_id, from, to, dynamic_template_data, has_attachments, attachments, fromString, messages, emailString, request;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              template_id = options.template_id, from = options.from, to = options.to, dynamic_template_data = options.dynamic_template_data, has_attachments = options.has_attachments, attachments = options.attachments;
              fromString = from.split(' ');
              messages = [{
                From: {
                  Email: fromString[1],
                  Name: fromString[0]
                },
                To: [{
                  Email: to
                  //Name: `${dynamic_template_data.first_name} ${dynamic_template_data.last_name}`,
                }]
              }];

              if (this.options_.template_error_reporting) {
                emailString = from.split(' ');
                messages[0].TemplateErrorReporting = {
                  Email: emailString[1],
                  Name: emailString[0]
                };
                messages[0].TemplateErrorDeliver = true;
              }
              if (template_id) {
                messages[0].TemplateID = template_id;
                messages[0].TemplateLanguage = true;
              }
              if (dynamic_template_data) {
                messages[0].Variables = dynamic_template_data;
              }
              if (has_attachments && attachments.length) {
                messages[0].Attachments = attachments;
              }
              request = this.mailjet_.post('send', {
                version: 'v3.1'
              }).request({
                Messages: messages
              });
              request.then(function (result) {
                //console.log('result.body', result.body)
                return 'sent';
              })["catch"](function (err) {
                //console.log('err', err)
                return 'failed';
              });
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function sendEmail(_x) {
        return _sendEmail.apply(this, arguments);
      }
      return sendEmail;
    }()
  }, {
    key: "sendNotification",
    value: function () {
      var _sendNotification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(event, eventData, attachmentGenerator) {
        var templateId, data, attachments, sendOptions, status;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              templateId = this.getTemplateId(event);
              if (templateId) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return", false);
            case 3:
              _context2.next = 5;
              return this.fetchData(event, eventData, attachmentGenerator);
            case 5:
              data = _context2.sent;
              _context2.next = 8;
              return this.fetchAttachments(event, data, attachmentGenerator);
            case 8:
              attachments = _context2.sent;
              // console.log('event', event)
              // console.log('eventData', eventData)
              // console.log('data', data)
              // console.log('attachments', attachments)

              if (data.locale) {
                templateId = this.getLocalizedTemplateId(event, data.locale) || templateId;
              }

              // console.log('templateId', templateId)
              sendOptions = {
                template_id: templateId,
                from: this.options_.from,
                to: data.email,
                dynamic_template_data: data,
                has_attachments: attachments === null || attachments === void 0 ? void 0 : attachments.length
              };
              if (attachments !== null && attachments !== void 0 && attachments.length) {
                sendOptions.has_attachments = true;
                sendOptions.attachments = attachments.map(function (a) {
                  return {
                    ContentType: a.type,
                    Filename: a.name,
                    Base64Content: a.base64
                    //disposition: 'attachment',
                    //contentId: a.name,
                  };
                });
              }
              _context2.next = 14;
              return this.sendEmail(sendOptions);
            case 14:
              status = _context2.sent;
              // We don't want heavy docs stored in DB
              delete sendOptions.attachments;
              return _context2.abrupt("return", {
                to: data.email,
                status: status,
                data: sendOptions
              });
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function sendNotification(_x2, _x3, _x4) {
        return _sendNotification.apply(this, arguments);
      }
      return sendNotification;
    }()
  }, {
    key: "resendNotification",
    value: function () {
      var _resendNotification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(notification, config, attachmentGenerator) {
        var sendOptions, attachs, status;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              sendOptions = _objectSpread(_objectSpread({}, notification.data), {}, {
                to: config.to || notification.to
              });
              _context3.next = 3;
              return this.fetchAttachments(notification.event_name, notification.data.dynamic_template_data, attachmentGenerator);
            case 3:
              attachs = _context3.sent;
              sendOptions.attachments = attachs.map(function (a) {
                return {
                  ContentType: a.type,
                  Filename: a.name,
                  Base64Content: a.base64
                  //disposition: 'attachment',
                  //contentId: a.name,
                };
              });
              _context3.next = 7;
              return sendEmail(sendOptions);
            case 7:
              status = _context3.sent;
              return _context3.abrupt("return", {
                to: sendOptions.to,
                status: status,
                data: sendOptions
              });
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function resendNotification(_x5, _x6, _x7) {
        return _resendNotification.apply(this, arguments);
      }
      return resendNotification;
    }()
  }, {
    key: "fetchAttachments",
    value: function () {
      var _fetchAttachments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(event, data, attachmentGenerator) {
        var attachments, _data$return_request, shipping_method, shipping_data, provider, lbl, base64;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = event;
              _context4.next = _context4.t0 === 'swap.created' ? 3 : _context4.t0 === 'order.return_requested' ? 3 : 17;
              break;
            case 3:
              attachments = [];
              _data$return_request = data.return_request, shipping_method = _data$return_request.shipping_method, shipping_data = _data$return_request.shipping_data;
              if (!shipping_method) {
                _context4.next = 11;
                break;
              }
              provider = shipping_method.shipping_option.provider_id;
              _context4.next = 9;
              return this.fulfillmentProviderService_.retrieveDocuments(provider, shipping_data, 'label');
            case 9:
              lbl = _context4.sent;
              attachments = attachments.concat(lbl.map(function (d) {
                return {
                  ContentType: d.type,
                  Filename: 'return-label',
                  Base64Content: d.base_64
                };
              }));
            case 11:
              if (!(attachmentGenerator && attachmentGenerator.createReturnInvoice)) {
                _context4.next = 16;
                break;
              }
              _context4.next = 14;
              return attachmentGenerator.createReturnInvoice(data.order, data.return_request.items);
            case 14:
              base64 = _context4.sent;
              attachments.push({
                ContentType: 'application/pdf',
                Filename: 'invoice',
                Base64Content: base64
              });
            case 16:
              return _context4.abrupt("return", attachments);
            case 17:
              return _context4.abrupt("return", []);
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function fetchAttachments(_x8, _x9, _x10) {
        return _fetchAttachments.apply(this, arguments);
      }
      return fetchAttachments;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(event, eventData, attachmentGenerator) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = event;
              _context5.next = _context5.t0 === 'user.password_reset' ? 3 : _context5.t0 === 'customer.created' ? 4 : _context5.t0 === 'customer.password_reset' ? 5 : _context5.t0 === 'restock-notification.restocked' ? 6 : _context5.t0 === 'order.placed' ? 9 : _context5.t0 === 'order.gift_card_created' ? 10 : _context5.t0 === 'order.shipment_created' ? 11 : _context5.t0 === 'order.return_requested' ? 12 : _context5.t0 === 'order.items_returned' ? 13 : _context5.t0 === 'order.canceled' ? 14 : _context5.t0 === 'order.refund_created' ? 15 : _context5.t0 === 'swap.created' ? 16 : _context5.t0 === 'swap.shipment_created' ? 17 : _context5.t0 === 'swap.received' ? 18 : _context5.t0 === 'claim.shipment_created' ? 19 : _context5.t0 === 'gift_card.created' ? 20 : 21;
              break;
            case 3:
              return _context5.abrupt("return", this.userPasswordResetData(eventData, attachmentGenerator));
            case 4:
              return _context5.abrupt("return", this.customerCreatedData(eventData, attachmentGenerator));
            case 5:
              return _context5.abrupt("return", this.customerPasswordResetData(eventData, attachmentGenerator));
            case 6:
              _context5.next = 8;
              return this.restockNotificationData(eventData, attachmentGenerator);
            case 8:
              return _context5.abrupt("return", _context5.sent);
            case 9:
              return _context5.abrupt("return", this.orderPlacedData(eventData, attachmentGenerator));
            case 10:
              return _context5.abrupt("return", this.gcCreatedData(eventData, attachmentGenerator));
            case 11:
              return _context5.abrupt("return", this.orderShipmentCreatedData(eventData, attachmentGenerator));
            case 12:
              return _context5.abrupt("return", this.returnRequestedData(eventData, attachmentGenerator));
            case 13:
              return _context5.abrupt("return", this.itemsReturnedData(eventData, attachmentGenerator));
            case 14:
              return _context5.abrupt("return", this.orderCanceledData(eventData, attachmentGenerator));
            case 15:
              return _context5.abrupt("return", this.orderRefundCreatedData(eventData, attachmentGenerator));
            case 16:
              return _context5.abrupt("return", this.swapCreatedData(eventData, attachmentGenerator));
            case 17:
              return _context5.abrupt("return", this.swapShipmentCreatedData(eventData, attachmentGenerator));
            case 18:
              return _context5.abrupt("return", this.swapReceivedData(eventData, attachmentGenerator));
            case 19:
              return _context5.abrupt("return", this.claimShipmentCreatedData(eventData, attachmentGenerator));
            case 20:
              return _context5.abrupt("return", this.gcCreatedData(eventData, attachmentGenerator));
            case 21:
              return _context5.abrupt("return", {});
            case 22:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function fetchData(_x11, _x12, _x13) {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "getTemplateId",
    value: function getTemplateId(event) {
      switch (event) {
        case 'user.password_reset':
          return this.options_.user_password_reset_template;
        case 'customer.created':
          return this.options_.customer_created_template;
        case 'customer.password_reset':
          return this.options_.customer_password_reset_template;
        case 'restock-notification.restocked':
          return this.options_.medusa_restock_template;
        case 'order.placed':
          return this.options_.order_placed_template;
        case 'order.gift_card_created':
          return this.options_.gift_card_created_template;
        case 'order.shipment_created':
          return this.options_.order_shipped_template;
        case 'order.return_requested':
          return this.options_.order_return_requested_template;
        case 'order.items_returned':
          return this.options_.order_items_returned_template;
        case 'order.canceled':
          return this.options_.order_canceled_template;
        case 'order.refund_created':
          return this.options_.order_refund_created_template;
        case 'swap.created':
          return this.options_.swap_created_template;
        case 'swap.shipment_created':
          return this.options_.swap_shipment_created_template;
        case 'swap.received':
          return this.options_.swap_received_template;
        case 'claim.shipment_created':
          return this.options_.claim_shipment_created_template;
        case 'gift_card.created':
          return this.options_.gift_card_created_template;
        default:
          return null;
      }
    }
  }, {
    key: "getLocalizedTemplateId",
    value: function getLocalizedTemplateId(event, locale) {
      if (this.options_.localization && this.options_.localization[locale]) {
        var map = this.options_.localization[locale];
        switch (event) {
          case 'user.password_reset':
            return map.user_password_reset_template;
          case 'customer.created':
            return map.customer_created_template;
          case 'customer.password_reset':
            return map.customer_password_reset_template;
          case 'restock-notification.restocked':
            return map.medusa_restock_template;
          case 'order.placed':
            return map.order_placed_template;
          case 'order.gift_card_created':
            return map.gift_card_created_template;
          case 'order.shipment_created':
            return map.order_shipped_template;
          case 'order.return_requested':
            return map.order_return_requested_template;
          case 'order.items_returned':
            return map.order_items_returned_template;
          case 'order.canceled':
            return map.order_canceled_template;
          case 'order.refund_created':
            return map.order_refund_created_template;
          case 'swap.created':
            return map.swap_created_template;
          case 'swap.shipment_created':
            return map.swap_shipment_created_template;
          case 'swap.received':
            return map.swap_received_template;
          case 'claim.shipment_created':
            return map.claim_shipment_created_template;
          case 'gift_card.created':
            return map.gift_card_created_template;
          default:
            return null;
        }
      }
      return null;
    }
  }, {
    key: "userPasswordResetData",
    value: function userPasswordResetData(data) {
      return data;
    }
  }, {
    key: "customerPasswordResetData",
    value: function customerPasswordResetData(data) {
      return data;
    }
  }, {
    key: "customerCreatedData",
    value: function customerCreatedData(data) {
      return data;
    }
  }, {
    key: "orderShipmentCreatedData",
    value: function () {
      var _orderShipmentCreatedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref2, attachmentGenerator) {
        var id, fulfillment_id, order, shipment, locale;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = _ref2.id, fulfillment_id = _ref2.fulfillment_id;
              _context6.next = 3;
              return this.orderService_.retrieve(id, {
                select: ['shipping_total', 'discount_total', 'tax_total', 'refunded_total', 'gift_card_total', 'subtotal', 'total', 'refundable_amount'],
                relations: ['customer', 'billing_address', 'shipping_address', 'discounts', 'discounts.rule', 'shipping_methods', 'shipping_methods.shipping_option', 'payments', 'fulfillments', 'returns', 'gift_cards', 'gift_card_transactions']
              });
            case 3:
              order = _context6.sent;
              _context6.next = 6;
              return this.fulfillmentService_.retrieve(fulfillment_id, {
                relations: ['items', 'tracking_links']
              });
            case 6:
              shipment = _context6.sent;
              _context6.next = 9;
              return this.extractLocale(order);
            case 9:
              locale = _context6.sent;
              return _context6.abrupt("return", {
                locale: locale,
                order: order,
                date: shipment.shipped_at.toDateString(),
                email: order.email,
                fulfillment: shipment,
                tracking_links: shipment.tracking_links,
                tracking_number: shipment.tracking_numbers.join(', ')
              });
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function orderShipmentCreatedData(_x14, _x15) {
        return _orderShipmentCreatedData.apply(this, arguments);
      }
      return orderShipmentCreatedData;
    }()
  }, {
    key: "orderCanceledData",
    value: function () {
      var _orderCanceledData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref3) {
        var id, order, subtotal, tax_total, discount_total, shipping_total, gift_card_total, total, taxRate, currencyCode, items, discounts, giftCards, locale;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              id = _ref3.id;
              _context7.next = 3;
              return this.orderService_.retrieve(id, {
                select: ['shipping_total', 'discount_total', 'tax_total', 'refunded_total', 'gift_card_total', 'subtotal', 'total'],
                relations: ['customer', 'billing_address', 'shipping_address', 'discounts', 'discounts.rule', 'shipping_methods', 'shipping_methods.shipping_option', 'payments', 'fulfillments', 'returns', 'gift_cards', 'gift_card_transactions']
              });
            case 3:
              order = _context7.sent;
              subtotal = order.subtotal, tax_total = order.tax_total, discount_total = order.discount_total, shipping_total = order.shipping_total, gift_card_total = order.gift_card_total, total = order.total;
              taxRate = order.tax_rate / 100;
              currencyCode = order.currency_code.toUpperCase();
              items = this.processItems_(order.items, taxRate, currencyCode);
              discounts = [];
              if (order.discounts) {
                discounts = order.discounts.map(function (discount) {
                  return {
                    is_giftcard: false,
                    code: discount.code,
                    descriptor: "".concat(discount.rule.value).concat(discount.rule.type === 'percentage' ? '%' : " ".concat(currencyCode))
                  };
                });
              }
              giftCards = [];
              if (order.gift_cards) {
                giftCards = order.gift_cards.map(function (gc) {
                  return {
                    is_giftcard: true,
                    code: gc.code,
                    descriptor: "".concat(gc.value, " ").concat(currencyCode)
                  };
                });
                discounts.concat(giftCards);
              }
              _context7.next = 14;
              return this.extractLocale(order);
            case 14:
              locale = _context7.sent;
              return _context7.abrupt("return", _objectSpread(_objectSpread({}, order), {}, {
                locale: locale,
                has_discounts: order.discounts.length,
                has_gift_cards: order.gift_cards.length,
                date: order.created_at.toDateString(),
                items: items,
                discounts: discounts,
                subtotal: "".concat(this.humanPrice_(subtotal * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                gift_card_total: "".concat(this.humanPrice_(gift_card_total * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                tax_total: "".concat(this.humanPrice_(tax_total, currencyCode), " ").concat(currencyCode),
                discount_total: "".concat(this.humanPrice_(discount_total * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                shipping_total: "".concat(this.humanPrice_(shipping_total * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                total: "".concat(this.humanPrice_(total, currencyCode), " ").concat(currencyCode)
              }));
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function orderCanceledData(_x16) {
        return _orderCanceledData.apply(this, arguments);
      }
      return orderCanceledData;
    }()
  }, {
    key: "orderPlacedData",
    value: function () {
      var _orderPlacedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(_ref4) {
        var _this2 = this;
        var id, order, tax_total, shipping_total, gift_card_total, total, currencyCode, items, discounts, giftCards, locale, discountTotal, discounted_subtotal, subtotal, subtotal_ex_tax;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              id = _ref4.id;
              _context9.next = 3;
              return this.orderService_.retrieve(id, {
                select: ['shipping_total', 'discount_total', 'tax_total', 'refunded_total', 'gift_card_total', 'subtotal', 'total'],
                relations: ['customer', 'billing_address', 'shipping_address', 'discounts', 'discounts.rule', 'shipping_methods', 'shipping_methods.shipping_option', 'payments', 'fulfillments', 'returns', 'gift_cards', 'gift_card_transactions']
              });
            case 3:
              order = _context9.sent;
              tax_total = order.tax_total, shipping_total = order.shipping_total, gift_card_total = order.gift_card_total, total = order.total;
              currencyCode = order.currency_code.toUpperCase();
              _context9.next = 8;
              return Promise.all(order.items.map( /*#__PURE__*/function () {
                var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(i) {
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _this2.totalsService_.getLineItemTotals(i, order, {
                          include_tax: true,
                          use_tax_lines: true
                        });
                      case 2:
                        i.totals = _context8.sent;
                        i.thumbnail = _this2.normalizeThumbUrl_(i.thumbnail);
                        i.discounted_price = "".concat(_this2.humanPrice_(i.totals.total / i.quantity, currencyCode), " ").concat(currencyCode);
                        i.price = "".concat(_this2.humanPrice_(i.totals.original_total / i.quantity, currencyCode), " ").concat(currencyCode);
                        return _context8.abrupt("return", i);
                      case 7:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x18) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 8:
              items = _context9.sent;
              discounts = [];
              if (order.discounts) {
                discounts = order.discounts.map(function (discount) {
                  return {
                    is_giftcard: false,
                    code: discount.code,
                    descriptor: "".concat(discount.rule.value).concat(discount.rule.type === 'percentage' ? '%' : " ".concat(currencyCode))
                  };
                });
              }
              giftCards = [];
              if (order.gift_cards) {
                giftCards = order.gift_cards.map(function (gc) {
                  return {
                    is_giftcard: true,
                    code: gc.code,
                    descriptor: "".concat(gc.value, " ").concat(currencyCode)
                  };
                });
                discounts.concat(giftCards);
              }
              _context9.next = 15;
              return this.extractLocale(order);
            case 15:
              locale = _context9.sent;
              // Includes taxes in discount amount
              discountTotal = items.reduce(function (acc, i) {
                return acc + i.totals.original_total - i.totals.total;
              }, 0);
              discounted_subtotal = items.reduce(function (acc, i) {
                return acc + i.totals.total;
              }, 0);
              subtotal = items.reduce(function (acc, i) {
                return acc + i.totals.original_total;
              }, 0);
              subtotal_ex_tax = items.reduce(function (total, i) {
                return total + i.totals.subtotal;
              }, 0);
              return _context9.abrupt("return", _objectSpread(_objectSpread({}, order), {}, {
                locale: locale,
                has_discounts: order.discounts.length,
                has_gift_cards: order.gift_cards.length,
                date: order.created_at.toDateString(),
                items: items,
                discounts: discounts,
                subtotal_ex_tax: "".concat(this.humanPrice_(subtotal_ex_tax, currencyCode), " ").concat(currencyCode),
                subtotal: "".concat(this.humanPrice_(subtotal, currencyCode), " ").concat(currencyCode),
                gift_card_total: "".concat(this.humanPrice_(gift_card_total, currencyCode), " ").concat(currencyCode),
                tax_total: "".concat(this.humanPrice_(tax_total, currencyCode), " ").concat(currencyCode),
                discount_total: "".concat(this.humanPrice_(discountTotal, currencyCode), " ").concat(currencyCode),
                shipping_total: "".concat(this.humanPrice_(shipping_total, currencyCode), " ").concat(currencyCode),
                total: "".concat(this.humanPrice_(total, currencyCode), " ").concat(currencyCode)
              }));
            case 21:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function orderPlacedData(_x17) {
        return _orderPlacedData.apply(this, arguments);
      }
      return orderPlacedData;
    }()
  }, {
    key: "gcCreatedData",
    value: function () {
      var _gcCreatedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(_ref6) {
        var id, giftCard, taxRate, locale;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              id = _ref6.id;
              _context10.next = 3;
              return this.giftCardService_.retrieve(id, {
                relations: ['region', 'order']
              });
            case 3:
              giftCard = _context10.sent;
              if (giftCard.order) {
                _context10.next = 6;
                break;
              }
              return _context10.abrupt("return");
            case 6:
              taxRate = giftCard.region.tax_rate / 100;
              _context10.next = 9;
              return this.extractLocale(order);
            case 9:
              locale = _context10.sent;
              return _context10.abrupt("return", _objectSpread(_objectSpread({}, giftCard), {}, {
                locale: locale,
                email: giftCard.order.email,
                display_value: giftCard.value * (1 + taxRate)
              }));
            case 11:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function gcCreatedData(_x19) {
        return _gcCreatedData.apply(this, arguments);
      }
      return gcCreatedData;
    }()
  }, {
    key: "returnRequestedData",
    value: function () {
      var _returnRequestedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(_ref7) {
        var _this3 = this;
        var id, return_id, returnRequest, items, order, currencyCode, returnItems, item_subtotal, shippingTotal, base, locale;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              id = _ref7.id, return_id = _ref7.return_id;
              _context12.next = 3;
              return this.returnService_.retrieve(return_id, {
                relations: ['items', 'items.item', 'items.item.tax_lines', 'items.item.variant', 'items.item.variant.product', 'shipping_method', 'shipping_method.tax_lines', 'shipping_method.shipping_option']
              });
            case 3:
              returnRequest = _context12.sent;
              _context12.next = 6;
              return this.lineItemService_.list({
                id: returnRequest.items.map(function (_ref8) {
                  var item_id = _ref8.item_id;
                  return item_id;
                })
              }, {
                relations: ['tax_lines']
              });
            case 6:
              items = _context12.sent;
              _context12.next = 9;
              return this.orderService_.retrieve(id, {
                select: ['total'],
                relations: ['items', 'items.tax_lines', 'discounts', 'discounts.rule', 'shipping_address', 'returns']
              });
            case 9:
              order = _context12.sent;
              currencyCode = order.currency_code.toUpperCase(); // Calculate which items are in the return
              _context12.next = 13;
              return Promise.all(returnRequest.items.map( /*#__PURE__*/function () {
                var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(i) {
                  var found;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) switch (_context11.prev = _context11.next) {
                      case 0:
                        found = items.find(function (oi) {
                          return oi.id === i.item_id;
                        });
                        found.quantity = i.quantity;
                        found.thumbnail = _this3.normalizeThumbUrl_(found.thumbnail);
                        _context11.next = 5;
                        return _this3.totalsService_.getLineItemTotals(found, order, {
                          include_tax: true,
                          use_tax_lines: true
                        });
                      case 5:
                        found.totals = _context11.sent;
                        found.price = "".concat(_this3.humanPrice_(found.totals.total, currencyCode), " ").concat(currencyCode);
                        found.tax_lines = found.totals.tax_lines;
                        return _context11.abrupt("return", found);
                      case 9:
                      case "end":
                        return _context11.stop();
                    }
                  }, _callee11);
                }));
                return function (_x21) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 13:
              returnItems = _context12.sent;
              // Get total of the returned products
              item_subtotal = returnItems.reduce(function (acc, next) {
                return acc + next.totals.total;
              }, 0); // If the return has a shipping method get the price and any attachments
              shippingTotal = 0;
              if (returnRequest.shipping_method) {
                base = returnRequest.shipping_method.price;
                shippingTotal = base + returnRequest.shipping_method.tax_lines.reduce(function (acc, next) {
                  return Math.round(acc + base * (next.rate / 100));
                }, 0);
              }
              _context12.next = 19;
              return this.extractLocale(order);
            case 19:
              locale = _context12.sent;
              return _context12.abrupt("return", {
                locale: locale,
                has_shipping: !!returnRequest.shipping_method,
                email: order.email,
                items: returnItems,
                subtotal: "".concat(this.humanPrice_(item_subtotal, currencyCode), " ").concat(currencyCode),
                shipping_total: "".concat(this.humanPrice_(shippingTotal, currencyCode), " ").concat(currencyCode),
                refund_amount: "".concat(this.humanPrice_(returnRequest.refund_amount, currencyCode), " ").concat(currencyCode),
                return_request: _objectSpread(_objectSpread({}, returnRequest), {}, {
                  refund_amount: "".concat(this.humanPrice_(returnRequest.refund_amount, currencyCode), " ").concat(currencyCode)
                }),
                order: order,
                date: returnRequest.updated_at.toDateString()
              });
            case 21:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function returnRequestedData(_x20) {
        return _returnRequestedData.apply(this, arguments);
      }
      return returnRequestedData;
    }()
  }, {
    key: "swapReceivedData",
    value: function () {
      var _swapReceivedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(_ref10) {
        var _this4 = this;
        var id, store, swap, returnRequest, items, swapLink, order, cart, currencyCode, decoratedItems, returnTotal, additionalTotal, refundAmount, locale;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              id = _ref10.id;
              _context14.next = 3;
              return this.storeService_.retrieve();
            case 3:
              store = _context14.sent;
              _context14.next = 6;
              return this.swapService_.retrieve(id, {
                relations: ['additional_items', 'additional_items.tax_lines', 'return_order', 'return_order.items', 'return_order.items.item', 'return_order.shipping_method', 'return_order.shipping_method.shipping_option']
              });
            case 6:
              swap = _context14.sent;
              returnRequest = swap.return_order;
              _context14.next = 10;
              return this.lineItemService_.list({
                id: returnRequest.items.map(function (_ref11) {
                  var item_id = _ref11.item_id;
                  return item_id;
                })
              }, {
                relations: ['tax_lines']
              });
            case 10:
              items = _context14.sent;
              returnRequest.items = returnRequest.items.map(function (item) {
                var found = items.find(function (i) {
                  return i.id === item.item_id;
                });
                return _objectSpread(_objectSpread({}, item), {}, {
                  item: found
                });
              });
              swapLink = store.swap_link_template.replace(/\{cart_id\}/, swap.cart_id);
              _context14.next = 15;
              return this.orderService_.retrieve(swap.order_id, {
                select: ['total'],
                relations: ['items', 'discounts', 'discounts.rule', 'shipping_address', 'swaps', 'swaps.additional_items', 'swaps.additional_items.tax_lines']
              });
            case 15:
              order = _context14.sent;
              _context14.next = 18;
              return this.cartService_.retrieve(swap.cart_id, {
                select: ['total', 'tax_total', 'discount_total', 'shipping_total', 'subtotal']
              });
            case 18:
              cart = _context14.sent;
              currencyCode = order.currency_code.toUpperCase();
              _context14.next = 22;
              return Promise.all(cart.items.map( /*#__PURE__*/function () {
                var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(i) {
                  var totals;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
                        return _this4.totalsService_.getLineItemTotals(i, cart, {
                          include_tax: true
                        });
                      case 2:
                        totals = _context13.sent;
                        return _context13.abrupt("return", _objectSpread(_objectSpread({}, i), {}, {
                          totals: totals,
                          price: _this4.humanPrice_(totals.subtotal + totals.tax_total, currencyCode)
                        }));
                      case 4:
                      case "end":
                        return _context13.stop();
                    }
                  }, _callee13);
                }));
                return function (_x23) {
                  return _ref12.apply(this, arguments);
                };
              }()));
            case 22:
              decoratedItems = _context14.sent;
              returnTotal = decoratedItems.reduce(function (acc, next) {
                if (next.is_return) {
                  return acc + -1 * (next.totals.subtotal + next.totals.tax_total);
                }
                return acc;
              }, 0);
              additionalTotal = decoratedItems.reduce(function (acc, next) {
                if (!next.is_return) {
                  return acc + next.totals.subtotal + next.totals.tax_total;
                }
                return acc;
              }, 0);
              refundAmount = swap.return_order.refund_amount;
              _context14.next = 28;
              return this.extractLocale(order);
            case 28:
              locale = _context14.sent;
              return _context14.abrupt("return", {
                locale: locale,
                swap: swap,
                order: order,
                return_request: returnRequest,
                date: swap.updated_at.toDateString(),
                swap_link: swapLink,
                email: order.email,
                items: decoratedItems.filter(function (di) {
                  return !di.is_return;
                }),
                return_items: decoratedItems.filter(function (di) {
                  return di.is_return;
                }),
                return_total: "".concat(this.humanPrice_(returnTotal, currencyCode), " ").concat(currencyCode),
                tax_total: "".concat(this.humanPrice_(cart.total, currencyCode), " ").concat(currencyCode),
                refund_amount: "".concat(this.humanPrice_(refundAmount, currencyCode), " ").concat(currencyCode),
                additional_total: "".concat(this.humanPrice_(additionalTotal, currencyCode), " ").concat(currencyCode)
              });
            case 30:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function swapReceivedData(_x22) {
        return _swapReceivedData.apply(this, arguments);
      }
      return swapReceivedData;
    }()
  }, {
    key: "swapCreatedData",
    value: function () {
      var _swapCreatedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(_ref13) {
        var _this5 = this;
        var id, store, swap, returnRequest, items, swapLink, order, cart, currencyCode, decoratedItems, returnTotal, additionalTotal, refundAmount, locale;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              id = _ref13.id;
              _context16.next = 3;
              return this.storeService_.retrieve();
            case 3:
              store = _context16.sent;
              _context16.next = 6;
              return this.swapService_.retrieve(id, {
                relations: ['additional_items', 'additional_items.tax_lines', 'return_order', 'return_order.items', 'return_order.items.item', 'return_order.shipping_method', 'return_order.shipping_method.shipping_option']
              });
            case 6:
              swap = _context16.sent;
              returnRequest = swap.return_order;
              _context16.next = 10;
              return this.lineItemService_.list({
                id: returnRequest.items.map(function (_ref14) {
                  var item_id = _ref14.item_id;
                  return item_id;
                })
              }, {
                relations: ['tax_lines']
              });
            case 10:
              items = _context16.sent;
              returnRequest.items = returnRequest.items.map(function (item) {
                var found = items.find(function (i) {
                  return i.id === item.item_id;
                });
                return _objectSpread(_objectSpread({}, item), {}, {
                  item: found
                });
              });
              swapLink = store.swap_link_template.replace(/\{cart_id\}/, swap.cart_id);
              _context16.next = 15;
              return this.orderService_.retrieve(swap.order_id, {
                select: ['total'],
                relations: ['items', 'items.tax_lines', 'discounts', 'discounts.rule', 'shipping_address', 'swaps', 'swaps.additional_items', 'swaps.additional_items.tax_lines']
              });
            case 15:
              order = _context16.sent;
              _context16.next = 18;
              return this.cartService_.retrieve(swap.cart_id, {
                select: ['total', 'tax_total', 'discount_total', 'shipping_total', 'subtotal']
              });
            case 18:
              cart = _context16.sent;
              currencyCode = order.currency_code.toUpperCase();
              _context16.next = 22;
              return Promise.all(cart.items.map( /*#__PURE__*/function () {
                var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(i) {
                  var totals;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return _this5.totalsService_.getLineItemTotals(i, cart, {
                          include_tax: true
                        });
                      case 2:
                        totals = _context15.sent;
                        return _context15.abrupt("return", _objectSpread(_objectSpread({}, i), {}, {
                          totals: totals,
                          tax_lines: totals.tax_lines,
                          price: "".concat(_this5.humanPrice_(totals.original_total / i.quantity, currencyCode), " ").concat(currencyCode),
                          discounted_price: "".concat(_this5.humanPrice_(totals.total / i.quantity, currencyCode), " ").concat(currencyCode)
                        }));
                      case 4:
                      case "end":
                        return _context15.stop();
                    }
                  }, _callee15);
                }));
                return function (_x25) {
                  return _ref15.apply(this, arguments);
                };
              }()));
            case 22:
              decoratedItems = _context16.sent;
              returnTotal = decoratedItems.reduce(function (acc, next) {
                var total = next.totals.total;
                if (next.is_return && next.variant_id) {
                  return acc + -1 * total;
                }
                return acc;
              }, 0);
              additionalTotal = decoratedItems.reduce(function (acc, next) {
                var total = next.totals.total;
                if (!next.is_return) {
                  return acc + total;
                }
                return acc;
              }, 0);
              refundAmount = swap.return_order.refund_amount;
              _context16.next = 28;
              return this.extractLocale(order);
            case 28:
              locale = _context16.sent;
              return _context16.abrupt("return", {
                locale: locale,
                swap: swap,
                order: order,
                return_request: returnRequest,
                date: swap.updated_at.toDateString(),
                swap_link: swapLink,
                email: order.email,
                items: decoratedItems.filter(function (di) {
                  return !di.is_return;
                }),
                return_items: decoratedItems.filter(function (di) {
                  return di.is_return;
                }),
                return_total: "".concat(this.humanPrice_(returnTotal, currencyCode), " ").concat(currencyCode),
                refund_amount: "".concat(this.humanPrice_(refundAmount, currencyCode), " ").concat(currencyCode),
                additional_total: "".concat(this.humanPrice_(additionalTotal, currencyCode), " ").concat(currencyCode)
              });
            case 30:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function swapCreatedData(_x24) {
        return _swapCreatedData.apply(this, arguments);
      }
      return swapCreatedData;
    }()
  }, {
    key: "itemsReturnedData",
    value: function () {
      var _itemsReturnedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(data) {
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", this.returnRequestedData(data));
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function itemsReturnedData(_x26) {
        return _itemsReturnedData.apply(this, arguments);
      }
      return itemsReturnedData;
    }()
  }, {
    key: "swapShipmentCreatedData",
    value: function () {
      var _swapShipmentCreatedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(_ref16) {
        var _this6 = this;
        var id, fulfillment_id, swap, order, cart, returnRequest, items, taxRate, currencyCode, returnItems, returnTotal, constructedOrder, additionalTotal, refundAmount, shipment, locale;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              id = _ref16.id, fulfillment_id = _ref16.fulfillment_id;
              _context20.next = 3;
              return this.swapService_.retrieve(id, {
                relations: ['shipping_address', 'shipping_methods', 'shipping_methods.tax_lines', 'additional_items', 'additional_items.tax_lines', 'return_order', 'return_order.items']
              });
            case 3:
              swap = _context20.sent;
              _context20.next = 6;
              return this.orderService_.retrieve(swap.order_id, {
                relations: ['region', 'items', 'items.tax_lines', 'discounts', 'discounts.rule', 'swaps', 'swaps.additional_items', 'swaps.additional_items.tax_lines']
              });
            case 6:
              order = _context20.sent;
              _context20.next = 9;
              return this.cartService_.retrieve(swap.cart_id, {
                select: ['total', 'tax_total', 'discount_total', 'shipping_total', 'subtotal']
              });
            case 9:
              cart = _context20.sent;
              returnRequest = swap.return_order;
              _context20.next = 13;
              return this.lineItemService_.list({
                id: returnRequest.items.map(function (_ref17) {
                  var item_id = _ref17.item_id;
                  return item_id;
                })
              }, {
                relations: ['tax_lines']
              });
            case 13:
              items = _context20.sent;
              taxRate = order.tax_rate / 100;
              currencyCode = order.currency_code.toUpperCase();
              _context20.next = 18;
              return Promise.all(swap.return_order.items.map( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(i) {
                  var found, totals;
                  return _regenerator["default"].wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        found = items.find(function (oi) {
                          return oi.id === i.item_id;
                        });
                        _context18.next = 3;
                        return _this6.totalsService_.getLineItemTotals(i, cart, {
                          include_tax: true
                        });
                      case 3:
                        totals = _context18.sent;
                        return _context18.abrupt("return", _objectSpread(_objectSpread({}, found), {}, {
                          thumbnail: _this6.normalizeThumbUrl_(found.thumbnail),
                          price: "".concat(_this6.humanPrice_(totals.original_total / i.quantity, currencyCode), " ").concat(currencyCode),
                          discounted_price: "".concat(_this6.humanPrice_(totals.total / i.quantity, currencyCode), " ").concat(currencyCode),
                          quantity: i.quantity
                        }));
                      case 5:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                }));
                return function (_x28) {
                  return _ref18.apply(this, arguments);
                };
              }()));
            case 18:
              returnItems = _context20.sent;
              _context20.next = 21;
              return this.totalsService_.getRefundTotal(order, returnItems);
            case 21:
              returnTotal = _context20.sent;
              constructedOrder = _objectSpread(_objectSpread({}, order), {}, {
                shipping_methods: swap.shipping_methods,
                items: swap.additional_items
              });
              _context20.next = 25;
              return this.totalsService_.getTotal(constructedOrder);
            case 25:
              additionalTotal = _context20.sent;
              refundAmount = swap.return_order.refund_amount;
              _context20.next = 29;
              return this.fulfillmentService_.retrieve(fulfillment_id, {
                relations: ['tracking_links']
              });
            case 29:
              shipment = _context20.sent;
              _context20.next = 32;
              return this.extractLocale(order);
            case 32:
              locale = _context20.sent;
              _context20.t0 = locale;
              _context20.t1 = swap;
              _context20.t2 = order;
              _context20.next = 38;
              return Promise.all(swap.additional_items.map( /*#__PURE__*/function () {
                var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(i) {
                  var totals;
                  return _regenerator["default"].wrap(function _callee19$(_context19) {
                    while (1) switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
                        return _this6.totalsService_.getLineItemTotals(i, cart, {
                          include_tax: true
                        });
                      case 2:
                        totals = _context19.sent;
                        return _context19.abrupt("return", _objectSpread(_objectSpread({}, i), {}, {
                          thumbnail: _this6.normalizeThumbUrl_(i.thumbnail),
                          price: "".concat(_this6.humanPrice_(totals.original_total / i.quantity, currencyCode), " ").concat(currencyCode),
                          discounted_price: "".concat(_this6.humanPrice_(totals.total / i.quantity, currencyCode), " ").concat(currencyCode),
                          quantity: i.quantity
                        }));
                      case 4:
                      case "end":
                        return _context19.stop();
                    }
                  }, _callee19);
                }));
                return function (_x29) {
                  return _ref19.apply(this, arguments);
                };
              }()));
            case 38:
              _context20.t3 = _context20.sent;
              _context20.t4 = swap.updated_at.toDateString();
              _context20.t5 = order.email;
              _context20.t6 = "".concat(this.humanPrice_(cart.tax_total, currencyCode), " ").concat(currencyCode);
              _context20.t7 = "".concat(this.humanPrice_(swap.difference_due, currencyCode), " ").concat(currencyCode);
              _context20.t8 = "".concat(this.humanPrice_(returnTotal, currencyCode), " ").concat(currencyCode);
              _context20.t9 = "".concat(this.humanPrice_(refundAmount, currencyCode), " ").concat(currencyCode);
              _context20.t10 = "".concat(this.humanPrice_(additionalTotal, currencyCode), " ").concat(currencyCode);
              _context20.t11 = shipment;
              _context20.t12 = shipment.tracking_links;
              _context20.t13 = shipment.tracking_numbers.join(', ');
              return _context20.abrupt("return", {
                locale: _context20.t0,
                swap: _context20.t1,
                order: _context20.t2,
                items: _context20.t3,
                date: _context20.t4,
                email: _context20.t5,
                tax_amount: _context20.t6,
                paid_total: _context20.t7,
                return_total: _context20.t8,
                refund_amount: _context20.t9,
                additional_total: _context20.t10,
                fulfillment: _context20.t11,
                tracking_links: _context20.t12,
                tracking_number: _context20.t13
              });
            case 50:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function swapShipmentCreatedData(_x27) {
        return _swapShipmentCreatedData.apply(this, arguments);
      }
      return swapShipmentCreatedData;
    }()
  }, {
    key: "claimShipmentCreatedData",
    value: function () {
      var _claimShipmentCreatedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(_ref20) {
        var id, fulfillment_id, claim, shipment, locale;
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              id = _ref20.id, fulfillment_id = _ref20.fulfillment_id;
              _context21.next = 3;
              return this.claimService_.retrieve(id, {
                relations: ['order', 'order.items', 'order.shipping_address']
              });
            case 3:
              claim = _context21.sent;
              _context21.next = 6;
              return this.fulfillmentService_.retrieve(fulfillment_id, {
                relations: ['tracking_links']
              });
            case 6:
              shipment = _context21.sent;
              _context21.next = 9;
              return this.extractLocale(claim.order);
            case 9:
              locale = _context21.sent;
              return _context21.abrupt("return", {
                locale: locale,
                email: claim.order.email,
                claim: claim,
                order: claim.order,
                fulfillment: shipment,
                tracking_links: shipment.tracking_links,
                tracking_number: shipment.tracking_numbers.join(', ')
              });
            case 11:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function claimShipmentCreatedData(_x30) {
        return _claimShipmentCreatedData.apply(this, arguments);
      }
      return claimShipmentCreatedData;
    }()
  }, {
    key: "restockNotificationData",
    value: function () {
      var _restockNotificationData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(_ref21) {
        var variant_id, emails, variant, thumb;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              variant_id = _ref21.variant_id, emails = _ref21.emails;
              _context22.next = 3;
              return this.productVariantService_.retrieve(variant_id, {
                relations: ['product']
              });
            case 3:
              variant = _context22.sent;
              if (variant.product.thumbnail) {
                thumb = this.normalizeThumbUrl_(variant.product.thumbnail);
              }
              return _context22.abrupt("return", {
                product: _objectSpread(_objectSpread({}, variant.product), {}, {
                  thumbnail: thumb
                }),
                variant: variant,
                variant_id: variant_id,
                emails: emails
              });
            case 6:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function restockNotificationData(_x31) {
        return _restockNotificationData.apply(this, arguments);
      }
      return restockNotificationData;
    }()
  }, {
    key: "orderRefundCreatedData",
    value: function () {
      var _orderRefundCreatedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(_ref22) {
        var id, refund_id, order, refund;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              id = _ref22.id, refund_id = _ref22.refund_id;
              _context23.next = 3;
              return this.orderService_.retrieveWithTotals(id, {
                select: ['total'],
                relations: ['refunds', 'items']
              });
            case 3:
              order = _context23.sent;
              refund = order.refunds.find(function (refund) {
                return refund.id === refund_id;
              });
              return _context23.abrupt("return", {
                order: order,
                refund: refund,
                refund_amount: "".concat(this.humanPrice_(refund.amount, order.currency_code), " ").concat(order.currency_code),
                email: order.email
              });
            case 6:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function orderRefundCreatedData(_x32) {
        return _orderRefundCreatedData.apply(this, arguments);
      }
      return orderRefundCreatedData;
    }()
  }, {
    key: "processItems_",
    value: function processItems_(items, taxRate, currencyCode) {
      var _this7 = this;
      return items.map(function (i) {
        return _objectSpread(_objectSpread({}, i), {}, {
          thumbnail: _this7.normalizeThumbUrl_(i.thumbnail),
          price: "".concat(_this7.humanPrice_(i.unit_price * (1 + taxRate), currencyCode), " ").concat(currencyCode)
        });
      });
    }
  }, {
    key: "humanPrice_",
    value: function humanPrice_(amount, currency) {
      if (!amount) {
        return '0.00';
      }
      var normalized = (0, _medusaCoreUtils.humanizeAmount)(amount, currency);
      return normalized.toFixed(_medusaCoreUtils.zeroDecimalCurrencies.includes(currency.toLowerCase()) ? 0 : 2);
    }
  }, {
    key: "normalizeThumbUrl_",
    value: function normalizeThumbUrl_(url) {
      if (!url) {
        return null;
      }
      if (url.startsWith('http')) {
        return url;
      } else if (url.startsWith('//')) {
        return "https:".concat(url);
      }
      return url;
    }
  }, {
    key: "extractLocale",
    value: function () {
      var _extractLocale = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(fromOrder) {
        var cart;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              if (!fromOrder.cart_id) {
                _context24.next = 13;
                break;
              }
              _context24.prev = 1;
              _context24.next = 4;
              return this.cartService_.retrieve(fromOrder.cart_id, {
                select: ['id', 'context']
              });
            case 4:
              cart = _context24.sent;
              if (!(cart.context && cart.context.locale)) {
                _context24.next = 7;
                break;
              }
              return _context24.abrupt("return", cart.context.locale);
            case 7:
              _context24.next = 13;
              break;
            case 9:
              _context24.prev = 9;
              _context24.t0 = _context24["catch"](1);
              console.warn('Failed to gather context for order');
              return _context24.abrupt("return", null);
            case 13:
              return _context24.abrupt("return", null);
            case 14:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this, [[1, 9]]);
      }));
      function extractLocale(_x33) {
        return _extractLocale.apply(this, arguments);
      }
      return extractLocale;
    }()
  }]);
  return MailJetService;
}(_medusaInterfaces.NotificationService);
(0, _defineProperty2["default"])(MailJetService, "identifier", 'mailjet');
var _default = MailJetService;
exports["default"] = _default;