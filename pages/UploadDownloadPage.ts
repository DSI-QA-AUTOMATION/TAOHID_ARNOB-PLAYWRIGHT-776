import{expect,Locator,Page} from '@playwright/test'
import { Elements } from '../utils/waitHelpers';
import { table } from 'node:console';
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
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = this.page.waitForEvent("download");
    await this.page.getByText("Download").click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('../test-data'+ download.suggestedFilename());
  }
}