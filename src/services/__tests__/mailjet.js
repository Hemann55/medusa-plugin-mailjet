import MailJetService from "../mailjet";

let options = {
  private_key: 'private_key',
  public_key: 'public_key',
}

describe("MailJetService", () => {
  describe("sendMail", () => {
    it("should create a new instance of MailJetService", () => {
      const service = new MailJetService({}, options);
      expect(service).toBeInstanceOf(MailJetService);
    });

    it("should throw if no options are passed", () => {
      expect(() => new MailJetService({})).toThrow();
    });

    it('sends an email on customer.created when has_account=true', async () => {
      // add template id
      options.customer_created_template = 1234
      const service = new MailJetService({}, options);
      // mock sendEmail method
      service.sendEmail = jest.fn();
      await service.sendNotification('customer.created', {
        customer: {
          email: 'test@test.com'
        },
        has_account: true,
      });

      expect(service.sendEmail).toHaveBeenCalledTimes(1);
    })

    it('does not send an email on customer.created when has_account=false', async () => {
      // add template id
      options.customer_created_template = 1234
      const service = new MailJetService({}, options);
      // mock sendEmail method
      service.sendEmail = jest.fn();
      await service.sendNotification('customer.created', {
        customer: {
          email: 'test@test.com'
        },
        has_account: false,
      });

      expect(service.sendEmail).not.toHaveBeenCalled();
    })
  });
});