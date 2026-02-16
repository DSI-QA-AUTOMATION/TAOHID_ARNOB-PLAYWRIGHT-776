import { test, type Page } from "@playwright/test";
import { ButtonsPage } from "../../pages/ButtonsPage";
let buttonsPage: ButtonsPage;
let page: Page;

test.describe.serial("1. Button -1", () => {
  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    buttonsPage = new ButtonsPage(page);
 
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("1.1 Varify Button Heading ", async () => {   
    await buttonsPage.clickOnButtons();
     
  })
  test("1.2 Varify Button Functionality", async () => {
    await buttonsPage.varifyButtons();
  })
  test("1.3 Verify no button click scenario  ", async () => {
    await buttonsPage.noButtonClickScenario();
  })

});
