import { should } from "chai";
import { check, gen, install } from "mocha-testcheck";
import { Topic } from "../topic.js";
import { Answer } from "../answer.js";

install();
should();

describe("Topic", () => {
  check.it(
    "should return an object with a random but valid title",
    gen.string,
    (topicTitle) => {
      const topic = new Topic(topicTitle);
      topic.title.should.to.equal(topicTitle);
    }
  );

  check.it(
    "should return an object containing an empty array of answers",
    gen.string,
    (topicTitle) => {
      const topic = new Topic(topicTitle);
      topic.answers.should.to.be.an("array").that.is.empty;
    }
  );

  check.it(
    "should return an object containing the answers that have been added only",
    gen.string,
    gen.string,
    gen.boolean,
    (topicTitle, answerTitle, isWrite) => {
      const answerA = new Answer(answerTitle, isWrite);
      const answerB = new Answer(answerTitle, isWrite);
      const answerC = new Answer(answerTitle + "1", isWrite);
      const topic = new Topic(topicTitle);
      topic.add(answerA);
      topic.add(answerB);
      topic.answers.should.to.have.length(2);
      topic.answers.should.to.include(answerA);
      topic.answers.should.to.include(answerB);
      topic.answers.should.not.to.include(answerC);
    }
  );

  check.it(
    "should return an object not containing the answers that have been deleted",
    gen.string,
    gen.string,
    gen.boolean,
    (topicTitle, answerTitle, isWrite) => {
      const answerA = new Answer(answerTitle, isWrite);
      const answerB = new Answer(answerTitle, !isWrite);
      const answerC = new Answer(answerTitle + "1", !isWrite);
      const topic = new Topic(topicTitle);
      topic.add(answerA);
      topic.add(answerB);
      topic.delete(answerB);
      topic.delete(answerC);
      topic.answers.should.to.include(answerA);
      topic.answers.should.not.to.include(answerB);
      topic.answers.should.not.to.include(answerC);
    }
  );

  check.it(
    "should return an object containing non-duplicate answers",
    gen.string,
    gen.string,
    gen.boolean,
    (topicTitle, answerTitle, isWrite) => {
      const answerA = new Answer(answerTitle, isWrite);
      const answerB = new Answer(answerTitle, !isWrite);
      const answerC = new Answer(answerTitle + "1", !isWrite);
      const topic = new Topic(topicTitle);
      topic.add(answerA);
      topic.add(answerA);
      topic.add(answerB);
      topic.add(answerB);
      topic.add(answerC);
      topic.add(answerC);
      topic.add(answerC);
      topic.answers.should.to.have.length(3);
      topic.answers[0].should.to.be.an("object").that.equal(answerA);
      topic.answers[1].should.to.be.an("object").that.equal(answerB);
      topic.answers[2].should.to.be.an("object").that.equal(answerC);
    }
  );

  check.it(
    "should return an object that can contain mutable objects",
    gen.string,
    gen.string,
    gen.boolean,
    (topicTitle, answerTitle, isWrite) => {
      const answerA = new Answer(answerTitle, isWrite);
      const topic = new Topic(topicTitle);
      topic.add(answerA);
      topic.answers.should.to.have.length(1);
      topic.answers[0].should.to.be.an("object").that.equal(answerA);
      const answerB = Object.assign({}, topic.answers[0]);
      answerA.isWrite = !answerA.isWrite;
      answerA.title = answerA.title.reverse;
      topic.answers[0].should.to.be.an("object").that.equal(answerA);
      topic.answers[0].should.to.be.an("object").that.not.equal(answerB);
    }
  );
});
