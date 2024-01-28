import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const addQuestion = async (context) => {
    const { params, request, response, render, user } = context;
    const body = request.body({ type: "form" });
    const formData = await body.value;
    const questionData = { question_text: formData.get("question_text") };
    const [passes, errors] = await validasaur.validate(
        questionData,
        { question_text: [validasaur.required, validasaur.minLength(1)] },
    );
    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors
        render("topic.eta", questionData);
    }
    else {
        await questionService.addQuestion(params.id, user.id, formData.get("question_text"));
        response.redirect(`/topics/${params.id}`);
    }
}

const showQuestion = async ({ render, params }) => {
    render("question.eta", {
        topic_id: params.id,
        options: await optionService.getOptionsByQuestion(params.qId),
        question: (await questionService.getQuestionById(params.qId))
    });
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.tId}`);
}

export { addQuestion, showQuestion, deleteQuestion };