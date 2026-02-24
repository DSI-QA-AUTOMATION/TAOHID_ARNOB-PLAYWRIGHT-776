import { test, expect, Page } from "@playwright/test";
import { FramePage } from "../../pages/FramesPage";
let page: Page;
let framepage: FramePage;
test.describe("11. Frame", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    framepage = new FramePage(page);
    await framepage.clickOnFrame()
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("11.1 Frame Window", async () => {
     await framepage.varifyFrame()
    

  })
   

});
