import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { AbstractBase } from "../abstractBase.js";

install();
should();

describe("AbstractBase", () => {
  check.it("should return an exception when created", gen.string, (text) => {
    (() => {
      new AbstractBase(text);
    }).should.to.throw(TypeError);
  });
});
