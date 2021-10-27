import { Department } from "./department.js";

export class TestDepartment extends Department {
  getDevelopersNorm(complexity) {
    return 1;
  }

  /**
   * @inheritDoc
   */
  isMeetConditions(project) {
    return true;
  }
}
