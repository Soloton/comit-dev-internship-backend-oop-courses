import { WebDepartment } from "./WebDepartment.js";
import { MobileDepartment } from "./MobileDepartment.js";
import { TestDepartment } from "./TestDepartment.js";
import { Project } from "./project.js";
import { Developer } from "./developer.js";

export class Company {
  constructor() {
    this.webDepartment = new WebDepartment();
    this.mobileDepartment = new MobileDepartment();
    this.testDepartment = new TestDepartment();
    this._unallocatedProjects = new Map();
    this._projectsInWork = new Map();

    this.hiredDevelopersCount = 0;
    this.firedDevelopersCount = 0;
    this.finishedProjectsCount = 0;
  }

  getNewProjects() {
    return Project.generateProjects(Math.floor(Math.random() * 3) + 1);
  }

  /**
   *
   * @param {Project[]} projects
   */
  addUnallocated(projects) {
    if (projects && Array.isArray(projects)) {
      projects.forEach((x) => {
        this._unallocatedProjects.set(x, NaN);
      });
    }
  }

  /**
   *
   * @returns {Project[]}
   */
  getProjectsInWorkArray() {
    return Array.from(this._projectsInWork.keys());
  }

  /**
   *
   * @returns {Project[]}
   */
  getUnallocatedProjects() {
    return Array.from(this._unallocatedProjects.keys());
  }

  /**
   * Передача проектов по отделам в работу
   * @param {Map} projects
   * @constructor
   */
  allocateProjects(projects) {
    this._projectsInWork = new Map([
      ...this._projectsInWork,
      ...this.mobileDepartment.allocateProject(projects),
      ...this.webDepartment.allocateProject(projects),
      ...this.testDepartment.allocateProject(projects),
    ]);

    // for (const key of this._projectsInWork.keys()) {
    //   projects.delete(key);
    // }
  }

  /**
   * Передача нераспределённых проектов по отделам в работу
   */
  allocateUnallocatedProjects() {
    this.allocateProjects(this._unallocatedProjects);
  }

  /**
   * Увольнение неудачника
   */
  fireLooser() {
    // todo уволить одного девелопера, который меньше всего участвовал
    //  в проектах из тех, кто три дня не участвовал в проектах

    const developersArray = [
      ...this.mobileDepartment.freeDevelopers,
      ...this.webDepartment.freeDevelopers,
      ...this.testDepartment.freeDevelopers,
    ];

    if (
      developersArray &&
      Array.isArray(developersArray) &&
      developersArray.length <= 0
    ) {
      return;
    }

    let developer;

    developersArray
      .sort((a, b) => {
        return b.projectsCount - a.projectsCount;
      })
      .forEach(([k]) => {
        if (!k) {
          return;
        }
        if (k instanceof Developer && k.daysWithoutWork > 3) {
          developer = k;
        }
      });

    if (developer) {
      if (this.mobileDepartment.freeDevelopers.delete(developer)) {
        this.firedDevelopersCount++;
        return developer;
      }
      if (this.webDepartment.freeDevelopers.delete(developer)) {
        this.firedDevelopersCount++;
        return developer;
      }
      if (this.testDepartment.freeDevelopers.delete(developer)) {
        this.firedDevelopersCount++;
        return developer;
      }
    }
  }

  /**
   * Найм работников в отделы
   */
  hireDevelopers() {
    const unallocatedProjects = this.getUnallocatedProjects();
    unallocatedProjects.forEach((x) => {
      if (x.nextStage === "development") {
        if (x.isMobile) {
          this.hiredDevelopersCount += this.webDepartment.addFreeDevelopers(
            x.complexity
          );
        } else {
          this.hiredDevelopersCount +=
            this.mobileDepartment.addFreeDevelopers();
        }
      } else if (x.nextStage === "testing") {
        this.hiredDevelopersCount += this.mobileDepartment.addFreeDevelopers();
      } else {
        throw new Error();
      }
    });
  }

  tickDay() {
    this.tickProjects();
    this.tickDevelopers();
  }

  tickDevelopers() {
    function tickDevelopers() {
      if (!(this.freeDevelopers && this.freeDevelopers instanceof Map)) {
        return;
      }
      for (let k of this.freeDevelopers.keys()) {
        if (k && k instanceof Developer) {
          k.daysWithoutWork++;
          k.projectsCount = 0;
        }
      }
    }

    tickDevelopers.call(this.webDepartment);
    tickDevelopers.call(this.mobileDepartment);
    tickDevelopers.call(this.testDepartment);
  }

  tickProjects() {
    if (
      !(
        this._projectsInWork &&
        this._projectsInWork instanceof Map &&
        this._projectsInWork.size > 0
      )
    ) {
      return;
    }

    /**
     *
     * @type {Developer[]}
     */
    const doneProjects = [];
    for (let projectInWork of this._projectsInWork) {
      let project = projectInWork[0];
      let meta = projectInWork[1];
      if (!(project && project instanceof Project)) {
        continue;
      }
      if (project.isMobile) {
        meta.workingDays++;
      } else {
        meta.workingDays += project.complexity;
      }
      project.setNextStage();
      if (project.nextStage === "done") {
        doneProjects.push(project);
      }
    }

    doneProjects.forEach((x) => {
      this._projectsInWork.delete(x);
      this.finishedProjectsCount++;
    });
  }
}
