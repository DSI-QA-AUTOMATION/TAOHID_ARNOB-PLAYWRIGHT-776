
 const {hello} =require('./Codegen Rcorder/codegen2recoder.spec');



 const {test,expect} = require('@playwright/test')

 test('My first test into playwright: ', async({page})=>{

   await page.goto("https://www.google.com/")
   await expect(page).toHaveTitle("Google")
   

 })