import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { WebDepartment } from "../webDepartment.js";
import { Project } from "../project.js";

install();

describe("WebDepartment", () => {
  check.it("projects are suitable for development", gen.boolean, (isMobile) => {
    const webDepartment = new WebDepartment();
    const project = new Project({ isMobile: isMobile });
    expect(webDepartment.isMeetConditions(project))
      .to.be.a("boolean")
      .that.to.be.equal(!isMobile);
  });
});
