import { test, expect, Page } from "@playwright/test";
import { LinkPage } from "../../pages/LinksPage";
let page: Page;
let linkpage: LinkPage;

test.describe.serial("4. LinkPage", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    linkpage = new LinkPage(page);
    await linkpage.clickOnLinkPage();
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("4.1 Varify links will open new tab- Static(_Home_)", async () => {
   
    await linkpage.staticNewTab();
  });
  test("4.2 Varify links will open new tab- Dynamic(_HOME_Value)", async () => {

    await linkpage.dynamicNewTab()
  });
  test("1. Click on the NewTab- Static(_Home_)", async () => {
    // await linkpage.clickOnLinkPage();
    await linkpage.apiCall()
  });
});
