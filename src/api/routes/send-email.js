export default async (req, res) => {
    const mailjetService = req.scope.resolve("mailjetService")
    await mailjetService.sendEmail(
      req.body.template_id,
      req.body.from,
      req.body.to,
      req.body.data || {}
    )
    res.sendStatus(200)
  }