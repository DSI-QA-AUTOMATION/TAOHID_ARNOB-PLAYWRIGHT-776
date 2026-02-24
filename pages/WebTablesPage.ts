import{expect,Locator,Page} from '@playwright/test'
import { Elements } from '../utils/waitHelpers';
import { WebTableData } from '../test-data/webTable';
import { table } from 'node:console';
export class WebTablesPage {
    private page:Page;
    webTableLocator:Locator;
    table:Locator;
    row:Locator;
    searchBox:Locator;
    addButton:Locator;
    submitButton:Locator;
    constructor(page:Page){
        this.page=page;
        this.webTableLocator= page.getByText('Web Table')
        this.table=page.locator('.table')
        this.row= this.page.locator('tbody tr, thead th')
        this.searchBox= page.getByRole('textbox', { name: 'Type to search' })
        this.addButton=page.getByRole('button', {name:'Add', exact:true})
        this.submitButton= page.getByRole('button',{name:'Submit', exact:true})
    }
    async clickOnWebTable(){
        let elements:Elements;
        elements= new Elements(this.page)
        await elements.elementClicker()
        await this.page.waitForLoadState()
        await expect(this.webTableLocator).toBeEnabled()
        await this.webTableLocator.click()
        await expect(this.page).toHaveURL(/.*webtables/); 
        
    }
    async userAdd(){
        await expect(this.addButton).toBeEnabled()
        await this.addButton.click();
        await expect(this.page.getByText('Registration Form')).toBeVisible()
        const formLocator=['firstName', 'lastName', 'userEmail','age', 'salary', 'department' ]
       
            await this.page.locator(`#${formLocator[0]}`).fill(WebTableData.row[3].firstName)
            await this.page.locator(`#${formLocator[1]}`).fill(WebTableData.row[3].lastName)
            await this.page.locator(`#${formLocator[2]}`).fill(WebTableData.row[3].email)
            await this.page.locator(`#${formLocator[3]}`).fill(WebTableData.row[3].age.toString())
            await this.page.locator(`#${formLocator[4]}`).fill(WebTableData.row[3].salary.toString())
            await this.page.locator(`#${formLocator[5]}`).fill(WebTableData.row[3].department)


        
        await this.submitButton.click();


    }

    
    async varifywebTableContent(){
        const tableHeader= this.page.locator('thead th');
        for(let i=0;i<WebTableData.headers.length;i++){
            await expect(tableHeader.nth(i)).toHaveText(WebTableData.headers[i]);
        }
        const tableRow=this.page.locator('tbody tr')
        for(let i=0;i<WebTableData.row.length;i++){
            const cell=tableRow.nth(i).locator('td');
            const expectedrow= WebTableData.row[i];
            await expect(cell.nth(0)).toHaveText(expectedrow.firstName)
            await expect(cell.nth(1)).toHaveText(expectedrow.lastName)
            await expect(cell.nth(2)).toHaveText(expectedrow.age.toString())
            await expect(cell.nth(3)).toHaveText(expectedrow.email)
            await expect(cell.nth(4)).toHaveText(expectedrow.salary.toString())
            await expect(cell.nth(5)).toHaveText(expectedrow.department)
            await expect(this.page.locator(`#${expectedrow.editID}`)).toBeVisible()
            await expect(this.page.locator(`#${expectedrow.deleteId}`)).toBeVisible()


        }
        
    }
    async varifySerachButton(keyword:string){
         await this.searchBox.fill(keyword)
         await expect.soft(this.row.getByText(keyword, {exact:true})).toBeVisible();
    }
    
  

}