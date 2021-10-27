import faker from "faker";
import { BaseObject } from "./baseObject.js";

export class Project extends BaseObject {
  static autoIncrement = 0;

  constructor(defaults = {}) {
    super();

    function upCaseFirst(str) {
      if (!str) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    }

    this._id = defaults.id || BaseObject.getAutoIncrement(Project);

    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    this._title = upCaseFirst(defaults.title || faker.git.commitMessage());

    this._complexity = defaults.complexity || Math.floor(Math.random() * 3) + 1;

    this._isMobile = defaults.hasOwnProperty("isMobile")
      ? defaults.isMobile
      : Math.random() < 0.5;

    this._nextStage = defaults.hasOwnProperty("nextStage")
      ? defaults.nextStage
      : "development";
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
    return BaseObject.generate(count, Class);
  }

  setNextStage() {
    switch (this.nextStage) {
      case "development":
        this._nextStage = "testing";
        break;
      case "testing":
        this._nextStage = "done";
        break;
    }
  }
}
