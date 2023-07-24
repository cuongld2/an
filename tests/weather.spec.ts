import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { TenDaysPage } from '../pages/tendayspage';
import {convertFToC, convertStringToNumber} from '../utils/temperature';
import {createCsvFile} from '../utils/csv';


test('compare fahreint and celsius', async ({ page }) => {

  const cityName = "Singapore";
  const dataFile = "weather-of-cities.csv";
  const homepage = new HomePage(page);
  const tendayspage = new TenDaysPage(page);

  await homepage.goto();

  await homepage.changeTemperatureUnitToF();

  
  await homepage.searchWeatherByCityName(cityName);

  let weatherOfCities = await tendayspage.getFTemperatureAndHumidity(cityName);

  await homepage.changeToCelsius();

  await tendayspage.addCelsiusDegree(weatherOfCities);

  const writer = await createCsvFile(dataFile);

  await writer.writeRecords(weatherOfCities).then(() => {
    console.log('Done!');
  });

  weatherOfCities.forEach(async each => {

    if (each.temperatureFDay != null && each.temperatureCDay !=null){

      const temperatureFDay = await convertStringToNumber(each.temperatureFDay?.split("°")[0]);
      const temperatureCDay = await convertStringToNumber(each.temperatureCDay?.split("°")[0]);
      const convertedFToCDay = await convertFToC(temperatureFDay);
      expect(temperatureCDay).toBeLessThanOrEqual(convertedFToCDay+1);
      expect(temperatureCDay).toBeGreaterThanOrEqual(convertedFToCDay-1);
    }

    if (each.temperatureFNight != null && each.temperatureCNight !=null){

      const temperatureFNight = await convertStringToNumber(each.temperatureFNight?.split("°")[0]);
      const temperatureCNight = await convertStringToNumber(each.temperatureCNight?.split("°")[0]);
      const convertedFToCNight = await convertFToC(temperatureFNight);
  
      expect(temperatureCNight).toBeLessThanOrEqual(convertedFToCNight+1);
      expect(temperatureCNight).toBeGreaterThanOrEqual(convertedFToCNight-1);

    }


  })

});
