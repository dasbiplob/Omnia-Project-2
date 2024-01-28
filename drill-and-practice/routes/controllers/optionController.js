import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const addOption = async ({ params, request, response, render }) => {
    const body = request.body({ type: "form" });
    const formData = await body.value;
    const optionData = { option_text: formData.get("option_text") };
    const [passes, errors] = await validasaur.validate(
        optionData,
        { option_text: [validasaur.required, validasaur.minLength(1)] },
    );
    if (!passes) {
        console.log(errors);
        optionData.validationErrors = errors
        optionData.question = (await questionService.getQuestionById(params.qId))
        optionData.options = await optionService.getOptionsByQuestion(params.qId)
        render("question.eta", optionData);
    }
    else {
        await optionService.addOption(params.qId, formData.get("option_text"), formData.get("is_correct"));
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
}

const deleteOption = async ({ params, response }) => {
    await optionService.deleteOption(params.oId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
}

export { addOption, deleteOption };