import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { MobileDepartment } from "../mobileDepartment.js";
import { Project } from "../project.js";

install();

describe("MobileDepartment", () => {
  check.it("projects are suitable for development", gen.boolean, (isMobile) => {
    const webDepartment = new MobileDepartment();
    const project = new Project({ isMobile: isMobile });
    expect(webDepartment.isMeetConditions(project))
      .to.be.a("boolean")
      .that.to.be.equal(isMobile);
  });
});
