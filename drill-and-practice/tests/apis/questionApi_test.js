import { app } from "../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import { sql } from "../../database/database.js";

import {
    afterEach,
    beforeEach,
    describe,
    it,
} from "https://deno.land/std@0.202.0/testing/bdd.ts";

describe({
    name: "Question api tests",
    async fn() {
        const mockQuestionResponse = {
            "questionId": 1,
            "questionText": "This is my first question",
            "answerOptions": [
                {
                    "optionId": 1,
                    "optionText": "First option"
                },
                {
                    "optionId": 2,
                    "optionText": "Second option"
                }
            ]
        }

        beforeEach(async () => {
            await questionService.addQuestion(1, 1, mockQuestionResponse.questionText);
            await optionService.addOption(mockQuestionResponse.questionId, 'First option');
            await optionService.addOption(mockQuestionResponse.questionId, 'Second option', true);
        });

        afterEach(async () => {
            // delete all entries and restart id from 1
            await sql`TRUNCATE questions, question_answer_options, question_answers RESTART IDENTITY`;
        });

        it("GET /api/questions/random should return a random question", async () => {
            const testClient = await superoak(app);
            await testClient.get("/api/questions/random").expect(200).expect(mockQuestionResponse);
        });


        it("POST /api/questions/answer a correct answer should return correct", async () => {
            const testClient = await superoak(app);
            await testClient.post("/api/questions/answer")
                .send({
                    "questionId": 1,
                    "optionId": 2,
                })
                .expect(200)
                .expect({ correct: true });
        });

        it("POST /api/questions/answer a false answer should return incorrect", async () => {
            const testClient = await superoak(app);
            await testClient.post("/api/questions/answer")
                .send({
                    "questionId": 1,
                    "optionId": 1,
                })
                .expect(200)
                .expect({ correct: false });
        });
    },
    sanitizeResources: false,
    sanitizeOps: false,
});