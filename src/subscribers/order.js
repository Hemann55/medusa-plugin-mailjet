class OrderSubscriber {
  constructor({ notificationService }) {
    this.notificationService_ = notificationService

    this.notificationService_.subscribe('order.shipment_created', 'mailjet')
    this.notificationService_.subscribe('order.gift_card_created', 'mailjet')
    this.notificationService_.subscribe('gift_card.created', 'mailjet')
    //this.notificationService_.subscribe('order.placed', 'mailjet')
    this.notificationService_.subscribe('order.canceled', 'mailjet')
    //this.notificationService_.subscribe('customer.password_reset', 'mailjet')
    this.notificationService_.subscribe('claim.shipment_created', 'mailjet')
    this.notificationService_.subscribe('swap.shipment_created', 'mailjet')
    this.notificationService_.subscribe('swap.created', 'mailjet')
    this.notificationService_.subscribe('order.items_returned', 'mailjet')
    this.notificationService_.subscribe('order.return_requested', 'mailjet')
    this.notificationService_.subscribe('order.refund_created', 'mailjet')
  }
}

export default OrderSubscriber
