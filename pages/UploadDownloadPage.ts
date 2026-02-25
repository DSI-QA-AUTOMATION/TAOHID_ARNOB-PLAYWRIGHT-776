import{expect,Locator,Page} from '@playwright/test'
import { Elements } from '../utils/waitHelpers';
import { table } from 'node:console';
import path from 'node:path';
export class UploadDownload {
  private page: Page;
  uploadDownloadLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadDownloadLocator = page.getByText("Upload and Download");
  }
  async clickOnUploadDonwnload() {
    let elements: Elements;
    elements = new Elements(this.page);
    await elements.elementClicker();
    await this.page.waitForLoadState();
    await expect(this.uploadDownloadLocator).toBeEnabled();
    await this.uploadDownloadLocator.click();
    await expect(this.page).toHaveURL(/.*upload-download/);
  }
  async downloadAction() {
    
    const downloadPromise = this.page.waitForEvent("download");
    await this.page.getByText("Download", {exact:true}).click();
    const download = await downloadPromise;

  const filePath = path.join(
    process.cwd(),
    'test-data',
    download.suggestedFilename()
  );

  console.log('Saving to:', filePath);

  await download.saveAs(filePath);
  }
}