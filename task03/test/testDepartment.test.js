import { expect } from "chai";
import { check, install } from "mocha-testcheck";
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
});
