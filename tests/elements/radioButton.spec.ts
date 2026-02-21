import{Page, test} from '@playwright/test';
import { RadioButton } from '../../pages/RadioButtonPage';
let radioButton:RadioButton;
let page:Page;

test.describe('5. RadioButton', ()=>{
    test.beforeAll(async({browser})=>{
        const context= await browser.newContext()
        page= await context.newPage()
        radioButton= new RadioButton(page)
        await radioButton.clickOnRadioButton()
    })
    test.afterAll(async()=>{
        await page.close();
    })

    test('5.1 RadioButton Funcionality ', async()=>{

        await radioButton.radioButtonFunctionality()
    })
})