import { test, type Page } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { BasePage } from "../../pages/base/BasePage";
import { textBoxPage } from "../../pages/TextBoxPage";
let textBoxpage: textBoxPage;
let basePage: BasePage;
let page: Page;

test.describe("6. TextBox ", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    basePage = new BasePage(page);
    await basePage.navigatetoBasePage();
    textBoxpage = new textBoxPage(page);
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("6.1 Text Box UI and it's Basic functionality", async () => {
    await textBoxpage.labelCheckForTexBox();
  });
  test("6.2 Varify blank submission", async () => {
    await textBoxpage.varifyBlankSubmission();
  });
  test("6.3 Varify the submission of text box with valid data", async () => {
    await textBoxpage.submitBox();
  });
});
