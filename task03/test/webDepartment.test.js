import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { WebDepartment } from "../webDepartment.js";
import { Factory } from "../factory.js";
import { sharedAutoincrementType } from "../shared.js";

install();

describe("WebDepartment", () => {
  check.it("projects are suitable for development", gen.boolean, (isMobile) => {
    const webDepartment = new WebDepartment();
    const factory = new Factory();
    const project = factory.createOne(sharedAutoincrementType.project, {
      isMobile: isMobile,
    });
    expect(webDepartment.isMeetConditions(project))
      .to.be.a("boolean")
      .that.to.be.equal(!isMobile);
  });

  // noinspection JSUnresolvedVariable
  check.it(
    "web developers can work on a one web project",
    gen.sPosInt,
    (count) => {
      const webDepartment = new WebDepartment();
      webDepartment.hireDevelopers(count);
      const factory = new Factory();
      const project = factory.createOne(sharedAutoincrementType.project, {
        isMobile: false,
      });

      const allocateProject = webDepartment.beginWork(project);

      expect(allocateProject.length)
        .to.be.lessThanOrEqual(count)
        .and.to.be.greaterThanOrEqual(1);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "web developers can not work on a one mobile project",
    gen.sPosInt,
    (count) => {
      const webDepartment = new WebDepartment();
      webDepartment.hireDevelopers(count);
      const factory = new Factory();
      const project = factory.createOne(sharedAutoincrementType.project, {
        isMobile: true,
      });

      const allocateProject = webDepartment.beginWork(project);

      expect(allocateProject).to.be.undefined;
    }
  );
});
