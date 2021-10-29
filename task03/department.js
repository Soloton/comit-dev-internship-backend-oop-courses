import { Project } from "./project.js";
import { Developer } from "./developer.js";

export class Department {
  constructor() {
    if (this.constructor === Department) {
      throw new TypeError("Can't instantiate abstract class!");
    }
    this._freeDevelopers = new Map();
  }

  /**
   * Список свободных разработчиков
   * @returns {Map}
   */
  get freeDevelopers() {
    return this._freeDevelopers;
  }

  /**
   *
   * @param  project {Project}
   * @return {undefined || Developer[]}
   */
  beginWork(project) {
    const mapDevelopers = this.freeDevelopers;
    if (
      !(project && project instanceof Project) ||
      !(mapDevelopers && mapDevelopers instanceof Map && mapDevelopers.size > 0)
    ) {
      return;
    }

    let count = Math.min(
      mapDevelopers.size,
      this.getDevelopersNorm(project.complexity)
    );

    const result = [];

    for (const developer of mapDevelopers.keys()) {
      if (developer && developer instanceof Developer) {
        if (count-- <= 0) {
          return result;
        }
        developer.projectsCount++;
        developer.daysWithoutWork = 0;
        result.push(developer);
      }
    }

    return result;
  }

  // noinspection JSUnusedLocalSymbols
  getDevelopersNorm(complexity) {
    throw new Error(`Method 'getDevelopersNorm()' must be implemented}.`);
  }

  hireDevelopers(count = 1) {
    const generateDevelopers = Developer.generate(count);

    generateDevelopers.forEach((x) => {
      this.freeDevelopers.set(x, { department: this });
    });

    return count;
  }

  /**
   *
   * @param projects {Map}
   * @returns {Map}
   */
  allocateProject(projects) {
    if (!(projects && projects instanceof Map)) {
      return new Map();
    }
    const result = new Map();

    for (const project of projects.keys()) {
      if (!(project instanceof Project)) {
        break;
      }
      if (this.isMeetConditions(project)) {
        const developersToProject = this.beginWork(project);
        if (developersToProject) {
          result.set(project, NaN);
          projects.delete(project);
        }
      }
    }
    return result;
  }

  /**
   * Проект соответствует условиям отдела
   * @param {Project} project
   * @returns {boolean}
   */
  isMeetConditions(project) {
    return false;
  }

  tickDevelopers() {
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
}
