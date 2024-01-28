import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as authController from "./controllers/authController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicController.showTopics);
router.get("/topics/:id", topicController.showTopic);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", questionController.showQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);
router.post("/topics/:id/questions/:qId/options", optionController.addOption);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOption);
router.get("/auth/register", authController.showRegister);
router.post("/auth/register", authController.registerUser);
router.get("/auth/login", authController.showLogin);
router.post("/auth/login", authController.loginUser);
router.get("/quiz", quizController.showQuizTopics);
router.get("/quiz/:tId", quizController.chooseTopic);
router.get("/quiz/:tId/questions/:qId", quizController.redirectToQuiz);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.answerQuiz);
router.get("/quiz/:tId/questions/:qId/correct", quizController.renderCorrectPage);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.renderInCorrectPage);
router.get("/api/questions/random", oakCors(), questionApi.showRandomQuestion);
router.post("/api/questions/answer", oakCors(), questionApi.answerRandomQuestion);

export { router };
