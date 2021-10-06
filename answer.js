import {Base} from "./base.js";

export class Answer extends Base {
  constructor(text, isWrite) {
    super(text);
    this.isWrite = isWrite;
  }
}
