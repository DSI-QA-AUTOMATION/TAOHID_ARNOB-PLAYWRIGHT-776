import{test,Page} from '@playwright/test'
import { UploadDownload } from '../../pages/UploadDownloadPage';
let page:Page;
let uploadDownload: UploadDownload;

test.describe('7. Upload download ', ()=>{
    test.beforeAll(async({browser})=>{
        const context= await browser.newContext({
            acceptDownloads:true
        })
        page= await context.newPage()
        uploadDownload= new UploadDownload(page)

    })
    test.afterAll(async()=>{
        await page.close()
    })
    test('7.1 Upload download ', async()=>{
        await uploadDownload.clickOnUploadDonwnload()
        await uploadDownload.downloadAction()

    })
})