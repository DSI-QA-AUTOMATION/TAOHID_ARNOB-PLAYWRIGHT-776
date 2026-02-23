import{expect,Locator,Page} from '@playwright/test'
import { Elements } from '../utils/waitHelpers';
import { table } from 'node:console';
export class WebTablesPage {
    private page:Page;
    webTableLocator:Locator;
    table:Locator;
    row:Locator;
    constructor(page:Page){
        this.page=page;
        this.webTableLocator= page.getByText('Web Table')
        this.table=page.locator('.table')
        this.row= this.table.getByRole('row');
    }
    async clickOnWebTable(){
        let elements:Elements;
        elements= new Elements(this.page)
        await elements.elementClicker()
        await this.page.waitForLoadState()
        await expect(this.webTableLocator).toBeEnabled()
        await this.webTableLocator.click()
        await expect(this.page).toHaveURL(/.*webtables/); 
        const rowCount= await this.row.count();
        for(let i=0;i<rowCount; i++){
            const cell= await this.row.nth(i).locator('td')
            console.log(await cell.nth(1).innerText())
            console.log(await cell.nth(2).innerText())
            console.log(await cell.nth(3).innerText())
            console.log(await cell.nth(4).innerText())
           
        }
    }

  

}