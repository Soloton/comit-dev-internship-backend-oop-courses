import faker from "faker/locale/ru.js";
import { Developer } from "./developer.js";

export class Project {
  static autoIncrement = 0;

  constructor() {
    function upCaseFirst(str) {
      if (!str) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    }

    this.id = Project.getAutoIncrement();
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    this._title = upCaseFirst(faker.git.commitMessage());
    this._complexity = Math.floor(Math.random() * 3) + 1;
    this._type = Math.random() < 0.5;
    this._nextStage = "development";
  }

  get nextStage() {
    return this._nextStage;
  }

  get title() {
    return `${this._title} (#${this.id})`;
  }

  get complexity() {
    return this._complexity;
  }

  /**
   * Project isMobile
   * @returns {boolean} 1 - mobile; 2 - web
   */
  get isMobile() {
    return !!this._type;
  }

  static getAutoIncrement() {
    return ++Project.autoIncrement;
  }

  static generateProjects(count) {
    const result = [];

    if (count) {
      for (let i = 0; i < count; i++) {
        result.push(new Project());
      }
    }

    return result;
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

  /**
   *
   * @param {Map} mapDevelopers
   * @return {undefined || Developer[]}
   */
  beginWork(mapDevelopers) {
    if (
      !(mapDevelopers && mapDevelopers instanceof Map && mapDevelopers.size > 0)
    ) {
      return;
    }

    if (!this.isMobile) {
      return [mapDevelopers.keys()[0]];
    }

    let count = Math.min(mapDevelopers.size, this.complexity);

    const developersArray = [];

    for (const developer of mapDevelopers.keys()) {
      if (developer && developer instanceof Developer) {
        if (count-- <= 0) {
          return developersArray;
        }
        developer.projectsCount++;
        developer.daysWithoutWork = 0;
        developersArray.push(developer);
      }
    }

    return developersArray;
  }
}
