import { test, type Page } from "@playwright/test";
import { HomePage} from "../../pages/HomePage";
import { BasePage } from "../../pages/base/BasePage";
import{textBoxPage} from "../../pages/TextBoxPage";
let textBoxpage: textBoxPage;
let basePage: BasePage;
let page: Page;

test.describe("4. TextBox -1" , () => {
  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    basePage = new BasePage(page);
    await basePage.navigatetoBasePage();
    textBoxpage = new textBoxPage(page);
 
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("3.1 Varify all the card visiblity,& their URL", async () => {   

    await textBoxpage.clickTextBox();
    await textBoxpage.submitBox();  
    
  })

  
});
