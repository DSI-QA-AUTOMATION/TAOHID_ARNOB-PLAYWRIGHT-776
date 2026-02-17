import { Locator, Page, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { BasePage, url } from "./base/BasePage";
let homePage: HomePage;
let basePage: BasePage;

export class CheckBoxPage {
  private page: Page;
  checkBox: Locator;
  checkBoxHeading: Locator;
  homeParent: Locator;
  homeSwitch: Locator;
  homeParent1: Locator;
  homeSwitch2: Locator;
  homecheckBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkBox = page.getByText("Check Box");
    this.checkBoxHeading = page.getByRole("heading", { name: "Check Box" });
    this.homeParent = page.getByRole("treeitem", { name: "Home" });
    this.homecheckBox = this.homeParent.locator(".rc-tree-checkbox");
    this.homeSwitch = this.homeParent.locator(".rc-tree-switcher");
    this.homeParent1 = page.getByTitle("Commands");
    this.homeSwitch2 = this.homeParent1.locator(".rc-tree-title");
  }
  async clickOnCheckBox() {
    homePage = new HomePage(this.page);
    basePage = new BasePage(this.page);
    await basePage.navigatetoBasePage();
    await homePage.clickOnElements();
    await this.checkBox.scrollIntoViewIfNeeded();
    await this.checkBox.click();
    await expect(this.page).toHaveURL(`${url}checkbox`);
    await expect(this.checkBoxHeading).toBeVisible();
  }
  async varifyCheckBox() {
    await this.clickOnCheckBox();
    await this.homeSwitch.click();
    await this.homecheckBox.click();
    await expect(this.page.getByText("Desktop")).toBeVisible();
  
    await expect(this.page.getByText("Desktop",{exact:true} )).toBeChecked();

    await expect(this.page.getByText("Desktop")).not.toBeChecked();
    await this.homeSwitch2.click();
    await expect(this.page.getByText("Commands")).toBeVisible();  
    
  }
}
