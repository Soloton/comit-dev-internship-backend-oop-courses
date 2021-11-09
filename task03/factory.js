import { Developer } from "./developer.js";
import { Project } from "./project.js";
import { sharedAutoincrementType } from "./shared.js";

export class Factory {
  static _instance = null;

  autoIncrements = [];

  constructor() {
    if (Factory._instance) {
      return Factory._instance;
    }
    Factory._instance = this;
  }

  /**
   * Creates an array of unique objects of the same type
   * @param count {number} number of returned objects
   * @param type {symbol} object type
   * @returns {*[]}
   */
  createMany(count, type) {
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push(this.createOne(type));
    }

    return result;
  }

  /**
   * Creates an instance of a unique object
   * @param type object type
   * @param args arguments for the constructor of the target class
   * @returns {Project|Developer}
   */
  createOne(type, ...args) {
    if (type === sharedAutoincrementType.developer) {
      return new Developer(this.getAutoIncrement(type), args[0]);
    }
    if (type === sharedAutoincrementType.project) {
      return new Project(this.getAutoIncrement(type), args[0]);
    }

    throw new TypeError(`This type does not exist`);
  }

  /**
   *
   * @param type {Symbol}
   * @returns {number}
   */
  getAutoIncrement(type) {
    if (this.autoIncrements[type] !== undefined) {
      this.autoIncrements[type]++;
    } else {
      this.autoIncrements[type] = 0;
    }
    return this.autoIncrements[type];
  }
}
