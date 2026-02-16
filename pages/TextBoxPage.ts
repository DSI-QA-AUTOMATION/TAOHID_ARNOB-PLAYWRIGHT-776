import { Locator, Page, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { BasePage, url } from "./base/BasePage";
import user from "../test-data/users.json"; 
import { utils } from "../utils/testUtils";
let homePage: HomePage;
let utilsObj: utils;
let basePage: BasePage;

export class textBoxPage {
    private page: Page;
    buttons: Locator;
    fullNameLabel: Locator; 
    emailLabel: Locator;
    currentAddressLabel: Locator;   
    permanentAddressLabel: Locator;
    fullNameInput: Locator
    emailInput: Locator;
    currentAddressInput: Locator;
    permanentAddressInput: Locator;
    submitBtn: Locator;


  constructor(page: Page) {
    this.page = page;
    this.buttons = page.getByText("Text Box");
    this.fullNameLabel=page.getByText("Full Name");
    this.emailLabel=page.getByText("Email");
    this.currentAddressLabel=page.getByText("Current Address");
    this.permanentAddressLabel=page.getByText("Permanent Address");
    this.fullNameInput=page.getByPlaceholder("Full Name");
    this.emailInput=page.getByPlaceholder("name@example.com");
    this.currentAddressInput=page.getByPlaceholder("Current Address");
    this.permanentAddressInput=page.locator("#permanentAddress");   
    this.submitBtn=page.getByRole("button", { name: "Submit" });
    utilsObj = new utils(this.page);
    
  }
  async clickTextBox() {
    homePage = new HomePage(this.page);
    basePage = new BasePage(this.page);
    await basePage.navigatetoBasePage();
    await homePage.clickOnElements();
    await this.buttons.scrollIntoViewIfNeeded();
    await this.buttons.click();
    await expect(this.page).toHaveURL(`${url}text-box`);
  
    
  }
  async labelCheckForTexBox() {
    
    await this.clickTextBox() 
    await expect(this.page.getByRole("heading", { name: "Text Box" })).toBeVisible();
    await expect(this.fullNameLabel).toBeVisible();
    await expect(this.emailLabel).toBeVisible();
    await expect(this.currentAddressLabel).toBeVisible();
    await expect(this.permanentAddressLabel).toBeVisible();
    await expect(this.page.getByRole("button", { name: "Submit" })).toBeEnabled();

  }

  async varifyBlankSubmission() { 
    await this.clickTextBox();
    await this.submitBtn.click();
    await expect(this.page.getByText("Name:")).not.toBeVisible();
    await expect(this.page.getByText("Email:")).not.toBeVisible();
    await expect(this.page.getByText("Current Address :")).not.toBeVisible();
    await expect(this.page.getByText("Permananet Address :")).not.toBeVisible();
  }
  async submitBox() {
    await this.clickTextBox();
    await utilsObj.textBoxHelper(0);// Call the helper function with the index of the user data you want to use
  }
  
  
  
}
