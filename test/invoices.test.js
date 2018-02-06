const chai = require("chai");
chai.use(require("chai-http"));
const app = require("../app");

const expect = chai.expect;

saveInvoice = () => chai.request(app).post("/invoices");

describe("saving of invoice", () => {
  it("Returns the invoice with id after saving", () => {
    return saveInvoice().then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.id).to.be.greaterThan(0);
    });
  });
  it("Returns unique id every save", () => {
    let firstInvoiceId;
    return saveInvoice()
      .then(res => {
        firstInvoiceId = res.body.id;
        return saveInvoice();
      })
      .then(res => {
        expect(res.body.id).to.not.equal(firstInvoiceId);
      });
  });
  xit("return the invoice by id", () => {
    let firstInvoiceId;
    return saveInvoice()
      .then(res => {
        firstInvoiceId = res.body.id;
        return chai.request(app).get("/invoices/" + firstInvoiceId);
      })
      .then(res => {
        expect(res.body.id).to.equal(firstInvoiceId);
      });
  });
});
