import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";

const showMain = async ({ render }) => {
  const allTopics = await topicService.listTopics();
  const allQuestions = await questionService.getAllQuestions();
  const allQuestionAnswers = await questionAnswerService.getAllAnswers();

  render("main.eta", {
    topics: allTopics.length,
    questions: allQuestions.length,
    answers: allQuestionAnswers.length,
  });
};

export { showMain };
