import { expect, type Locator, type Page } from '@playwright/test';
import { IWeather } from '../models/weather';

export class TenDaysPage {

    readonly page: Page;
    readonly expandedDetailsCard: Locator;
    readonly dailyContent: string;
    readonly temperatureValue: string;
    readonly percentageValue: string;
    readonly dateValue: string;
    readonly stateVisible: "visible" ;

    constructor(page: Page) {
        this.page = page;
        this.expandedDetailsCard = page.getByTestId('ExpandedDetailsCard');
        this.dailyContent = "DailyContent";
        this.temperatureValue = "TemperatureValue";
        this.percentageValue = "PercentageValue";
        this.dateValue = "h3 > span";
      }

    async getFTemperatureAndHumidity(cityName: string) : Promise<IWeather[]>{

        let weatherOfCities: IWeather[] = [];

        await this.expandedDetailsCard.first().waitFor({state: this.stateVisible});

        for (const each of await this.expandedDetailsCard.all()){
          
              let weatherCity: IWeather = {
                city:cityName,
                temperatureCDay:null,
                temperatureFDay:null,
                humidityDay:null,
                temperatureCNight:null,
                temperatureFNight:null,
                humidityNight:null,
                date:""
              };
          
              const dayPartsNumber = await each.getByTestId(this.dailyContent).all();
              if (dayPartsNumber.length ===1){
                 const nightInfoNode = dayPartsNumber[0];
                 const temperatureFNode =  nightInfoNode.getByTestId(this.temperatureValue);
                  const temperatureF = await temperatureFNode.textContent();
                  const humidity = await nightInfoNode.getByTestId(this.percentageValue).textContent();
                  const date = await nightInfoNode.locator(this.dateValue).textContent();
                  weatherCity.temperatureFNight = temperatureF;
                  weatherCity.humidityNight = humidity;
                  weatherCity.date=date;
              }else if(dayPartsNumber.length ===2){
                const dayInfoNode = dayPartsNumber[0];
                
                const nightInfoNode = dayPartsNumber[1];
          
                const temperatureFNight = await nightInfoNode.getByTestId(this.temperatureValue).textContent();
                const humidityNight = await nightInfoNode.getByTestId(this.percentageValue).textContent();
                weatherCity.temperatureFNight = temperatureFNight;
                weatherCity.humidityNight = humidityNight;
                const temperatureFDay = await dayInfoNode.getByTestId(this.temperatureValue).textContent();
                const humidityDay = await dayInfoNode.getByTestId(this.percentageValue).textContent();
                weatherCity.temperatureFDay = temperatureFDay;
                weatherCity.humidityDay = humidityDay;
                const date = await nightInfoNode.locator(this.dateValue).textContent();
                weatherCity.date=date;
              }
          
              weatherOfCities.push(weatherCity);
            }

            return weatherOfCities;

    }

    async addCelsiusDegree(weatherOfCities: IWeather[]){

        let i = 0;
        await this.expandedDetailsCard.first().waitFor({state: this.stateVisible});
        for (const each of await this.expandedDetailsCard.all()){
      
          const weatherCity = weatherOfCities[i];
        
            const dayPartsNumber = await each.getByTestId(this.dailyContent).all();
            if (dayPartsNumber.length ===1){
               const nightInfoNode = dayPartsNumber[0];
               const temperatureCNode =  nightInfoNode.getByTestId(this.temperatureValue);
                const temperatureC = await temperatureCNode.textContent();
                weatherCity.temperatureCNight = temperatureC;
            }else if(dayPartsNumber.length ===2){
              const dayInfoNode = dayPartsNumber[0];
              
              const nightInfoNode = dayPartsNumber[1];
        
              const temperatureCNight = await nightInfoNode.getByTestId(this.temperatureValue).textContent();
              weatherCity.temperatureCNight = temperatureCNight;
              const temperatureCDay = await dayInfoNode.getByTestId(this.temperatureValue).textContent();
              weatherCity.temperatureCDay = temperatureCDay;
            }
            i+=1;
          }
    }
    
}