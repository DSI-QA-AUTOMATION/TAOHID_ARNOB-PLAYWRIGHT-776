import { test, type Page } from "@playwright/test";
import { HomePage} from "../../pages/HomePage";
import { BasePage } from "../../pages/base/BasePage";
let homePage: HomePage;
let basePage: BasePage;
let page: Page;

test.describe("3. HomePage -1", () => {
  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    basePage = new BasePage(page);
    await basePage.navigatetoBasePage();
    homePage = new HomePage(page);
 
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("3.1 Varify all the card visiblity,& their URL", async () => {   

    await homePage.varifyElements();
    await homePage.varifyForms();
    await homePage.varifyAlertFrameWindows();
    await homePage.varifyWidgets();    
    await homePage.varifyInteraction();    
    await homePage.varifyBookStoreApplication(); 
    
  })

  
});
