import { expect, Locator, Page } from "@playwright/test";
import { Elements } from "../utils/waitHelpers";
export class FramePage {
  private page: Page;
  frametLocator: Locator;
  frameHeading: Locator;
  frameHeadding1:Locator;
  frameHeadding2:Locator;

  constructor(page: Page) {
    this.page = page;
    this.frametLocator = page.getByText("Frames", {exact:true});
    this.frameHeading = page.getByRole("heading", {
      name: "Frames",
      exact: true,
    });
    this.frameHeadding1= this.page.frameLocator('#frame1').getByRole('heading', {name:"This is a sample page"});
    this.frameHeadding2= this.page.frameLocator('#frame2').getByRole('heading', {name:"This is a sample page"});
  }
  async clickOnFrame() {
    let elements: Elements;
    elements = new Elements(this.page);
    await elements.alertFrameClicker();
    await this.page.waitForLoadState();
    await expect(this.frametLocator).toBeEnabled();
    await this.frametLocator.click();
    await expect(this.page).toHaveURL(/.*frames/);
    await expect(this.frameHeading).toBeVisible();
  } 
 
 
}
