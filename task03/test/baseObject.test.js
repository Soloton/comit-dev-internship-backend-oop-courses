import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Project } from "../project.js";
import { Developer } from "../developer.js";

install();

describe("BaseObject", () => {
  function isClass(count, Class) {
    Class.autoIncrement = count;

    const generate = Class.generate(count);
    expect(generate)
      .to.be.an("array")
      .to.be.lengthOf(count)
      .and.to.satisfy((element) =>
        element.every((x) => {
          return x instanceof Class;
        })
      );
  }

  function isUnique(count, Class) {
    Class.autoIncrement = count;

    const generate = Class.generate(count);

    const set = new Set(
      generate.map((element) => {
        return element.id;
      })
    );

    expect(set).to.be.lengthOf(count);
  }

  // noinspection JSUnresolvedVariable
  check.it(
    "the generator returns arrays of unique objects",
    gen.sPosInt,
    gen.boolean.then((boolRandom) => {
      if (boolRandom) {
        return Project;
      }
      return Developer;
    }),
    (count, Class) => {
      isUnique(count, Class);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "the generator returns arrays of objects of the required class",
    gen.sPosInt,
    gen.boolean.then((boolRandom) => {
      if (boolRandom) {
        return Project;
      }
      return Developer;
    }),
    (count, Class) => {
      isClass(count, Class);
    }
  );
});
