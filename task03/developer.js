import faker from "faker/locale/ru.js";

export class Developer {
  static autoIncrement = 0;

  constructor() {
    this.id = Developer.getAutoIncrement();
    // noinspection JSUnresolvedVariable,JSCheckFunctionSignatures
    this._title = faker.name.findName();
    this._projectsCount = 0;
    this._daysWithoutWorkCount = 0;
  }

  get daysWithoutWork() {
    return this._daysWithoutWorkCount;
  }

  set daysWithoutWork(value) {
    this._daysWithoutWorkCount = value;
  }

  get projectsCount() {
    return this._projectsCount;
  }

  set projectsCount(value) {
    this._projectsCount = value;
  }

  get title() {
    return `${this._title} (#${this.id})`;
  }

  static getAutoIncrement() {
    return ++Developer.autoIncrement;
  }
}
