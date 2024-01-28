import { sql } from "../database/database.js";

const deleteAllQuestionAnswersOfQuestionOption = async (option_id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${option_id};`;
};

const storeQuestionAnswer = async (user_id, question_id, question_answer_option_id) => {
    await sql`INSERT INTO question_answers
    (user_id, question_id, question_answer_option_id)
      VALUES (${user_id}, ${question_id}, ${question_answer_option_id})`;
}

const getAllAnswers = async () => {
    return await sql`SELECT * FROM question_answers`;
}

export {
    deleteAllQuestionAnswersOfQuestionOption,
    storeQuestionAnswer,
    getAllAnswers,
};