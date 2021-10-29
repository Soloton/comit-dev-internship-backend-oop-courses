export class BaseObject {
  /**
   *
   * @param ClassName
   * @returns {number}
   */
  static getAutoIncrement(ClassName) {
    if (ClassName && ClassName.hasOwnProperty("autoIncrement")) {
      return ++ClassName.autoIncrement;
    }
  }

  /**
   * Создаёт массив из count объектов класса Class
   * @param count
   * @param Class
   * @returns {Developer[]||Project[]}
   */
  static generate(count, Class) {
    const result = [];

    if (
      Class.constructor.name !== "BaseObject" &&
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
