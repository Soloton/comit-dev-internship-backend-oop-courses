import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Consumer } from "../consumer.js";

install();
should();

describe("Consumer", () => {
  it("must return an object with a zero goods count", () => {
    const consumer = new Consumer();
    consumer.getGoodsCount().should.to.equal(0);
  });

  check.it(
    "must return an object with a random but valid non-negative number",
    gen.posInt,
    (goodsCount) => {
      const positiveGoodsCount = goodsCount;
      const consumer = new Consumer();
      consumer.setGoodsCount(positiveGoodsCount);
      consumer.getGoodsCount().should.to.equal(positiveGoodsCount);
    }
  );

  check.it(
    "should return an exception when set goods count with a random negative number",
    gen.negInt,
    (goodsCount) => {
      const consumer = new Consumer();
      (() => {
        consumer.setGoodsCount(goodsCount - 1);
      }).should.to.throw("impossible to pick up");
    }
  );

  describe("increase and decrease non-negative number", () => {
    check.it(
      "an increase in the goods count by a non-negative amount correctly changes it",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const consumer = new Consumer();
        consumer.setGoodsCount(goodsCount);
        consumer.increaseGoodsCount(goodsCountDelta);
        consumer.getGoodsCount().should.to.equal(goodsCount + goodsCountDelta);
      }
    );

    check.it(
      "a decrease in the goods count by a non-negative amount," +
        " which is less than the goods count, correctly changes it",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const consumer = new Consumer();
        consumer.setGoodsCount(goodsCount + goodsCountDelta);
        consumer.decreaseGoodsCount(goodsCountDelta);
        consumer.getGoodsCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "a decrease in the goods count by a non-negative amount " +
        "that is greater than the goods count leads to the exclusion",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const consumer = new Consumer();
        consumer.setGoodsCount(goodsCount);
        (() => {
          consumer.decreaseGoodsCount(goodsCount + goodsCountDelta + 1);
        }).should.to.throw("impossible to pick up");
      }
    );
  });

  describe("increase and decrease negative number", () => {
    check.it(
      "an increase in the goods count by a negative amount correctly changes it",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const consumer = new Consumer();
        consumer.setGoodsCount(goodsCount - goodsCountDelta);
        consumer.increaseGoodsCount(goodsCountDelta);
        consumer.getGoodsCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "an decrease in the goods count by a negative amount correctly changes it",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const consumer = new Consumer();
        consumer.setGoodsCount(goodsCount);
        consumer.decreaseGoodsCount(goodsCountDelta);
        consumer.getGoodsCount().should.to.equal(goodsCount - goodsCountDelta);
      }
    );

    check.it(
      "an attempt to reduce the goods count by an amount known to" +
        " be greater than there are consumer leads to the exclusion",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const consumer = new Consumer();
        consumer.setGoodsCount(goodsCount);
        (() => {
          consumer.increaseGoodsCount(goodsCountDelta - goodsCount - 1);
        }).should.to.throw("impossible to pick up");
      }
    );
  });

  describe("getNeededGoodsCount", () => {
    it("return value within the specified limits", () => {
      const consumer = new Consumer();
      consumer.getNeededGoodsCount();
      consumer.getGoodsCount().should.to.within(70, 120);
    });
  });
});
