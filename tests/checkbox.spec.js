const { test, expect } = require('@playwright/test');

test('Check Angular checkbox', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');
  //await page.pause();
  //await page.locator("//div[@class='check-box-tree-wrapper'] //span[text()='Home']").check();

  await page.locator("(//button[@title='Toggle'])[1]").click()
  await page.locator("(//button[@title='Toggle'])[3]").click()
  await page.locator("(//button[@title='Toggle'])[4]").click()

  await page.locator('//div[@class="check-box-tree-wrapper"] //span[@class="rct-title" and text()="Angular"]').check()

  await expect(page.locator('//div[@class="check-box-tree-wrapper"] //span[@class="rct-title" and text()="Angular"]')).toBeChecked()

  
  await page.waitForTimeout(3000)

 //div[@class='check-box-tree-wrapper']//span[text()='Home']
});

