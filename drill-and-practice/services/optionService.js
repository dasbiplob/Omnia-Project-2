import { sql } from "../database/database.js";
import * as questionAnswerService from "../services/questionAnswerService.js";

const addOption = async (question_id, option_text, is_correct) => {
    if (is_correct) {
        await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${question_id}, ${option_text}, TRUE)`;
    }
    else {
        await sql`INSERT INTO question_answer_options (question_id, option_text) VALUES (${question_id}, ${option_text})`;
    }
};

const getOptionsByQuestion = async (question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows;
};

const deleteOption = async (option_id) => {
    await questionAnswerService.deleteAllQuestionAnswersOfQuestionOption(option_id);
    await sql`DELETE FROM question_answer_options WHERE id = ${option_id};`;
};

const getOptionByOptionId = async (option_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${option_id}`;
    return (await sql`SELECT * FROM question_answer_options WHERE id = ${option_id}`)[0];
}

const getCorrectQuestionOption = async (question_id) => {
    return (await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id} AND is_correct = TRUE`)[0];
}

export {
    addOption,
    getOptionsByQuestion,
    deleteOption,
    getOptionByOptionId,
    getCorrectQuestionOption,
};
