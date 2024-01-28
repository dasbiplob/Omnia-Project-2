import { showRegister, showLogin } from "../../routes/controllers/authController.js";
import { assertEquals } from "https://deno.land/std@0.203.0/assert/mod.ts";

Deno.test({
    name: "showRegister will render register.eta correctly",
    fn() {
        let usedRenderedEta = null;
        const myRenderFunction = (renderedEta) => {
            usedRenderedEta = renderedEta;
        };
        const myContext = { render: myRenderFunction };
        showRegister(myContext);
        assertEquals(usedRenderedEta, "register.eta");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "showLogin will render login.eta correctly",
    fn() {
        let usedRenderedEta = null;
        const myRenderFunction = (renderedEta) => {
            usedRenderedEta = renderedEta;
        };
        const myContext = { render: myRenderFunction };
        showLogin(myContext);
        assertEquals(usedRenderedEta, "login.eta");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});