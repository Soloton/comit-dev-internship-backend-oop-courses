import faker from "faker";

export class Developer {
  /**
   *
   * @param id {number | !isNull}
   * @param options
   */
  constructor(id, options = {}) {
    this.id = id;
    // noinspection JSUnresolvedVariable,JSCheckFunctionSignatures
    this._title = options.title || faker.name.findName();
    this._projectsCount = options.projectsCount || 0;
    this._daysWithoutWork = options.daysWithoutWorkCount || 0;
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
}
