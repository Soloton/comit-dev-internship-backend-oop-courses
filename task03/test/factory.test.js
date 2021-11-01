import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Factory } from "../factory.js";
import { sharedAutoincrementType } from "../shared.js";
import { Developer } from "../developer.js";
import { Project } from "../project.js";

install();

describe("Factory", () => {
  check.it("factory is one", () => {
    let first = new Factory();
    let second = new Factory();
    let third = new Factory();

    expect(first)
      .to.be.an.instanceof(Factory)
      .that.to.be.equal(second)
      .that.to.be.equal(third);
  });

  check.it(
    "invalid type",
    gen.string.then((string) => {
      // noinspection JSCheckFunctionSignatures
      return Symbol(string);
    }),
    (symbol) => {
      let factory = new Factory();

      expect(() => {
        factory.createOne(symbol);
      }).to.throw(TypeError);
    }
  );

  check.it("valid developer", () => {
    let factory = new Factory();

    const developer = factory.createOne(sharedAutoincrementType.developer);

    expect(developer).to.be.an.instanceof(Developer);
  });

  check.it("valid project", () => {
    let factory = new Factory();

    const project = factory.createOne(sharedAutoincrementType.project);

    expect(project).to.be.an.instanceof(Project);
  });

  // noinspection JSUnresolvedVariable
  check.it(
    "the factory's creator returns arrays of unique projects",
    gen.sPosInt,
    (count) => {
      let factory = new Factory();

      const generate = factory.createMany(
        count,
        sharedAutoincrementType.project
      );

      expect(
        new Set(
          generate.map((project) => {
            return project.id;
          })
        )
      ).to.be.lengthOf(count);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "the factory's creator returns arrays of unique developers",
    gen.sPosInt,
    (count) => {
      let factory = new Factory();

      const generate = factory.createMany(
        count,
        sharedAutoincrementType.developer
      );

      expect(
        new Set(
          generate.map((developer) => {
            return developer.id;
          })
        )
      ).to.be.lengthOf(count);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it("autoincrement generate unique id", gen.sPosInt, (count) => {
    let factory = new Factory();

    const generate = [];
    for (let i = 0; i < count; i++) {
      generate.push(factory.getAutoIncrement("s"));
    }

    expect(new Set(generate)).to.be.lengthOf(count);
  });
});
