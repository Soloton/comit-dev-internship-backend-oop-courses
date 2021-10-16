import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Answer } from "../answer.js";

install();
should();

describe("Answer", () => {
  check.it(
    "should return an object with a random but valid title property",
    gen.string,
    (text) => {
      const answer = new Answer(text);
      answer.title.should.to.equal(text);
    }
  );

  check.it(
    "should return an object with a random but valid isWrite property",
    gen.null,
    gen.boolean,
    (_, isWrite) => {
      const answer = new Answer(_, isWrite);
      answer.isWrite.should.to.equal(isWrite);
    }
  );

  check.it(
    "should return an object with a random but valid properties",
    gen.string,
    gen.boolean,
    (text, isWrite) => {
      const answer = new Answer(text, isWrite);
      answer.title.should.to.equal(text);
      answer.isWrite.should.to.equal(isWrite);
    }
  );
});
