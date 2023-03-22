# medusa-plugin-mailjet

Mailjet Plugin for Medusa to send transactional emails.

This plugin is based on Medusa's official [Sendgrid plugin](https://docs.medusajs.com/add-plugins/sendgrid) with Mailjet specific modifications.

## Options

If no values are defined for a given option, the plugin will not try to send an email for that event.

```js
{
      public_key: process.env.MAILJET_PUBLIC_KEY, //required
      private_key: process.env.MAILJET_PRIVATE_KEY, //required
      from: 'Medusa hello@medusa.example', //Name[space]email
      template_error_reporting: 'Medusa hello@medusa.example', //to use mailjet's template error reporting
      customer_created_template: '[used on customer.created]',
      gift_card_created_template: '[used on gift_card.created]',
      order_placed_template: '[used on order.placed]',
      order_canceled_template: '[used on order.canceled]',
      order_shipped_template: '[used on order.shipment_created]',
      order_completed_template: '[used on order.completed]',
      user_password_reset_template: '[used on user.password_reset]',
      customer_password_reset_template: '[used on customer.password_reset]',
      localization: {
        'de-DE': {
          // locale key
          customer_created_template: '[used on customer.created]'
          gift_card_created_template: '[used on gift_card.created]',
          order_placed_template: '[used on order.placed]',
          order_canceled_template: '[used on order.canceled]',
          order_shipped_template: '[used on order.shipment_created]',
          order_completed_template: '[used on order.completed]',
          user_password_reset_template: '[used on user.password_reset]',
          customer_password_reset_template: '[used on customer.password_reset]',
        },
      },
    },
```

## Dynamic usage

You can resolve the Mailjet service to dynamically send emails via mailjet.

Example:

```js
const mailjetService = scope.resolve('mailjetService')
mailjetService.sendEmail(
  'd-123....',
  'ACME <acme@mail.com>',
  'customer@mail.com',
  { dynamic: 'data' }
)
```
