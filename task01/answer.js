import { Base } from "./base.js";

export class Answer extends Base {
  isWrite = false;

  constructor(text, isWrite) {
    super(text);
    this.isWrite = isWrite;
  }
}
