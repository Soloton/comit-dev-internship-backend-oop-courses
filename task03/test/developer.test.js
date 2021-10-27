import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Developer } from "../developer.js";

install();

describe("Developer", () => {
  // noinspection JSUnresolvedVariable
  check.it(
    "default values affect the developer",
    gen.asciiString,
    gen.sPosInt,
    gen.sPosInt,
    gen.sPosInt,
    (title, id, projectsCount, daysWithoutWork) => {
      const developer = new Developer({
        id: id,
        title: title,
        projectsCount: projectsCount,
        daysWithoutWorkCount: daysWithoutWork,
      });

      expect(developer.title.toUpperCase())
        .to.be.a("string")
        .that.to.be.contain(title.toUpperCase());

      expect(developer.id).to.be.a("number").that.to.be.equal(id);

      expect(developer.projectsCount)
        .to.be.a("number")
        .and.to.be.equal(projectsCount);

      expect(developer.daysWithoutWork)
        .to.be.a("number")
        .and.to.be.equal(daysWithoutWork);
    }
  );

  check.it("the new developer is valid", () => {
    const developer = new Developer();
    expect(developer.id).to.be.a("number").that.to.be.greaterThanOrEqual(1);
    expect(developer.title).to.be.a("string").that.to.be.contain(developer.id);

    expect(developer.projectsCount)
      .to.be.a("number")
      .and.to.be.greaterThanOrEqual(0);

    expect(developer.daysWithoutWork)
      .to.be.a("number")
      .and.to.be.greaterThanOrEqual(0);
  });
});
