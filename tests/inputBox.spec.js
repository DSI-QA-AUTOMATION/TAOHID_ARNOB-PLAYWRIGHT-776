const {test, expect} =require('@playwright/test')
test('Input Box for DEMOQA website', async({page})=>{
    await page.goto("https://demoqa.com/text-box")
    await page.pause()
    //chaining locator
    await page.locator('//div[@class="col-md-9 col-sm-12"]//input[@id="userName"]').fill("taohid khan")
    //using id
    await page.click('[id="userEmail"]').fill("taohid@gmail.com")

    //same tag with multiple attribut-Xpath

    await page.locator('//textarea[@class="form-control" and @id="currentAddress"]').fill("Dhaka, Bangladesh")
    await page.locator('//textarea[@class="form-control" and @id="permanentAddress"]').fill("Tangail")

    await page.getByRole('button', {name:'Submit'}).click()

    




} )

//<div class="col-md-9 col-sm-12"><input autocomplete="off" placeholder="Full Name" type="text" id="userName" class=" mr-sm-2 form-control"></div>