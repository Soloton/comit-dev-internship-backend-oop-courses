import faker from "faker";
import { AbstractAutoincrement } from "./abstractAutoincrement.js";
import { sharedEnumProjectStage } from "./shared.js";

export class Project extends AbstractAutoincrement {
  static autoIncrement = 0;

  constructor(defaults = {}) {
    super();

    function upCaseFirst(str) {
      if (!str) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    }

    this._id = defaults.id || AbstractAutoincrement.getAutoIncrement(Project);

    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    this._title = upCaseFirst(defaults.title || faker.git.commitMessage());

    this._complexity = defaults.complexity || Math.floor(Math.random() * 3) + 1;

    this._daysOfDevelopmentCount = 0;

    this._developerCount = 0;

    this._isMobile = defaults.hasOwnProperty("isMobile")
      ? defaults.isMobile
      : Math.random() < 0.5;

    this._nextStage = defaults.hasOwnProperty("nextStage")
      ? defaults.nextStage
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

  static getAutoIncrement() {
    return ++Project.autoIncrement;
  }

  static generate(count, Class = Project) {
    return AbstractAutoincrement.generate(count, Class);
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
