import { Page } from "@playwright/test";
import { ReportingApi ,LOG_LEVELS} from "@reportportal/agent-js-playwright";


export async function addScreenshot(page: Page, screenshotName: string):Promise<void>{
    const screenshot3 = await page.screenshot();
    const attachment3 = {
      name: screenshotName,
      type: 'image/jpg',
      content: screenshot3.toString('base64'),
    };
    ReportingApi.launchLog(LOG_LEVELS.ERROR, 'info log with attachment', attachment3);
    };