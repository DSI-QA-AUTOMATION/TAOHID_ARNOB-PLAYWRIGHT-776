import { Page } from "@playwright/test";
export let url = "https://demoqa.com/";
export class BasePage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async navigatetoBasePage() {
    await this.page.goto(`${url}`);
  }

}
