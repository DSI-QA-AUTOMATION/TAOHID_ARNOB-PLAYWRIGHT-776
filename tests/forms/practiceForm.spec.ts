import { test, type Page } from "@playwright/test";
import { practiceFormPage } from "../../pages/PracticeFormPage";
let page: Page;
let practiceformPage: practiceFormPage;

test.describe.serial("9. Practice Form -1", () => {
  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    practiceformPage= new practiceFormPage(page);
 
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("9.1 Varify PracticeForm ", async () => {   
    await practiceformPage.clickOnPracticeForm()

     
  })
  test("9.2 User details: formfillup ", async () => {
    await practiceformPage.userForm()
    
  })
  test("9.3 Verify modal content with respective user details  ", async () => {
      await practiceformPage.varifyModalContent()
  })

});
