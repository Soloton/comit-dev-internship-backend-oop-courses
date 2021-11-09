import { expect } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { WebDepartment } from "../webDepartment.js";
import { MobileDepartment } from "../mobileDepartment.js";
import { TestDepartment } from "../testDepartment.js";
import { Department } from "../department.js";
import { Factory } from "../factory.js";
import { sharedAutoincrementType } from "../shared.js";

install();

describe("Department", () => {
  function isDepartmentHireDevelopers(developersCount, Class) {
    const department = new Class();

    const hireDevelopersCount = department.hireDevelopers(developersCount);

    expect(hireDevelopersCount)
      .to.be.a("number")
      .that.to.be.equal(developersCount);
    expect(department.freeDevelopers)
      .to.be.a("Map")
      .that.lengthOf(developersCount)
      .and.to.satisfy((elements) => {
        let result = false;
        for (const developerRecord of elements.values()) {
          const developer = developerRecord.developer;
          result |=
            developer.projectsCount === 0 && developer.daysWithoutWork === 0;
        }
        return result;
      });
  }

  function isAllProjectsAllocated(developersCount, projectsCount, Class) {
    const factory = new Factory();
    const department = new Class();
    const otherDepartment = new Class();
    department.hireDevelopers(developersCount);
    otherDepartment.hireDevelopers(developersCount);

    const projects = new Map();
    let allocateProject1 = new Map();
    for (let i = 0; i < projectsCount; i++) {
      let project1 = factory.createOne(sharedAutoincrementType.developer);
      projects.set(project1.id, project1);
      let projectsMap = new Map();
      projectsMap.set(project1.id, project1);
      let map = otherDepartment.allocateProject(projectsMap);
      allocateProject1 = new Map([...allocateProject1, ...map]);
    }

    const allocateProject = department.allocateProject(projects);

    expect(allocateProject.size).to.be.equal(allocateProject1.size);
  }

  function isClearUnallocated(developersCount, projectsCount, Class) {
    const department = new Class();
    department.hireDevelopers(developersCount);

    const projects = new Map();
    const factory = new Factory();
    for (let i = 0; i < projectsCount; i++) {
      const project = factory.createOne(sharedAutoincrementType.project);
      projects.set(project.id, project);
    }

    const allocateProject = department.allocateProject(projects);

    expect(allocateProject).to.be.lengthOf(projectsCount - projects.size);
  }

  // noinspection JSUnresolvedVariable

  check.it(
    "allocation of projects to mobile development departments",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isAllProjectsAllocated(developersCount, projectsCount, MobileDepartment);
    }
  );
  // noinspection JSUnresolvedVariable

  check.it(
    "allocation of projects to web development departments",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isAllProjectsAllocated(developersCount, projectsCount, WebDepartment);
    }
  );
  // noinspection JSUnresolvedVariable

  check.it(
    "allocation of projects to test development departments",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isAllProjectsAllocated(developersCount, projectsCount, TestDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "after allocation to the mobile development department, projects " +
      "are not included in the list of unallocated",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isClearUnallocated(developersCount, projectsCount, MobileDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "after allocation to the web development department, projects " +
      "are not included in the list of unallocated",
    gen.sPosInt,
    gen.sPosInt,
    (developersCount, projectsCount) => {
      isClearUnallocated(developersCount, projectsCount, WebDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "after allocation to the test development department, projects " +
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
      isDepartmentHireDevelopers(count, WebDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "hiring developers to mobile department if fine",
    gen.sPosInt,
    (count) => {
      isDepartmentHireDevelopers(count, MobileDepartment);
    }
  );

  // noinspection JSUnresolvedVariable
  check.it(
    "hiring developers to test department if fine",
    gen.sPosInt,
    (count) => {
      isDepartmentHireDevelopers(count, TestDepartment);
    }
  );
});
