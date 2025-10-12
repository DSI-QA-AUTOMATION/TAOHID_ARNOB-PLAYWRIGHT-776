const {test, expect} =require('@playwright/test')

test('Locators: css selector, xpath, class id etc. ', async({page})=>{

    //id, class 
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.pause()
    await page.click('[name="username"]')

    //Xpath
    await page.locator('//input[@placeholder="Username"]').fill("taohid")
    await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input[@placeholder="Username"]').fill("Admin")

    await page.locator('//input[@class="oxd-input oxd-input--active" and @type="password"]').fill('null')
    await page.locator('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click()//css selector

    //Text

    await page.locator('//input[@class="oxd-input oxd-input--active" and @type="password"]').fill('admin123')
    await page.getByRole("button",{name:'Login'}).click()





})