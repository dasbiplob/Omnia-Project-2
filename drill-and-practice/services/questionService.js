import { sql } from "../database/database.js";

const getQuestionsByTopic = async (topic_id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
    return rows;
};

const addQuestion = async (topic_id, user_id, question_text) => {
    await sql`INSERT INTO questions (topic_id, user_id, question_text) VALUES (${topic_id}, ${user_id}, ${question_text})`;
};

const deleteQuestionsOfTopic = async (topic_id) => {
    await sql`DELETE FROM questions WHERE topic_id = ${topic_id};`;
};

const getQuestionById = async (question_id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${question_id}`;
    return rows[0];
};

const deleteQuestion = async (question_id) => {
    await sql`DELETE FROM questions WHERE id = ${question_id};`;
};

const getRandomQuestionByTopicId = async (topic_id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id} ORDER BY RANDOM() LIMIT 1`;
    return rows;
};

const getRandomQuestion = async () => {
    const rows = (await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`)[0];
    return rows;
};

const getAllQuestions = async () => {
    const rows = await sql`SELECT * FROM questions`;
    return rows;
};

export {
    addQuestion,
    deleteQuestionsOfTopic,
    getQuestionsByTopic,
    getQuestionById,
    deleteQuestion,
    getRandomQuestionByTopicId,
    getRandomQuestion,
    getAllQuestions,
};
