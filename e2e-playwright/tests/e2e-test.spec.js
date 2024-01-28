import { test, expect } from "@playwright/test";

test("Open main page with one topic, zero questions, and zero answer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Learned content practicing");
    await expect(page.locator("p>>nth=1")).toContainText("1");
    await expect(page.locator("p>>nth=2")).toContainText("0");
    await expect(page.locator("p>>nth=3")).toContainText("0");
    await expect(page.locator("a")).toContainText(["Topics", "Quiz", "Register", "Login"]);
});

test("Open topics or quiz navigate to login page", async ({ page }) => {
    await page.goto("/topics");
    await expect(page.locator("h1")).toHaveText("Login!");
    await page.goto("/quiz");
    await expect(page.locator("h1")).toHaveText("Login!");
});

test("Register user successfully", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page.locator("h1")).toHaveText("Register!");
    await page.locator("input[type=email]").type("test@gmail.com");
    await page.locator("input[type=password]").type("1234");
    await page.locator("button[type=submit]").click();
    await expect(page.locator("h1")).toHaveText("Login!");
});

test("Login user successfully", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.locator("h1")).toHaveText("Login!");
    await page.locator("input[type=email]").type("test@gmail.com");
    await page.locator("input[type=password]").type("1234");
    await page.locator("button[type=submit]").click();
    await expect(page.locator("h1")).toHaveText("Topics!");
    await expect(page.locator("h2")).toHaveText("Current topics");
    await expect(page.locator("a>>nth=2")).toHaveText("Finnish language");
    expect(await page.locator('button:text("Delete")').count()).toEqual(0);
    expect(await page.locator('h2>>nth=1:text("Add a topic!")').count()).toEqual(0);
});

test("Login with admin successfully", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.locator("h1")).toHaveText("Login!");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("button[type=submit]").click();
    await expect(page.locator("h1")).toHaveText("Topics!");
    await expect(page.locator("h2")).toHaveText(["Current topics", "Add a topic!"]);
    await expect(page.locator("a>>nth=2")).toHaveText("Finnish language");
    expect(await page.locator('button:text("Delete")').count()).toEqual(1);
});

test("Adding topic question successfully", async ({ page }) => {
    await page.goto("/topics");
    await page.locator("input[type=email]").type("test@gmail.com");
    await page.locator("input[type=password]").type("1234");
    await page.locator("button[type=submit]").click();
    await page.locator('a:text("Finnish language")').click();
    await expect(page.locator("h1")).toHaveText("Topic Questions!");
    await expect(page.locator("p>>nth=0")).toHaveText("None available.");
    await page.locator("input[type=textarea]").type("First topic question");
    await page.locator("button[type=submit]").click();
    await expect(page.locator("a>>nth=2")).toHaveText("First topic question");
});

test("Render question page correctly and can add question option", async ({ page }) => {
    await page.goto("/topics");
    await page.locator("input[type=email]").type("test@gmail.com");
    await page.locator("input[type=password]").type("1234");
    await page.locator("button[type=submit]").click();
    await page.locator('a:text("Finnish language")').click();
    await page.locator('a:text("First topic question")').click();
    await expect(page.locator("h1")).toHaveText("Question!");
    expect(await page.locator('p:text("First topic question")').count()).toEqual(1);
    await expect(page.locator("h2")).toHaveText("Adding a question option");
    await page.locator("input[type=textarea]").type("First option");
    await page.getByRole('checkbox').check();
    await page.locator('button[type=submit]:text("Submit option!")').click();
    await page.locator("input[type=textarea]").type("Second option");
    await page.locator('button[type=submit]:text("Submit option!")').click();
});