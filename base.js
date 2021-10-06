export class Base {
  constructor(title) {
    if (this.constructor === Base) {
      throw new TypeError("Can not construct abstract class.");
    }

    this.title = title;
  }
}
