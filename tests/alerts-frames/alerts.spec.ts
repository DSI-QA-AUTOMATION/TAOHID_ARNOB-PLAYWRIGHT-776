import { test, expect, Page } from "@playwright/test";
let page: Page;
test.describe.serial("alert", () => {
  test.beforeEach(async ({ browser }) => {
    const context= await browser.newContext()
    page=await context.newPage()
    await page.goto("https://demoqa.com/");
    await page
      .getByRole("heading", { name: "Alerts, Frame & Windows", exact: true })
      .click();
    await page.getByText("Alerts",{exact:true}).click();
   
  });
   test.afterAll(async () => {
    await page.close(); 
  });
  test('Alert Window', async()=>{
    page.on('dialog',async(dialog)=>{
        expect(dialog.type()).toBe('alert')
        expect(dialog.message()).toBe('You clicked a button')
        await dialog.accept()
    });
    await page.locator("#alertButton").click()

  })
  test('Timer Alert Window', async()=>{

      const [dialog] =await Promise.all([
        page.waitForEvent("dialog"),
        page.locator("#timerAlertButton").click()
      ])
      expect(dialog.type()).toBe('alert')
      expect(dialog.message()).toBe('This alert appeared after 5 seconds')
      await dialog.accept();
   })
  test('Confirm Box', async()=>{
    page.on('dialog',async(dialog)=>{
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe('Do you confirm action?')
        await dialog.accept()
    });
    await page.locator("#confirmButton").click()
    await expect(page.getByText('You selected Ok')).toBeVisible()
    })
     test("Prompt Box - Enter Text", async () => {

    const inputText = "Taohid";

    page.on('dialog',async(dialog)=>{
        expect(dialog.type()).toBe('prompt')
        expect(dialog.message()).toBe('Please enter your name')
        await dialog.accept(inputText);
    });
    await page.locator("#promtButton").click()

    await expect(page.locator("#promptResult"))
      .toHaveText(`You entered ${inputText}`);
  });

})
