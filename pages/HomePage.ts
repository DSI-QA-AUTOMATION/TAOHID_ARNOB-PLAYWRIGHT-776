import { Locator, Page, expect } from "@playwright/test";
import { url, BasePage } from "./base/BasePage";
let basePage: BasePage;
export class HomePage {
  private page: Page;

  element: Locator;
  form: Locator;
  alertFrameWindows: Locator;
  interaction: Locator;
  widgets: Locator;
  bookStoreApplication: Locator;

  constructor(page: Page) {
    this.page = page;
    this.element = page.getByRole("heading", { name: "Elements" });
    this.form = page.getByRole("heading", { name: "Forms" });
    this.alertFrameWindows = page.getByRole("heading", {
      name: "Alerts, Frame & Windows",
    });
    this.interaction = page.getByRole("heading", { name: "Interactions" });
    this.widgets = page.getByRole("heading", { name: "Widgets" });
    this.bookStoreApplication = page.getByRole("heading", {
      name: "Book Store Application",
    });
    basePage = new BasePage(this.page);
  }
  async   clickOnElements() {
    await this.element.click();
    await expect(this.page).toHaveURL(`${url}elements`);
  }
  async clickOnForms() {
    await this.form.click();
    await expect(this.page).toHaveURL(`${url}forms`);
  }
  async clickOnAlertFrameWindows() {
    await this.alertFrameWindows.click();
    await expect(this.page).toHaveURL(`${url}alertsWindows`);
  }
  async clickOnWidgets() {
    await this.widgets.click();
    await expect(this.page).toHaveURL(`${url}widgets`);
  }
  async clickOnInteraction() {
    await this.interaction.click();
    await expect(this.page).toHaveURL(`${url}interaction`);
  }
  async clickOnBookStoreApplication() {
    await this.bookStoreApplication.click();
    await expect(this.page).toHaveURL(`${url}books`);
  }

  async varifyElements() {
    await basePage.navigatetoBasePage();
    await expect(this.element).toBeVisible();
    await this.clickOnElements();
  }
  async varifyForms() {
    await basePage.navigatetoBasePage();
    await expect(this.form).toBeVisible();
    await this.clickOnForms();
  }
  async varifyAlertFrameWindows() {
    await basePage.navigatetoBasePage();
    await expect(this.alertFrameWindows).toBeVisible();
    await this.clickOnAlertFrameWindows();
  }
  async varifyWidgets() {
    await basePage.navigatetoBasePage();
    await expect(this.widgets).toBeVisible();
    await this.clickOnWidgets();
  }
  async varifyInteraction() {
    await basePage.navigatetoBasePage();
    await expect(this.interaction).toBeVisible();
    await this.clickOnInteraction();
  }
  async varifyBookStoreApplication() {
    await basePage.navigatetoBasePage();
    await expect(this.bookStoreApplication).toBeVisible();
    await this.clickOnBookStoreApplication();
  }
}
