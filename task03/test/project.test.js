import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Project } from "../project.js";

install();

describe("Project", () => {
  // noinspection JSUnresolvedVariable
  check.it(
    "default values affect the project",
    gen.asciiString,
    gen.sPosInt,
    gen.sPosInt,
    gen.boolean,
    gen.asciiString,
    (title, id, complexity, isMobile, nextStage) => {
      const project = new Project({
        id: id,
        title: title,
        complexity: complexity,
        isMobile: isMobile,
        nextStage: nextStage,
      });
      expect(project.title.toLowerCase())
        .to.be.a("string")
        .that.to.be.contain(title.toLowerCase());
      expect(project.id).to.be.a("number").that.to.be.equal(id);

      expect(project.complexity).to.be.a("number").and.to.be.equal(complexity);
      expect(project.isMobile).to.be.a("boolean").that.to.be.equal(isMobile);
      expect(project.nextStage).to.be.a("string").that.to.be.equal(nextStage);
    }
  );

  check.it("the new project is valid", () => {
    const project = new Project();
    expect(project.title).to.be.a("string").that.to.be.contain(project.id);
    expect(project.id).to.be.a("number").that.to.be.greaterThanOrEqual(1);

    expect(project.complexity)
      .to.be.a("number")
      .that.to.be.lessThanOrEqual(3)
      .and.to.be.greaterThanOrEqual(1);
    expect(project.isMobile).to.be.a("boolean");
    expect(project.nextStage).to.be.a("string").that.to.be.equal("development");
  });

  // noinspection JSUnresolvedVariable
  check.it("autoIncrement and generate always works", gen.sPosInt, (count) => {
    Project.autoIncrement = count;

    const generate = Project.generate(count, Project);
    expect(generate)
      .to.be.an("array")
      .to.be.lengthOf(count)
      .and.to.satisfy(function (element) {
        return element.every(function (x) {
          return x instanceof Project;
        });
      });

    let j = -1;
    for (let i = 0; i < generate.length; i++) {
      expect(generate[i].id)
        .to.be.a("number")
        .that.to.be.equal(i + 1 + count)
        .that.to.be.equal(j + 2 + count);
      j = i;
    }
  });

  check.it("next stage", () => {
    const project = new Project();

    project.setNextStage();

    expect(project.nextStage).to.be.equal("testing");

    project.setNextStage();

    expect(project.nextStage).to.be.equal("done");
  });
});
