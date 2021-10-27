import { Department } from "./department.js";
import { Project } from "./project.js";

export class MobileDepartment extends Department {
  getDevelopersNorm(complexity) {
    return complexity;
  }

  /**
   * @inheritDoc
   */
  isMeetConditions(project) {
    if (project && project instanceof Project) {
      return project.isMobile;
    }
    return false;
  }
}
