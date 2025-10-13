const { test, expect } = require('@playwright/test');

test('Radio button for DEMOQA website', async ({ page }) => {
  await page.goto("https://demoqa.com/radio-button");
  await page.pause()

  
  await page.locator('//label[@for="yesRadio"]').click();
  await page.locator('//label[@for="impressiveRadio"]').click();


});
