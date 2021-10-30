import { Department } from "./department.js";
import { Project } from "./project.js";

export class MobileDepartment extends Department {
  /**
   * @inheritDoc
   */
  isMeetConditions(project) {
    if (project instanceof Project) {
      return project.isMobile;
    }
    return false;
  }

  getDevelopersDefaultCount(complexity) {
    return complexity;
  }
}
