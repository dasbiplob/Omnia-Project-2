import { showMain } from "../../routes/controllers/mainController.js";
import { assertEquals } from "https://deno.land/std@0.203.0/assert/mod.ts";

Deno.test({
    name: "showMain will render main.eta correctly initially",
    async fn() {
        let usedRenderedEta = null;
        let usedData = null;
        const myRenderFunction = (renderedEta, data) => {
            usedRenderedEta = renderedEta;
            usedData = data;
        };
        const myContext = { render: myRenderFunction };
        await showMain(myContext);
        assertEquals(usedRenderedEta, "main.eta");
        assertEquals(usedData, { topics: 1, questions: 0, answers: 0 });
    },
    sanitizeResources: false,
    sanitizeOps: false,
});