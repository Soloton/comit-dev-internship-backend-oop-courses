import { Topic } from "./topic.js";

export class Course extends Topic {
  topics = new Set();

  add(topic) {
    if (!this.topics.has(topic)) {
      this.topics.add(topic);
    }
  }

  delete(topic) {
    if (this.topics.has(topic)) {
      this.topics.delete(topic);
    }
  }
}
