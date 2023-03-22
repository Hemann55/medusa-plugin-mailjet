class UserSubscriber {
  constructor({ mailjetService, eventBusService }) {
    this.mailjetService_ = mailjetService

    this.eventBus_ = eventBusService

    this.eventBus_.subscribe('user.password_reset', async (data) => {
      await this.mailjetService_.sendNotification(
        'user.password_reset',
        data,
        null
      )
    })
  }
}

export default UserSubscriber
