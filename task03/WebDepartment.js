import {Department} from "./department.js";
import {Project} from "./project.js";

export class WebDepartment extends Department {
  /**
   * @inheritDoc
   */
  isMeetConditions(project) {
    if (project && project instanceof Project) {
      return !project.isMobile;
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  setNextStage() {
    return "testing";
  }

}
