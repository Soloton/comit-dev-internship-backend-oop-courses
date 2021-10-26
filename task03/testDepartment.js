import { Department } from "./department.js";

export class TestDepartment extends Department {
  /**
   * @inheritDoc
   */
  isMeetConditions(project) {
    return true;
  }
}
