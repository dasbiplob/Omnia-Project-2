import { sql } from "../database/database.js";
import * as questionService from "../services/questionService.js";

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;
    return rows;
};

const addTopic = async (name, user_id) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${user_id}, ${name})`;
};

const deleteTopic = async (topic_id) => {
    await sql`DELETE FROM question_answers
    WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topic_id})`;
    await sql`DELETE FROM question_answer_options
    WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topic_id});`;
    await questionService.deleteQuestionsOfTopic(topic_id);
    await sql`DELETE FROM topics WHERE id = ${topic_id};`;
}

export { listTopics, addTopic, deleteTopic };
