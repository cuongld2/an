import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly firstResult: Locator;
  readonly tenDaysTab: Locator;
  readonly languageSelection: Locator;
  readonly degreesCButton: Locator;



  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByTestId("searchModalInputBox");
    this.firstResult = page.getByRole("alert").getByRole("listbox").getByTestId("ctaButton").first();
    this.tenDaysTab = page.locator('a[href*="/weather/tenday/l"][class*="ListItem"] > span');
    this.languageSelection = page.getByTestId('languageSelectorSection');
    this.degreesCButton = page.getByTestId('degreesCbutton');
  }

  async goto() {
    await this.page.goto('https://weather.com/');
  }

  async searchWeatherByCityName(cityName: string) {
  await this.searchBox.fill(cityName);
  await this.firstResult.click();
  await this.tenDaysTab.click();
  }

  async changeToCelsius(){

    await this.languageSelection.click();
    await this.degreesCButton.click();
  }

}