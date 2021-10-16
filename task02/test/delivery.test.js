import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Delivery } from "../delivery.js";
import { Manufacturer } from "../manufacturer.js";
import { Consumer } from "../consumer.js";

install();
should();

describe("Delivery", () => {
  describe("transport()", () => {
    check.it(
      "after the transportation of goods from the manufacturer to the " +
        "consumer, the quantity of goods remains unchanged",
      gen.undefined,
      () => {
        const manufacturer = new Manufacturer();
        const generatedGoodsCount = manufacturer.getGeneratedGoodsCount();

        const consumer = new Consumer();
        const neededGoodsCount = consumer.getNeededGoodsCount();

        const delivery = new Delivery();

        const deliveryGoodsCount = delivery.transport(manufacturer, consumer);
        const manufacturerGoodsCountAfterTransport =
          manufacturer.getGoodsCount();
        const consumerGoodsCountAfterTransport = consumer.getGoodsCount();

        deliveryGoodsCount.should.to.be
          .a("number")
          .that.to.be.greaterThan(0)
          .that.to.be.lessThanOrEqual(100)
          .that.equal(
            generatedGoodsCount - manufacturerGoodsCountAfterTransport
          )
          .that.equal(consumerGoodsCountAfterTransport - neededGoodsCount);
      }
    );
  });

  describe("getEfficiency()", () => {
    it("when creating an object, efficiency is a number equal to zero", () => {
      const delivery = new Delivery();
      delivery.getEfficiency().should.to.be.a("number").that.to.be.equal(0);
    });

    check.it(
      "after transport, efficiency is a number and it is correct",
      gen.undefined,
      () => {
        const delivery = new Delivery();

        const manufacturer = new Manufacturer();
        manufacturer.getGeneratedGoodsCount();

        const consumer = new Consumer();
        consumer.getNeededGoodsCount();

        const deliveryGoodsCount = delivery.transport(manufacturer, consumer);

        delivery
          .getEfficiency()
          .should.to.be.a("number")
          .that.to.be.greaterThan(0)
          .that.to.be.lessThanOrEqual(100)
          .that.to.be.equal(deliveryGoodsCount);
      }
    );
  });
});
