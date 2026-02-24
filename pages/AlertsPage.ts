import { expect, Locator, Page } from "@playwright/test";
import { Elements } from "../utils/waitHelpers";
export class AlertPage {
  private page: Page;
  AlertLocator: Locator;
  AlertHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.AlertLocator = page.getByText("Alerts", {exact:true});
    this.AlertHeading = page.getByRole("heading", {
      name: "Alerts",
      exact: true,
    });
  }
  async clickOnAlert() {
    let elements: Elements;
    elements = new Elements(this.page);
    await elements.alertFrameClicker();
    await this.page.waitForLoadState();
    await expect(this.AlertLocator).toBeEnabled();
    await this.AlertLocator.click();
    await expect(this.page).toHaveURL(/.*alerts/);
    await expect(this.AlertHeading).toBeVisible();
  }
  async Alert() {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe("You clicked a button");
      await dialog.accept();
    });
    await this.page.locator("#alertButton").click();
  }
  async timeAlert(){
     const [dialog] =await Promise.all([
            this.page.waitForEvent("dialog"),
            this.page.locator("#timerAlertButton").click()
          ])
          expect(dialog.type()).toBe('alert')
          expect(dialog.message()).toBe('This alert appeared after 5 seconds')
          await dialog.accept();
  }
  async confirm(){
    this.page.on("dialog", async (dialog) => {
          expect(dialog.type()).toBe("confirm");
          expect(dialog.message()).toBe("Do you confirm action?");
          await dialog.accept();
        });
        await this.page.locator("#confirmButton").click();
        await expect(this.page.getByText("You selected Ok")).toBeVisible();
  }
  async promt(){
    const inputText = "Taohid";

    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter your name");
      await dialog.accept(inputText);
    });
    await this.page.locator("#promtButton").click();

    await expect(this.page.locator("#promptResult")).toHaveText(
      `You entered ${inputText}`,
    );
  }

}
