import { Base } from "./base.js";

export class Topic extends Base {
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
