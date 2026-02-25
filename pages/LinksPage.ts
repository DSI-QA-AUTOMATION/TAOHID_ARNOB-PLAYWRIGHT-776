import { expect, Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { BasePage, url } from "./base/BasePage";
let homePage: HomePage;
let basePage: BasePage;
export class LinkPage {
  private page: Page;
  linkPage: Locator;
  homeLInk: Locator;
  dynamicLink:Locator;
  linkpageHeading:Locator;
  newTabHeaidng:Locator;
  apiHeading:Locator;
  resulTextLocator:Locator;
  constructor(page: Page) {
    this.page = page;
    this.linkPage = page.getByText("Links",{exact:true});
    this.linkpageHeading= page.getByRole('heading', {name:'Links', exact:true})
    this.newTabHeaidng= page.getByRole('heading', {name:'Following links will open new tab', exact:true})
    this.apiHeading= page.getByRole('heading', {name:'Following links will send an api call', exact:true})
    this.homeLInk = page.getByRole("link", { name: "Home" , exact:true});
    this.dynamicLink= page.locator('#dynamicLink')
    this.resulTextLocator= this.page.locator('#linkResponse');
  }
  async clickOnLinkPage() {
    homePage = new HomePage(this.page);
    basePage = new BasePage(this.page);
    await basePage.navigatetoBasePage();
    await homePage.clickOnElements();
    await this.linkPage.scrollIntoViewIfNeeded();
    await expect(this.linkPage).toBeEnabled();
    await this.linkPage.click();
    await expect(this.linkpageHeading).toBeVisible();
    await expect(this.newTabHeaidng).toBeVisible()
    await expect(this.apiHeading).toBeVisible()
    await expect(this.page).toHaveURL(`${url}links`);
  }
  async staticNewTab(){
    const promise= this.page.waitForEvent('popup');
    await expect(this.homeLInk).toBeEnabled()
    await this.homeLInk.click();
    const newTab= await promise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(`${url}`)
  }
  async dynamicNewTab(){
    const promise= this.page.waitForEvent('popup');
    await expect(this.dynamicLink).toBeEnabled()
    await this.dynamicLink.click();
    const newTab= await promise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(`${url}`)
    this.page.getByRole('link', {name:"No Content", exact:true})
  }
  async apiCall(){
    const api=[
        {name:"Created", code:"201", status:"Created"},
        {name:"No Content", code:"204", status:"No Content"},
        {name:"Moved", code:"301", status:"Moved Permanently"},
        {name:"Bad Request", code:"400", status:"Bad Request"},
        {name:"Unauthorized", code:"401", status:"Unauthorized"},
        {name:"Forbidden", code:"403", status:"Forbidden"},
        {name:"Not Found", code:"404", status:"Not Found"},
    ]
    for (const apilabel of api) {
      const apiNameLocaor= this.page.getByRole("link", { name: apilabel.name, exact: true });
      await expect(apiNameLocaor).toBeEnabled();
      await apiNameLocaor.click();
      await this.resulTextLocator.scrollIntoViewIfNeeded();
      await expect(this.resulTextLocator.getByText(apilabel.code)).toBeVisible();
      await expect(this.resulTextLocator.getByText(apilabel.status)).toBeVisible();
    } 
  }

}
