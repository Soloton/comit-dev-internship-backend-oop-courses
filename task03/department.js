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

  // set freeDevelopers(value) {
  //   this._freeDevelopers = value;
  // }

  addDevelopers(count = 1) {
    for (let i = 0; i < count; i++) {
      this.freeDevelopers.set(new Developer(), NaN);
    }
  }

  /**
   *
   * @param {Map} projects
   * @returns {Map}
   */
  allocateProject(projects) {
    if (!(projects && projects instanceof Map)) {
      return new Map();
    }
    const result = new Map();
    projects.forEach((value, project) => {
      if (!(project instanceof Project)) {
        return;
      }
      if (this.isMeetConditions(project)) {
        // проект соответствует условиям отдела разработки,
        // осталось занять разработчика(ов) этим проектом
        if (this.freeDevelopers && this.freeDevelopers instanceof Map) {
          const developersToProject = project.beginWork(this.freeDevelopers);
          if (developersToProject) {
            result.set(project, {
              developers: developersToProject,
              workingDays: 0,
            });
          }
        }
      }
    });
    return result;
  }

  /**
   *
   * @param {Project} project
   * @returns {boolean}
   */
  isMeetConditions(project) {
    return false;
  }
}
