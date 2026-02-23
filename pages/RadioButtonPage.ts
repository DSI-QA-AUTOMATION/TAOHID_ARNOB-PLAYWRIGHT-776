import{Page, expect, Locator} from '@playwright/test'
import { HomePage } from './HomePage';
import { BasePage,url } from './base/BasePage';
let homePage:HomePage;
let basePage:BasePage; 

export class RadioButton{
    private page:Page;
    radiobuttonLocator:Locator;
    radioButtonHeading:Locator;
    yesButton:Locator;
    impressiveButton:Locator;
    noButton:Locator;
    resultText:Locator;
    constructor(page:Page){
        this.page=page;
        this.radiobuttonLocator=page.getByText("Radio Button");
        this.radioButtonHeading= this.page.getByRole('heading',{name:"Radio Button", exact: true})
        this.yesButton= this.page.getByRole('radio',{name:'Yes', exact:true})
        this.impressiveButton= this.page.getByRole('radio',{name:'Impressive', exact:true})
        this.noButton= this.page.getByRole('radio',{name:'No', exact:true})
        this.resultText= this.page.locator('.mt-3')
    }
    async clickOnRadioButton(){
     
        homePage= new HomePage(this.page)
        basePage= new BasePage(this.page)
        await basePage.navigatetoBasePage()
        await homePage.clickOnElements();
        await this.radiobuttonLocator.scrollIntoViewIfNeeded();
        await expect(this.radiobuttonLocator).toBeEnabled();
        await this.radiobuttonLocator.click();
        await expect(this.radioButtonHeading).toBeVisible(); 
    }
    async radioButtonFunctionality(){
        await expect(this.page.getByText('Do you like the site?')).toBeVisible()
        await this.yesButton.check()
        await expect(this.resultText.getByText('Yes',{exact:true})).toBeVisible()
        await expect(this.yesButton).toBeChecked()

        //impressive button
        await this.impressiveButton.check()
        await expect(this.resultText.getByText('Impressive',{exact:true})).toBeVisible()
        await expect(this.impressiveButton).toBeChecked()

        //no button
        await expect(this.noButton).toBeDisabled()
        await expect(this.yesButton).not.toBeChecked()


    }




}