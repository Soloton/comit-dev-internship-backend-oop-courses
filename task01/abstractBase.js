export class AbstractBase {
  title = "";

  constructor(title) {
    if (this.constructor === AbstractBase) {
      throw new TypeError("Can not construct abstract class.");
    }

    this.title = title;
  }
}
