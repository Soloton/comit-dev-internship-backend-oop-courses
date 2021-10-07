import {Topic} from "./topic.js";

export class Course extends Topic {
  constructor(text) {
    super(text);
    this.topics = new Set();
  }

  add(topic) {
    if (this.topics === undefined) {
      this.topics = new Set();
    }

    if (!this.topics.has(topic)) {
      this.topics.add(topic);
    }
  }

  delete(topic) {
    if (this.topics === undefined) {
      this.topics = new Set();
    }

    if (this.topics.has(topic)) {
      this.topics.delete(topic);
    }
  }
}
