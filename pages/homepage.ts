import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly firstResult: Locator;
  readonly tenDaysTab: Locator;
  readonly arrowButton: Locator;
  readonly arrowState: Locator;
  readonly degreesCButton: Locator;
  readonly degreesFButton: Locator;
  readonly unitDisplay: Locator



  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByTestId("searchModalInputBox");
    this.firstResult = page.getByRole("alert").getByRole("listbox").getByTestId("ctaButton").first();
    this.tenDaysTab = page.locator('a[href*="/weather/tenday/l"][class*="ListItem"] > span');
    this.arrowButton = page.locator('div[class*="LanguageSelector"] > svg[name="triangle-down"][data-testid="Icon"]');
    this.arrowState = page.getByTestId('languageSelectorSection').getByTestId('ctaButton');
    this.degreesCButton = page.locator('section[data-testid="unitSelectorSection"]').locator('li[data-testid="degreesCbutton"]');
    this.degreesFButton = page.locator('section[data-testid="unitSelectorSection"]').locator('li[data-testid="degreesFbutton"]');
    this.unitDisplay = page.locator('span[class*="LanguageSelector--unitDisplay"]');
  }

  async goto() {
    await this.page.goto('https://weather.com');
  }

  async searchWeatherByCityName(cityName: string) {
  await this.searchBox.fill(cityName);
  await this.firstResult.click();
  await this.tenDaysTab.click();
  }

  async changeTemperatureUnitToF(){

    const currentUnitType = await this.unitDisplay.textContent();
    if (currentUnitType?.includes("C")){
      await this.changeToFahreint();
    }
  }

  async changeToCelsius(){

    while (await this.arrowState.getAttribute('aria-expanded') == "false"){
      await this.arrowButton.click();
    }
    await this.degreesCButton.click();
  }

  async changeToFahreint(){

    while (await this.arrowState.getAttribute('aria-expanded') == "false"){
      await this.arrowButton.click();
    }
    await this.degreesFButton.click();
  }

}