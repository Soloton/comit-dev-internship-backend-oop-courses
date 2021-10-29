import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { WebDepartment } from "../webDepartment.js";
import { MobileDepartment } from "../mobileDepartment.js";
import { TestDepartment } from "../testDepartment.js";
import { Department } from "../department.js";
import { Project } from "../project.js";

install();

describe("Department", () => {
  function testDepartment(developersCount, Class) {
    const department = new Class();
    const hireDevelopersCount = department.hireDevelopers(developersCount);
    expect(hireDevelopersCount)
      .to.be.a("number")
      .that.to.be.equal(developersCount);
    expect(department.freeDevelopers)
      .to.be.a("Map")
      .that.lengthOf(developersCount)
      .and.to.satisfy((developers) => {
        let result = false;
        for (const developer of developers.keys()) {
          result |=
            developer.projectsCount === 0 && developer.daysWithoutWork === 0;
        }
        return result;
      });
  }

  function isAllProjectsAllocated(developersCount, projectsCount, Class) {
    const mobileDepartment = new Class();
    const mobileDepartment1 = new Class();
    mobileDepartment.hireDevelopers(developersCount);
    mobileDepartment1.hireDevelopers(developersCount);

    const projects = new Map();
    let allocateProject1 = new Map();
    for (let i = 0; i < projectsCount; i++) {
      let project1 = new Project();
      projects.set(project1, NaN);
      let projectsM = new Map();
      projectsM.set(project1, NaN);
      let map = mobileDepartment1.allocateProject(projectsM);
      allocateProject1 = new Map([...allocateProject1, ...map]);
    }

    const allocateProject = mobileDepartment.allocateProject(projects);

    expect(allocateProject.size).to.be.equal(allocateProject1.size);
  }

  function isClearUnallocated(developersCount, projectsCount, Class) {
    const mobileDepartment = new Class();
    mobileDepartment.hireDevelopers(developersCount);

    const projects = new Map();
    for (let i = 0; i < projectsCount; i++) {
      projects.set(new Project(), NaN);
    }

    const allocateProject = mobileDepartment.allocateProject(projects);

    expect(allocateProject).to.be.lengthOf(projectsCount - projects.size);
  }

  // noinspection JSUnresolvedVariable

  check.it(
    "distribution of projects to mobile development departments",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isAllProjectsAllocated(developersCount, projectsCount, MobileDepartment);
    }
  );
  // noinspection JSUnresolvedVariable

  check.it(
    "distribution of projects to web development departments",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isAllProjectsAllocated(developersCount, projectsCount, WebDepartment);
    }
  );
  // noinspection JSUnresolvedVariable

  check.it(
    "distribution of projects to test development departments",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isAllProjectsAllocated(developersCount, projectsCount, TestDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "after distribution to the mobile development department, projects " +
      "are not included in the list of unallocated",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isClearUnallocated(developersCount, projectsCount, MobileDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "after distribution to the web development department, projects " +
      "are not included in the list of unallocated",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isClearUnallocated(developersCount, projectsCount, WebDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "after distribution to the test development department, projects " +
      "are not included in the list of unallocated",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isClearUnallocated(developersCount, projectsCount, TestDepartment);
    }
  );

  check.it("should return an exception when created", gen.string, (text) => {
    expect(() => {
      new Department(text);
    }).to.throw(TypeError);
  });

  // noinspection JSUnresolvedVariable
  check.it(
    "hiring developers to web department if fine",
    gen.sPosInt,
    (count) => {
      testDepartment(count, WebDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "hiring developers to mobile department if fine",
    gen.sPosInt,
    (count) => {
      testDepartment(count, MobileDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "hiring developers to test department if fine",
    gen.sPosInt,
    (count) => {
      testDepartment(count, TestDepartment);
    }
  );
});
