import { expect, Locator, Page } from "@playwright/test";
import { Elements } from "../utils/waitHelpers";
import formData from "../test-data/formData.json";

export class practiceFormPage {
  private page: Page;
  practiceformLocator: Locator;
  practiceformHeading: Locator;
  studentformHeading: Locator;
  dayPickerLoator: Locator;
  monthPickerLocator: Locator;
  yearPickerLocator: Locator;
  gender: Locator;
  modal: Locator;
  modalTable: Locator;
  modalHeading: Locator;
  submitButton: Locator;
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
    this.dayPickerLoator = page.getByText("24", { exact: true });
    this.monthPickerLocator = page.locator(".react-datepicker__month-select");
    this.yearPickerLocator = page.locator(".react-datepicker__year-select");
    this.gender = page.getByRole("radio", { name: "Male", exact: true });
    this.modal = page.locator(".modal-content");
    this.modalTable = this.modal.locator("table");
    this.modalHeading = this.modal.getByText("Thanks for submitting the form", {
      exact: true,
    });
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }
  IdbasedLocator(name: string): Locator {
    return this.page.locator(`#${name}`);
  }
  async clickOnPracticeForm() {
    let elements: Elements;
    elements = new Elements(this.page);
    await elements.formClicker();
    await this.page.waitForLoadState();
    await expect(this.practiceformLocator).toBeEnabled();
    await this.practiceformLocator.click();
    await expect(this.page).toHaveURL(/.*automation-practice-form/);
  }
  async datePicker() {
    await this.yearPickerLocator.click();
    await this.yearPickerLocator.selectOption("1950");
    await this.monthPickerLocator.click();
    await this.monthPickerLocator.selectOption("March");
    await this.dayPickerLoator.click();
  }
  async userForm() {
    const data = formData[0].PracticeForm;
    await expect(this.practiceformHeading).toBeVisible();
    await expect(this.studentformHeading).toBeVisible();
    await this.IdbasedLocator("firstName").fill(data.firstName);
    await this.IdbasedLocator("lastName").fill(data.lastName);
    await this.IdbasedLocator("userEmail").fill(data.email);
    await this.gender.check();
    await expect(this.gender).toBeChecked();
    await this.IdbasedLocator("dateOfBirthInput").click();
    await this.datePicker();
    const hobbies = ["Sports", "Reading", "Music"];
    for (const hobby of hobbies) {
      await this.page.getByRole("checkbox", { name: hobby }).check();
    }
    await this.IdbasedLocator("userNumber").fill(data.phoneNumber.toString());
    // await this.submitButton.scrollIntoViewIfNeeded();
    // await this.submitButton.click({ force: true });
    // await expect(this.page.locator(".modal-content")).toBeVisible();
    await this.submitButton.click();
  }
  async verifyRow(label: string, expectedValue: string) {
    const row = this.modalTable.locator("tr", { hasText: label });
    await expect(row.locator("td").nth(1)).toHaveText(expectedValue);
  }
  async varifyModalContent() {
    const data = formData[0].PracticeForm;

    await expect(this.modal).toBeVisible();
    await expect(this.modalHeading).toBeVisible()

    await this.verifyRow("Student Name", `${data.firstName} ${data.lastName}`);

    await this.verifyRow("Student Email", data.email);

    await this.verifyRow("Gender", "Male");

    await this.verifyRow("Mobile", data.phoneNumber.toString());

    await this.verifyRow("Hobbies", "Sports, Reading, Music");
  }
}
