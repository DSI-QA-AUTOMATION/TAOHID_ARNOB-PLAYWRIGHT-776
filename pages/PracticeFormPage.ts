import { expect, Locator, Page } from "@playwright/test";
import { Elements } from "../utils/waitHelpers";
import formData from '../test-data/formData.json'

export class practiceFormPage {
  private page: Page;
  practiceformLocator: Locator;
  practiceformHeading: Locator;
  studentformHeading: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.practiceformLocator = page.getByText("Practice Form");
    this.practiceformHeading = page.getByRole("heading", {
      name: "Practice Form",
      exact: true,
    });
    this.studentformHeading = page.getByRole("heading", {
      name: "Student Registration Form",
      exact: true,
    });
  }
  IdbasedLocator(name: string):Locator {
    return this.page.locator(`#${name}`);
  }
  async clickOnPracticeForm() {
    let elements: Elements;
    elements = new Elements(this.page);
    await elements.formClicker()
    await this.page.waitForLoadState();
    await expect(this.practiceformLocator).toBeEnabled();
    await this.practiceformLocator.click();
    await expect(this.page).toHaveURL(/.*automation-practice-form/);
  }
  async userForm(){
    const data=formData[0].PracticeForm;
    await expect(this.practiceformHeading).toBeVisible()
    await expect(this.studentformHeading).toBeVisible()
    await  this.IdbasedLocator('firstName').fill(data.firstName)
    await this.IdbasedLocator('lastName').fill(data.lastName);
     await this.IdbasedLocator('userNumber').fill(data.phoneNumber.toString())
    await this.IdbasedLocator('dateOfBirthInput').fill(data.DateOfBirht)
    await this.page.getByRole('button',{name:'Submit'}).click();



  }
}
