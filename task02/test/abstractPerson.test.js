import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { AbstractPerson } from "../abstractPerson.js";

install();
should();

describe("AbstractPerson", () => {
  check.it("should return an exception when created", gen.string, (text) => {
    (() => {
      new AbstractPerson(text);
    }).should.to.throw(TypeError);
  });
});
