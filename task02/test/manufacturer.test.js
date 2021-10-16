import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Manufacturer } from "../manufacturer.js";

install();
should();

describe("Manufacturer", () => {
  it("must return an object with a zero goods count", () => {
    const manufacturer = new Manufacturer();
    manufacturer.getGoodsCount().should.to.equal(0);
  });

  check.it(
    "must return an object with a random but valid non-negative number",
    gen.posInt,
    (goodsCount) => {
      const positiveGoodsCount = goodsCount;
      const manufacturer = new Manufacturer();
      manufacturer.setGoodsCount(positiveGoodsCount);
      manufacturer.getGoodsCount().should.to.equal(positiveGoodsCount);
    }
  );

  check.it(
    "should return an exception when set goods count with a random negative number",
    gen.negInt,
    (goodsCount) => {
      const manufacturer = new Manufacturer();
      (() => {
        manufacturer.setGoodsCount(goodsCount - 1);
      }).should.to.throw("impossible to pick up");
    }
  );

  describe("increase and decrease non-negative number", () => {
    check.it(
      "an increase in the goods count by a non-negative amount correctly changes it",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const manufacturer = new Manufacturer();
        manufacturer.setGoodsCount(goodsCount);
        manufacturer.increaseGoodsCount(goodsCountDelta);
        manufacturer
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
        const manufacturer = new Manufacturer();
        manufacturer.setGoodsCount(goodsCount + goodsCountDelta);
        manufacturer.decreaseGoodsCount(goodsCountDelta);
        manufacturer.getGoodsCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "a decrease in the goods count by a non-negative amount " +
        "that is greater than the goods count leads to the exclusion",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const manufacturer = new Manufacturer();
        manufacturer.setGoodsCount(goodsCount);
        (() => {
          manufacturer.decreaseGoodsCount(goodsCount + goodsCountDelta + 1);
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
        const manufacturer = new Manufacturer();
        manufacturer.setGoodsCount(goodsCount - goodsCountDelta);
        manufacturer.increaseGoodsCount(goodsCountDelta);
        manufacturer.getGoodsCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "an decrease in the goods count by a negative amount correctly changes it",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const manufacturer = new Manufacturer();
        manufacturer.setGoodsCount(goodsCount);
        manufacturer.decreaseGoodsCount(goodsCountDelta);
        manufacturer
          .getGoodsCount()
          .should.to.equal(goodsCount - goodsCountDelta);
      }
    );

    check.it(
      "an attempt to reduce the goods count by an amount known to" +
        " be greater than there are manufacturer leads to the exclusion",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const manufacturer = new Manufacturer();
        manufacturer.setGoodsCount(goodsCount);
        (() => {
          manufacturer.increaseGoodsCount(goodsCountDelta - goodsCount - 1);
        }).should.to.throw("impossible to pick up");
      }
    );
  });

  describe("getGeneratedGoodsCount", () => {
    it("return value within the specified limits", () => {
      const manufacturer = new Manufacturer();
      manufacturer.getGeneratedGoodsCount();
      manufacturer.getGoodsCount().should.to.within(50, 150);
    });
  });
});
