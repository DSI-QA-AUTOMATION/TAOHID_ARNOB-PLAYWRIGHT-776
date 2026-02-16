import { Locator, Page, expect } from "@playwright/test";
import user from "../test-data/users.json";

export class utils {
  private page: Page;
  fullNameInput: Locator;
  emailInput: Locator;
  currentAddressInput: Locator; 
  permanentAddressInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.getByPlaceholder("Full Name");
    this.emailInput = page.getByPlaceholder("name@example.com");
    this.currentAddressInput = page.getByPlaceholder("Current Address");
    this.permanentAddressInput = page.locator("#permanentAddress");
  }
  async textBoxHelper(index: number) {
    await this.fullNameInput.fill(user[index].name);
    await this.emailInput.fill(user[index].email);
    await this.currentAddressInput.fill(user[index].currrentAdress);
    await this.permanentAddressInput.fill(user[index].permanentAddress);
    await this.page.getByRole("button", { name: "Submit" }).click();
    await expect(this.page.getByText(`Name:${user[index].name}`)).toBeVisible();
    await expect(this.page.getByText(`Email:${user[index].email}`)).toBeVisible();
    await expect(this.page.getByText(`Current Address :${user[index].currrentAdress}`)).toBeVisible();
    await expect(this.page.getByText(`Permananet Address :${user[index].permanentAddress}`)).toBeVisible();
  } 
  
   
}
