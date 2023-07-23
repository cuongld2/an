import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { TenDaysPage } from '../pages/tendayspage';
import {convertFToC, convertStringToNumber} from '../utils/temperature';
import {createCsvFile} from '../utils/csv';
import { addScreenshot } from '../utils/screenshot';




test('compare fahreint and celsius', async ({ page }) => {

  const cityName = "Singapore";
  const homepage = new HomePage(page);
  const tendayspage = new TenDaysPage(page);

  homepage.goto();
  homepage.searchWeatherByCityName(cityName);

  addScreenshot(page,'search by cityname');


  let weatherOfCities = await tendayspage.getFTemperatureAndHumidity(cityName);

  addScreenshot(page,'get Fahreint temperature and humidity');

  await homepage.changeToCelsius();

  await tendayspage.addCelsiusDegree(weatherOfCities);

  addScreenshot(page,'get Celsius temperature');

  const writer = await createCsvFile("weather-of-cities.cvs");

  writer.writeRecords(weatherOfCities).then(() => {
    console.log('Done!');
  });

  weatherOfCities.forEach(async each => {
    const temperatureFDay = await convertStringToNumber(each.temperatureFDay?.split("°")[0]);
    const temperatureCDay = await convertStringToNumber(each.temperatureCDay?.split("°")[0]);
    const convertedFToCDay = await convertFToC(temperatureFDay);

    const temperatureFNight = await convertStringToNumber(each.temperatureFNight?.split("°")[0]);
    const temperatureCNight = await convertStringToNumber(each.temperatureCNight?.split("°")[0]);
    const convertedFToCNight = await convertFToC(temperatureFNight);

    expect(temperatureCDay).toBeLessThanOrEqual(convertedFToCDay+1);
    expect(temperatureCDay).toBeGreaterThanOrEqual(convertedFToCDay-1);
    expect(temperatureCNight).toBeLessThanOrEqual(convertedFToCNight+1);
    expect(temperatureCNight).toBeGreaterThanOrEqual(convertedFToCNight-1);

  })

});
