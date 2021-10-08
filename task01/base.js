export class Base {
  title = "";

  constructor(title) {
    if (this.constructor === Base) {
      throw new TypeError("Can not construct abstract class.");
    }

    this.title = title;
  }
}
