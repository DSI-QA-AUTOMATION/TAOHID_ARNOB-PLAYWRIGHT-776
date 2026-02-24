import { test, type Page } from "@playwright/test";
import { CheckBoxPage } from "../../pages/CheckBoxPage";
let checkBoxPage: CheckBoxPage; 
let page: Page;

test.describe.serial("2. CheckBox", () => {
  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    checkBoxPage = new CheckBoxPage(page);
 
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("2.1 Varify Button Heading ", async () => { 
     await checkBoxPage.clickOnCheckBox();  
     await checkBoxPage.clickonSwitch("Home");
     await checkBoxPage.clickonCheck("Documents");
     await checkBoxPage.clickonSwitch("Downloads");
     await checkBoxPage.clickonCheck("Downloads");
     await checkBoxPage.clickonUnCheck("Downloads");
      
  })
  //@TODO: 
  // Need to add test coverage
  // Build a tree structue object from the dom, then dynamically check those

  test("2.2 Varify Button Functionality", async () => {
 
  })
  test("2.3 Verify no button click scenario  ", async () => {
 
  })

});
