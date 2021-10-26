import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Department } from "../department.js";
import { Project } from "../project.js";

install();

describe("Department", () => {
  check.it("projects are suitable for development", gen.boolean, (isMobile) => {
    const department = new Department();
    const project = new Project({ isMobile: isMobile });
    expect(department.isMeetConditions(project))
      .to.be.a("boolean")
      .that.to.be.equal(false);
  });

  // noinspection JSUnresolvedVariable
  check.it("hire developers to department", gen.sPosInt, (count) => {
    const department = new Department();
    const developersCount = department.hireDevelopers(count);
    expect(developersCount).to.be.a("number").that.to.be.equal(count);
    expect(department.freeDevelopers)
      .to.be.a("Map")
      .that.lengthOf(count)
      .and.to.satisfy(function (developers) {
        let result = false;
        for (const developer of developers.keys()) {
          result |=
            developer.projectsCount === 0 && developer.daysWithoutWork === 0;
        }
        return result;
      });
  });
});
