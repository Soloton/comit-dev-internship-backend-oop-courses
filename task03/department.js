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
   * List of free developers
   * @returns {Map}
   */
  get freeDevelopers() {
    return this._freeDevelopers;
  }

  /**
   * List of free developers
   * @returns {Array}
   */
  get freeDevelopersArray() {
    return Array.from(this._freeDevelopers, ([, value]) => value);
  }

  /**
   *
   * @param  project {Project}
   * @return {undefined || Developer[]}
   */
  beginWork(project) {
    if (!this.isMeetConditions(project)) {
      return;
    }

    const mapDevelopers = this.freeDevelopers;
    if (
      !(project instanceof Project) ||
      !(mapDevelopers instanceof Map && mapDevelopers.size > 0)
    ) {
      return;
    }

    let count = Math.min(
      mapDevelopers.size,
      this.getDevelopersDefaultCount(project.complexity)
    );

    const result = [];

    for (const developerRecord of mapDevelopers.values()) {
      if (!developerRecord.hasOwnProperty("developer")) {
        continue;
      }
      const developer = developerRecord.developer;
      if (developer instanceof Developer) {
        if (count-- <= 0) {
          return result;
        }
        developer.projectsCount++;
        developer.daysWithoutWork = 0;
        project.developerCount++;
        result.push(developer);
      }
    }

    return result;
  }

  // noinspection JSUnusedLocalSymbols
  getDevelopersDefaultCount() {
    throw new Error(
      "Method 'getDevelopersDefaultCount()' must be implemented}."
    );
  }

  hireDevelopers(count = 1) {
    const generateDevelopers = Developer.generate(count);

    generateDevelopers.forEach((developer) => {
      this.freeDevelopers.set(developer.id, {
        developer: developer,
        department: this,
      });
    });

    return count;
  }

  /**
   *
   * @param projects {Map}
   * @returns {Map}
   */
  allocateProject(projects) {
    if (!(projects instanceof Map)) {
      return new Map();
    }
    const result = new Map();

    for (const projectRecord of projects) {
      if (projectRecord.length > 1) {
        const id = projectRecord[0];
        const project = projectRecord[1];
        if (!(project instanceof Project)) {
          continue;
        }

        const developersToProject = this.beginWork(project);
        if (developersToProject) {
          result.set(id, project);
        }
      }
    }

    if (result.size > 0) {
      for (const projectId of result.keys()) {
        projects.delete(projectId);
      }
    }

    return result;
  }

  /**
   * The project meets the conditions of the department
   * @param {Project} project
   * @returns {boolean}
   */
  isMeetConditions(project) {
    throw new Error("Method 'isMeetConditions()' must be implemented}.");
  }

  tickDevelopers() {
    if (!(this.freeDevelopers instanceof Map)) {
      return;
    }
    for (let developerRecord of this.freeDevelopers.values()) {
      if (!developerRecord.hasOwnProperty("developer")) {
        continue;
      }
      const developer = developerRecord.developer;
      if (developer instanceof Developer) {
        developer.daysWithoutWork++;
        developer.projectsCount = 0;
      }
    }
  }
}
