import { AbstractBase } from "./abstractBase.js";

export class Topic extends AbstractBase {
  answers = [];

  add(answer) {
    if (this.answers.indexOf(answer) === -1) {
      this.answers.push(answer);
    }
  }

  delete(answer) {
    const indexOfAnswer = this.answers.indexOf(answer);
    if (indexOfAnswer > -1) {
      this.answers.splice(indexOfAnswer, 1);
    }
  }
}
