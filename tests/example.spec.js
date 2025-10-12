const {test,expect} = require('@playwright/test')

 test('Locator & Selector  ', async({page})=>{

   await page.goto("https://www.saucedemo.com/v1/")
//    await expect(page).toHaveTitle("Google")
    await page.pause()
//    await page.click('id=user-name')
   await page.locator('id=user-name').fill('taohid')
   
   

 })