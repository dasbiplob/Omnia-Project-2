import { renderCorrectPage, showQuizTopics } from "../../routes/controllers/quizController.js";
import { assertEquals } from "https://deno.land/std@0.203.0/assert/mod.ts";

Deno.test({
    name: "showQuizTopics will render quizzes.eta correctly",
    async fn() {
        let usedRenderedEta = null;
        const myRenderFunction = (renderedEta) => {
            usedRenderedEta = renderedEta;
        };
        const myContext = { render: myRenderFunction };
        await showQuizTopics(myContext);
        assertEquals(usedRenderedEta, "quizzes.eta");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "renderCorrectPage will render correct.eta correctly and with correct topic Id",
    fn() {
        let usedRenderedEta = null;
        let usedData = null;
        const myRenderFunction = (renderedEta, data) => {
            usedRenderedEta = renderedEta;
            usedData = data;
        };
        const myParams = { tId: "myId" };
        const myContext = { render: myRenderFunction, params: myParams };
        renderCorrectPage(myContext);
        assertEquals(usedRenderedEta, "correct.eta");
        assertEquals(usedData, { topic_id: "myId" });
    },
    sanitizeResources: false,
    sanitizeOps: false,
});