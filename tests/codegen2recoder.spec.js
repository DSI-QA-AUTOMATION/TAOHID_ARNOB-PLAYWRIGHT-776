//Expert module example
//  exports.hello = function myFunction(){

//     return " Exporting module example: ";

//   }

// const {hello}= require('filename')
// console (hello())

//sauce demo authentication & add to cart using code gen

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
