import { test, type Page } from "@playwright/test";
import { practiceFormPage } from "../../pages/PracticeFormPage";
let page: Page;
let practiceformPage: practiceFormPage;

test.describe.serial("1. Button -1", () => {
  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    practiceformPage= new practiceFormPage(page);
 
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("1.1 Varify Button Heading ", async () => {   
    await practiceformPage.clickOnPracticeForm()

     
  })
  test("1.2 Varify Button Functionality", async () => {
    await practiceformPage.userForm()
    
  })
  test("1.3 Verify no button click scenario  ", async () => {
   
  })

});
