import {should} from "chai";
import {check, gen, install} from "mocha-testcheck";
import {Base} from "../base.js";

install();
should();

describe("Base", () => {
  check.it("should return an exception when created", gen.string, (text) => {
    (() => {
      new Base(text);
    }).should.to.throw();
  });
});
