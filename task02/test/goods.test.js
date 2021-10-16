import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Goods } from "../goods.js";

install();
should();

describe("Goods", () => {
  check.it(
    "must return an object with a random but valid non-negative number",
    gen.posInt,
    (goodsCount) => {
      const positiveGoodsCount = goodsCount;
      const goods = new Goods(positiveGoodsCount);
      goods.getCount().should.to.equal(positiveGoodsCount);
    }
  );

  check.it(
    "should return an exception when created with a random but valid negative number",
    gen.negInt,
    (goodsCount) => {
      (() => {
        new Goods(goodsCount - 1);
      }).should.to.throw("impossible to pick up");
    }
  );

  describe("increase and decrease non-negative number", () => {
    check.it(
      "an increase in the goods count by a non-negative amount correctly changes it",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const goods = new Goods(goodsCount);
        goods.increaseCount(goodsCountDelta);
        goods.getCount().should.to.equal(goodsCount + goodsCountDelta);
      }
    );

    check.it(
      "a decrease in the goods count by a non-negative amount," +
        " which is less than the goods count, correctly changes it",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const goods = new Goods(goodsCount + goodsCountDelta);
        goods.decreaseCount(goodsCountDelta);
        goods.getCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "a decrease in the goods count by a non-negative amount " +
        "that is greater than the goods count leads to the exclusion",
      gen.posInt,
      gen.posInt,
      (goodsCount, goodsCountDelta) => {
        const goods = new Goods(goodsCount);
        (() => {
          goods.decreaseCount(goodsCount + goodsCountDelta + 1);
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
        const goods = new Goods(goodsCount - goodsCountDelta);
        goods.increaseCount(goodsCountDelta);
        goods.getCount().should.to.equal(goodsCount);
      }
    );

    check.it(
      "an decrease in the goods count by a negative amount correctly changes it",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const goods = new Goods(goodsCount);
        goods.decreaseCount(goodsCountDelta);
        goods.getCount().should.to.equal(goodsCount - goodsCountDelta);
      }
    );

    check.it(
      "an attempt to reduce the goods count by an amount known to" +
        " be greater than there are goods leads to the exclusion",
      gen.posInt,
      gen.negInt,
      (goodsCount, goodsCountDelta) => {
        const goods = new Goods(goodsCount);
        (() => {
          goods.increaseCount(goodsCountDelta - goodsCount - 1);
        }).should.to.throw("impossible to pick up");
      }
    );
  });
});
