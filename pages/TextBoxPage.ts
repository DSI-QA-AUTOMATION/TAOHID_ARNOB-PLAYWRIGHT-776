import { Locator, Page, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { BasePage, url } from "./base/BasePage";
import user from "../test-data/users.json";
let homePage: HomePage;
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
  async submitBox() {
    await expect(this.fullNameLabel).toBeVisible();
    await expect(this.emailLabel).toBeVisible();
    await expect(this.currentAddressLabel).toBeVisible();
    await expect(this.permanentAddressLabel).toBeVisible();
    await this.fullNameInput.fill(user.name);       
    await this.emailInput.fill(user.email);
    await this.currentAddressInput.fill(user.currrentAdress);
    await this.permanentAddressInput.fill(user.permanentAddress);
    await this.submitBtn.click();
    await expect(this.page.getByText(`Name:${user.name}`)).toBeVisible();
    await expect(this.page.getByText(`Email:${user.email}`)).toBeVisible();
    await expect(this.page.getByText(`Current Address :${user.currrentAdress}`)).toBeVisible();
    await expect(this.page.getByText(`Permananet Address :${user.permanentAddress}`)).toBeVisible();

  

  }
  
}
