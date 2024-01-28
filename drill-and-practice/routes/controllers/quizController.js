import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";

const showQuizTopics = async ({ render }) => {
    render("quizzes.eta", { topics: await topicService.listTopics() });
};

const chooseTopic = async ({ params, response, render }) => {
    const question = await questionService.getRandomQuestionByTopicId(params.tId);
    if (question.length === 0) {
        render("quizzes.eta", { topics: await topicService.listTopics(), error: { [params.tId]: "This topic does not have question, pick another one" } });
    }
    else {
        response.redirect(`/quiz/${params.tId}/questions/${question[0].id}`);
    }
};

const redirectToQuiz = async ({ params, render }) => {
    const question = await questionService.getQuestionById(params.qId);
    const options = await optionService.getOptionsByQuestion(params.qId);
    render("quiz.eta", { topic_id: params.tId, question: question, options: options });
};

const answerQuiz = async (context) => {
    const { params, response, user } = context;
    await questionAnswerService.storeQuestionAnswer(user.id, params.qId, params.oId);
    const isCorrect = (await optionService.getOptionByOptionId(params.oId)).is_correct;
    if (isCorrect) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
}

const renderCorrectPage = async ({ render, params }) => {
    render("correct.eta", { topic_id: params.tId });
}

const renderInCorrectPage = async ({ render, params }) => {
    const correctOption = await optionService.getCorrectQuestionOption(params.qId);
    render("incorrect.eta", {
        topic_id: params.tId,
        correct_answer: correctOption != null ? correctOption.option_text : "None"
    });
}

export {
    showQuizTopics,
    chooseTopic,
    redirectToQuiz,
    answerQuiz,
    renderCorrectPage,
    renderInCorrectPage,
};