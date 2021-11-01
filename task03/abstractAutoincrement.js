export class BaseObject {
export class AbstractAutoincrement {
  /**
   *
   * @param Class
   * @returns {number}
   */
  static getAutoIncrement(Class) {
    if (Class && Class.hasOwnProperty("autoIncrement")) {
      return ++Class.autoIncrement;
    }
  }

  /**
   * Creates an array of count objects of class Class
   * @param count
   * @param Class
   * @returns {Developer[]||Project[]}
   */
  static generate(count, Class) {
    const result = [];

    if (
      Class.constructor.name !== "AbstractAutoincrement" &&
      Number.isInteger(count) &&
      Class
    ) {
      for (let i = 0; i < count; i++) {
        result.push(new Class());
      }
    }

    return result;
  }
}
