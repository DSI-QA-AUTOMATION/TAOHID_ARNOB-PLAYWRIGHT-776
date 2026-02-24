import { test, expect, Page } from "@playwright/test";
import { AlertPage } from "../../pages/AlertsPage";
let page: Page;
let alertpage: AlertPage;
test.describe("10. alert", () => {
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    alertpage = new AlertPage(page);
    await alertpage.clickOnAlert()
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("10.1 Alert Window", async () => {
    await alertpage.Alert();
  });
  test("10.2 Timer Alert Window", async () => {
    await alertpage.timeAlert();
  });
  test("10.3 Confirm Box", async () => {
    await alertpage.confirm();
  });
  test("10.4 Prompt Box - Enter Text", async () => {
    await alertpage.promt();
  });
});
