import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { TestDepartment } from "../testDepartment.js";
import { Factory } from "../factory.js";
import { sharedAutoincrementType } from "../shared.js";

install();

describe("TestDepartment", () => {
  check.it("any projects are suitable for development", () => {
    const testDepartment = new TestDepartment();
    const factory = new Factory();
    const project = factory.createOne(sharedAutoincrementType.project);
    expect(testDepartment.isMeetConditions(project))
      .to.be.a("boolean")
      .that.to.be.equal(true);
  });

  // noinspection JSUnresolvedVariable
  check.it("developers can work on a anyone project", gen.sPosInt, (count) => {
    const testDepartment = new TestDepartment();
    testDepartment.hireDevelopers(count);
    const factory = new Factory();
    const project = factory.createOne(sharedAutoincrementType.project);
    const allocateProject = testDepartment.beginWork(project);

    expect(allocateProject.length)
      .to.be.lessThanOrEqual(count)
      .to.be.greaterThan(0)
      .and.to.be.greaterThanOrEqual(1);
  });
});
