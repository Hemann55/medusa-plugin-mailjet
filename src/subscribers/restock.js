class RestockNotification {
  constructor({ eventBusService, mailjetService }) {
    eventBusService.subscribe(
      'restock-notification.restocked',
      async (eventData) => {
        const templateId = await mailjetService.getTemplateId(
          'restock-notification.restocked'
        )

        if (!templateId) {
          return
        }

        const data = await mailjetService.fetchData(
          'restock-notification.restocked',
          eventData,
          null
        )

        if (!data.emails) {
          return
        }

        return await Promise.all(
          data.emails.map(async (e) => {
            const sendOptions = {
              template_id: templateId,
              from: mailjetService.options_.from,
              to: e,
              dynamic_template_data: data,
            }

            return await mailjetService.sendEmail(sendOptions)
          })
        )
      }
    )
  }
}

export default RestockNotification
