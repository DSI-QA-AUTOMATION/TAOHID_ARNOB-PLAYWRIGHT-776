import { Locator, Page, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { BasePage, url } from "./base/BasePage";
let homePage: HomePage;
let basePage: BasePage;

export class CheckBoxPage {
  private page: Page;
  checkBox: Locator;
  checkBoxHeading: Locator;
  resultSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkBox = page.getByText("Check Box");
    this.checkBoxHeading = page.getByRole("heading", { name: "Check Box" });
    this.resultSection = page.locator("#result");
  }

  private getLocatorcheckBox(name: string) {
    const root = this.page.getByRole("treeitem", { name });
    return {
      root,
      checkbox: root.locator(".rc-tree-checkbox"),
    };
  }
  private getLocatorSwithcer(name: string) {
    const root = this.page.getByRole("treeitem", { name });
    return {
      root,
      switcher: root.locator(".rc-tree-switcher"),
    };
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

  async clickonSwitch(name: string) {
    const parent = this.getLocatorSwithcer(name);
    await parent.switcher.click();
  }
  async clickonCheck(name: string) {
    const parent = this.getLocatorcheckBox(name);
    await parent.checkbox.check();
    await expect(parent.checkbox).toBeChecked();
    await expect(
      this.resultSection.locator(".text-success", {
        hasText: new RegExp(name, "i"),
      }),
    ).toBeVisible();
  }
  async clickonUnCheck(name: string) {
    const parent = this.getLocatorcheckBox(name);
    await parent.checkbox.uncheck();
    await expect(parent.checkbox).not.toBeChecked();
    await expect(
      this.resultSection.locator(".text-success", {
        hasText: new RegExp(name, "i"),
      }),
    ).not.toBeVisible();
  }
}
