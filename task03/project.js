import faker from "faker";
import { sharedEnumProjectStage } from "./shared.js";

export class Project {
  /**
   *
   * @param id {number | !isNull}
   * @param options
   */
  constructor(id, options = {}) {
    function upCaseFirst(str) {
      if (!str) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    }

    this._id = id;

    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    this._title = upCaseFirst(options.title || faker.git.commitMessage());

    this._complexity = options.complexity || Math.floor(Math.random() * 3) + 1;

    this._daysOfDevelopmentCount = 0;

    this._developerCount = 0;

    this._isMobile = options.hasOwnProperty("isMobile")
      ? options.isMobile
      : Math.random() < 0.5;

    this._nextStage = options.hasOwnProperty("nextStage")
      ? options.nextStage
      : sharedEnumProjectStage.development;
  }

  get developerCount() {
    return this._developerCount;
  }

  set developerCount(value) {
    this._developerCount = value;
  }

  get daysOfDevelopmentCount() {
    return this._daysOfDevelopmentCount;
  }

  set daysOfDevelopmentCount(value) {
    this._daysOfDevelopmentCount = value;
  }

  get complexity() {
    return this._complexity;
  }

  get id() {
    return this._id;
  }

  get title() {
    return `${this._title} (#${this._id})`;
  }

  get nextStage() {
    return this._nextStage;
  }

  get isMobile() {
    return !!this._isMobile;
  }

  setNextStage() {
    switch (this.nextStage) {
      case sharedEnumProjectStage.development:
        this._nextStage = sharedEnumProjectStage.testing;
        break;
      case sharedEnumProjectStage.testing:
        this._nextStage = sharedEnumProjectStage.done;
        break;
    }
  }
}
