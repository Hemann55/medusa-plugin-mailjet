class CustomerSubscriber {
  constructor({ mailjetService, eventBusService }) {
    eventBusService.subscribe('customer.created', async (data) => {
      await mailjetService.sendNotification('customer.created', data, null)
    })

    eventBusService.subscribe('customer.password_reset', async (data) => {
      await mailjetService.sendNotification(
        'customer.password_reset',
        data,
        null
      )
    })
  }
}

export default CustomerSubscriber
