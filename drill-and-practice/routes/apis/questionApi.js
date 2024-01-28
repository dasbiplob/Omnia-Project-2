import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const showRandomQuestion = async ({ response }) => {
    const question = await questionService.getRandomQuestion();
    if (!question) {
        response.body = {};
        return;
    }
    const options = await optionService.getOptionsByQuestion(question.id);
    const answerOptions = options.map(mapOptions);
    const data = {
        "questionId": question.id,
        "questionText": question.question_text,
        "answerOptions": answerOptions,
    }
    response.body = data;
};

const answerRandomQuestion = async ({ response, request }) => {
    const body = request.body();
    const requestData = await body.value;
    const option = await optionService.getOptionByOptionId(requestData.optionId);
    if (!option) {
        response.body = {};
        return;
    }
    if (option.is_correct === true && option.question_id === requestData.questionId) {
        response.body = { correct: true };
    } else {
        response.body = { correct: false };
    }
}

const mapOptions = (option) => {
    return {
        optionId: option.id,
        optionText: option.option_text,
    };
};

export { showRandomQuestion, answerRandomQuestion };