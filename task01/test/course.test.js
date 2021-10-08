import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Course } from "../course.js";
import { Topic } from "../topic.js";

install();
should();

describe("Course", () => {
  check.it(
    "should return an object with a random but valid title",
    gen.string,
    (courseTitle) => {
      const topic = new Course(courseTitle);
      topic.title.should.to.equal(courseTitle);
    }
  );

  check.it(
    "should return an object containing an empty array of topics",
    gen.string,
    (courseTitle) => {
      const topic = new Course(courseTitle);
      topic.topics.should.to.be.an("set").that.is.empty;
    }
  );

  check.it(
    "should return an object containing the topics that have been added only",
    gen.string,
    gen.string,
    gen.boolean,
    (courseTitle, topicTitle, isWrite) => {
      const answerA = new Topic(topicTitle, isWrite);
      const answerB = new Topic(topicTitle, isWrite);
      const answerC = new Topic(topicTitle + "1", isWrite);
      const topic = new Course(courseTitle);
      topic.add(answerA);
      topic.add(answerB);
      topic.topics.should.to.have.length(2);
      topic.topics.should.to.include(answerA);
      topic.topics.should.to.include(answerB);
      topic.topics.should.not.to.include(answerC);
    }
  );

  check.it(
    "should return an object not containing the topics that have been deleted",
    gen.string,
    gen.string,
    gen.boolean,
    (courseTitle, topicTitle, isWrite) => {
      const answerA = new Topic(topicTitle, isWrite);
      const answerB = new Topic(topicTitle + "1", !isWrite);
      const topic = new Course(courseTitle);
      topic.add(answerA);
      topic.delete(answerA);
      topic.delete(answerB);
      topic.topics.should.not.to.include(answerA);
      topic.topics.should.not.to.include(answerB);
    }
  );

  check.it(
    "should return an object containing non-duplicate topics",
    gen.string,
    gen.string,
    gen.boolean,
    (courseTitle, topicTitle, isWrite) => {
      const answerA = new Topic(topicTitle, isWrite);
      const answerB = new Topic(topicTitle, !isWrite);
      const answerC = new Topic(topicTitle + "1", !isWrite);
      const topic = new Course(courseTitle);
      topic.add(answerA);
      topic.add(answerA);
      topic.add(answerB);
      topic.add(answerB);
      topic.add(answerC);
      topic.add(answerC);
      topic.add(answerC);
      topic.topics.should.to.have.length(3);
      topic.topics.should.to.include(answerA);
      topic.topics.should.to.include(answerB);
      topic.topics.should.to.include(answerC);
    }
  );

  check.it(
    "should return an object that can contain mutable objects",
    gen.string,
    gen.string,
    gen.boolean,
    (courseTitle, topicTitle, isWrite) => {
      const answerA = new Topic(topicTitle, isWrite);
      const topic = new Course(courseTitle);
      topic.add(answerA);
      topic.topics.should.to.have.length(1);
      topic.topics.should.to.include(answerA);
      const answerB = Object.assign({}, topic.topics[0]);
      answerA.isWrite = !answerA.isWrite;
      answerA.title = answerA.title.reverse;
      topic.topics.should.to.include(answerA);
      topic.topics.should.to.not.include(answerB);
    }
  );
});
