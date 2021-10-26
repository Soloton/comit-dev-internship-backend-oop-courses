import { Project } from "./project.js";
import { Developer } from "./developer.js";

export class Department {
  constructor() {
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
   * @param  mapDevelopers {Map}
   * @return {undefined || Developer[]}
   */
  static beginWork(project, mapDevelopers) {
    if (
      !(project && project instanceof Project) ||
      !(mapDevelopers && mapDevelopers instanceof Map && mapDevelopers.size > 0)
    ) {
      return;
    }

    if (!project.isMobile) {
      return [mapDevelopers.keys()[0]];
    }

    let count = Math.min(mapDevelopers.size, project.complexity);

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
        if (this.freeDevelopers && this.freeDevelopers instanceof Map) {
          const developersToProject = Department.beginWork(
            project,
            this.freeDevelopers
          );
          if (developersToProject) {
            result.set(project, NaN);
            projects.delete(project);
          }
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
