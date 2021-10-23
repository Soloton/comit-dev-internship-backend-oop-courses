import { Department } from "./department.js";
import { Project } from "./project.js";

export class MobileDepartment extends Department {
  /**
   * @inheritDoc
   */
  isMeetConditions(project) {
    if (project && project instanceof Project) {
      return project.type === 1;
    }
    return false;
  }
}
