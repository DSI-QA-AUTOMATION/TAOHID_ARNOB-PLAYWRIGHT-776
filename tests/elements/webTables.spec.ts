import{test,Page} from '@playwright/test'
import { WebTablesPage } from '../../pages/WebTablesPage'
let page:Page;
let webtablepage: WebTablesPage;

test.describe('8. WebTable ', ()=>{
    test.beforeAll(async({browser})=>{
        const context= await browser.newContext()
        page= await context.newPage()
        webtablepage= new WebTablesPage(page)

    })
    test.afterAll(async()=>{
        await page.close()
    })
      test('8.3 Add User', async()=>{
        await webtablepage.clickOnWebTable()
        await webtablepage.userAdd();
        await webtablepage.varifywebTableContent()
        
    })
    // test('8.1 WebTable: ', async()=>{
    //     await webtablepage.clickOnWebTable()
        
        

    // })

    test('8.2 Search', async()=>{
        await webtablepage.varifySerachButton('10000')
        await webtablepage.varifySerachButton('Kierra')
    })
  
})