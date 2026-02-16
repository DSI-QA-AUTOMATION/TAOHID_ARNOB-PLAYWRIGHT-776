import { Locator, Page, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { BasePage, url } from "./base/BasePage";
let homePage: HomePage;
let basePage: BasePage;

export class ButtonsPage {
  private page: Page;
  buttons: Locator; 
  buttonHeading: Locator;
  doubleClickBtn: Locator;
  rightClickBtn: Locator;
  clickMeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttons = page.getByText("Buttons");
    this.buttonHeading = page.getByRole("heading", { name: "Buttons" });
    this.doubleClickBtn = page.getByRole("button", { name: "Double Click Me" });
    this.rightClickBtn = page.getByRole("button", { name: "Right Click Me" });
    this.clickMeBtn = page.getByRole("button", { name: "Click Me", exact: true });
    
  }
  async clickOnButtons() {
    homePage = new HomePage(this.page);
    basePage = new BasePage(this.page);
    await basePage.navigatetoBasePage();
    await homePage.clickOnElements();
    await this.buttons.scrollIntoViewIfNeeded();
    await this.buttons.click();
    await expect(this.page).toHaveURL(`${url}buttons`);
    await expect(this.buttonHeading).toBeVisible();
    
  }
  async doubleClick() {
    await this.doubleClickBtn.dblclick();
    await expect(this.page.getByText("You have done a double click")).toBeVisible();

  }
  async rightClick() {
    await this.rightClickBtn.click({button: "right"});
    await expect(this.page.getByText("You have done a right click")).toBeVisible();

  }
  async clickMe() {
    await this.clickMeBtn.click();
    await expect(this.page.getByText("You have done a dynamic click")).toBeVisible();
  }
  async varifyButtons() {
    await this.clickOnButtons();
    await this.doubleClick();
    await this.rightClick();
    await this.clickMe();
  }
  async noButtonClickScenario() {
    await this.clickOnButtons();
    await expect(this.page.getByText("You have done a double click")).not.toBeVisible();
    await expect(this.page.getByText("You have done a right click")).not.toBeVisible();
    await expect(this.page.getByText("You have done a dynamic click")).not.toBeVisible();}
  
}
