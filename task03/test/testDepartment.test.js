import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { TestDepartment } from "../testDepartment.js";
import { Project } from "../project.js";

install();

describe("TestDepartment", () => {
  check.it("any projects are suitable for development", () => {
    const testDepartment = new TestDepartment();
    const project = new Project();
    expect(testDepartment.isMeetConditions(project))
      .to.be.a("boolean")
      .that.to.be.equal(true);
  });

  // noinspection JSUnresolvedVariable
  check.it("developers can work on a anyone project", gen.sPosInt, (count) => {
    const testDepartment = new TestDepartment();
    testDepartment.hireDevelopers(count);
    const project = new Project();
    const allocateProject = testDepartment.beginWork(project);

    expect(allocateProject.length)
      .to.be.lessThanOrEqual(count)
      .and.to.be.greaterThanOrEqual(1);
  });
});
