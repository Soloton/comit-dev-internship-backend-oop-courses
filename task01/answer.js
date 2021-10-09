import { AbstractBase } from "./abstractBase.js";

export class Answer extends AbstractBase {
  isWrite = false;

  constructor(text, isWrite) {
    super(text);
    this.isWrite = isWrite;
  }
}
