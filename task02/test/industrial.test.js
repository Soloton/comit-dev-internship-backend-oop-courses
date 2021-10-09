import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Industrial } from "../industrial.js";

install();
should();

describe("Industrial", () => {
  it("must return an object with a zero goods count", () => {
    const industrial = new Industrial();
    industrial.getGoodsCount().should.to.equal(0);
  });

  check.it(
    "must return an object with a random but valid non-negative number",
    gen.posInt,
    (goodsCount) => {
      const positiveGoodsCount = goodsCount;
      const industrial = new Industrial();
      industrial.setGoodsCount(positiveGoodsCount);
      industrial.getGoodsCount().should.to.equal(positiveGoodsCount);
    }
  );

  check.it(
    "should return an exception when set goods count with a random negative number",
    gen.negInt,
    (goodsCount) => {
      const industrial = new Industrial();
      (() => {
        industrial.setGoodsCount(goodsCount - 1);
      }).should.to.throw("impossible to pick up");
    }
  );

  describe("increase and decrease non-negative number", () => {
    check.it(
      "an increase in the goods count by a non-negative amount correctly changes it",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const industrial = new Industrial();
        industrial.setGoodsCount(goodsCount);
        industrial.increaseGoodsCount(goodsCountDelta);
        industrial
          .getGoodsCount()
          .should.to.equal(goodsCount + goodsCountDelta);
      }
    );

    check.it(
      "a decrease in the goods count by a non-negative amount," +
        " which is less than the goods count, correctly changes it",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const industrial = new Industrial();
        industrial.setGoodsCount(goodsCount + goodsCountDelta);
        industrial.decreaseGoodsCount(goodsCountDelta);
        industrial.getGoodsCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "a decrease in the goods count by a non-negative amount " +
        "that is greater than the goods count leads to the exclusion",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const industrial = new Industrial();
        industrial.setGoodsCount(goodsCount);
        (() => {
          industrial.decreaseGoodsCount(goodsCount + goodsCountDelta + 1);
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
        const industrial = new Industrial();
        industrial.setGoodsCount(goodsCount - goodsCountDelta);
        industrial.increaseGoodsCount(goodsCountDelta);
        industrial.getGoodsCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "an decrease in the goods count by a negative amount correctly changes it",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const industrial = new Industrial();
        industrial.setGoodsCount(goodsCount);
        industrial.decreaseGoodsCount(goodsCountDelta);
        industrial
          .getGoodsCount()
          .should.to.equal(goodsCount - goodsCountDelta);
      }
    );

    check.it(
      "an attempt to reduce the goods count by an amount known to" +
        " be greater than there are industrial leads to the exclusion",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const industrial = new Industrial();
        industrial.setGoodsCount(goodsCount);
        (() => {
          industrial.increaseGoodsCount(goodsCountDelta - goodsCount - 1);
        }).should.to.throw("impossible to pick up");
      }
    );
  });

  describe("generate goods count", () => {
    check.it(
      "return value within the specified limits",
      gen.posInt,
      gen.posInt,
      (minimum, delta) => {
        const industrial = new Industrial();
        const maximum = minimum + delta;
        industrial.setLimits(minimum, maximum);
        industrial._generateGoodsCount();
        industrial.getGoodsCount().should.to.within(minimum, maximum);
      }
    );
  });
});
