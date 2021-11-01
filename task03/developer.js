import faker from "faker";
import { AbstractAutoincrement } from "./abstractAutoincrement.js";

export class Developer extends AbstractAutoincrement {
  static autoIncrement = 0;

  constructor(defaults = {}) {
    super();
    this.id = defaults.id || AbstractAutoincrement.getAutoIncrement(Developer);
    // noinspection JSUnresolvedVariable,JSCheckFunctionSignatures
    this._title = defaults.title || faker.name.findName();
    this._projectsCount = defaults.projectsCount || 0;
    this._daysWithoutWork = defaults.daysWithoutWorkCount || 0;
  }

  get daysWithoutWork() {
    return this._daysWithoutWork;
  }

  set daysWithoutWork(value) {
    this._daysWithoutWork = value;
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

  static generate(count, Class = Developer) {
    return AbstractAutoincrement.generate(count, Class);
  }
}
