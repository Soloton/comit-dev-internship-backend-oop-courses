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

  addFreeDevelopers(count = 1) {
    for (let i = 0; i < count; i++) {
      this.freeDevelopers.set(new Developer(), { department: this });
    }
    return count;
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

    for (const project of projects.keys()) {
      if (!(project instanceof Project)) {
        break;
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
            projects.delete(project);
          }
        }
      }
    }
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

  /**
   * Выполняется при переходе к следующему шагу, после завершения дня
   * @returns {undefined || string}
   */
  setNextStage() {
    return undefined;
  }
}
