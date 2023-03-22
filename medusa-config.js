const dotenv = require('dotenv')

let ENV_FILE_NAME = ''
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production'
    break
  case 'staging':
    ENV_FILE_NAME = '.env.staging'
    break
  case 'test':
    ENV_FILE_NAME = '.env.test'
    break
  case 'development':
  default:
    ENV_FILE_NAME = '.env'
    break
}

try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME })
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || 'http://localhost:7000,http://localhost:7001'

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:8000'

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://localhost/medusa-store'

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ''
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  {
    resolve: `medusa-plugin-mailjet`,
    options: {
      public_key: process.env.MAILJET_PUBLIC_KEY, //required
      private_key: process.env.MAILJET_PRIVATE_KEY, //required
      from: 'BOM.bike notify@bom.bike', //required
      template_error_reporting: 'Himanshu himanshuwalimbe@gmail.com',
      customer_created_template: 4612040,
      gift_card_created_template: '[used on gift_card.created]',
      order_placed_template: '[used on order.placed]',
      order_canceled_template: '[used on order.canceled]',
      order_shipped_template: '[used on order.shipment_created]',
      order_completed_template: '[used on order.completed]',
      user_password_reset_template: '[used on user.password_reset]',
      customer_password_reset_template: 4613254,
      localization: {
        'de-DE': {
          // locale key
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
  },
]

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig: {
    // redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
    // database_url: DATABASE_URL,
    // database_type: "postgres",
    database_database: './medusa-db.sql',
    database_type: 'sqlite',
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
}
