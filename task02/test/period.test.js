import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Period } from "../period.js";

install();
should();

describe("Period", () => {
  check.it(
    "getSum should return sum of last N values each loop cycle",
    gen.posInt.then((i) => [i + Math.floor(Math.random() * 100) + 1, i + 1]),
    ([arrayLength, n]) => {
      const period = new Period(n);

      let array = [];
      let lastSum;
      for (let i = 0; i < arrayLength; i++) {
        const value = Math.floor(Math.random() * 100);
        array.push(value);

        let expected = 0;
        const number = Math.min(i + 1, n);
        for (let j = 0; j < number; j++) {
          expected += array[array.length - j - 1];
        }

        lastSum = period.getSum(value);
        lastSum.should.to.be.equal(expected);
      }
    }
  );
});
