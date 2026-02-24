import{expect,Locator,Page} from '@playwright/test'
import { BasePage,url } from '../pages/base/BasePage'
import { HomePage}  from '../pages/HomePage';
let homePage: HomePage;
let basePage: BasePage;
export class Elements {
    private page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async elementClicker(){
        homePage=new HomePage(this.page)
        basePage=new BasePage(this.page)
        await basePage.navigatetoBasePage()
        await homePage.clickOnElements()
           
    }
    async formClicker(){
        homePage=new HomePage(this.page)
        basePage=new BasePage(this.page)
        await basePage.navigatetoBasePage()
        await homePage.clickOnForms()
        
    }
    async alertFrameClicker(){
        homePage=new HomePage(this.page)
        basePage=new BasePage(this.page)
        await basePage.navigatetoBasePage()
        await homePage.clickOnAlertFrameWindows()
        
    }
  

}