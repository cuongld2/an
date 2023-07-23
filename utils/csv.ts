import * as path from 'path';
import {createObjectCsvWriter} from 'csv-writer';
import { CsvWriter } from 'csv-writer/src/lib/csv-writer';
import { ObjectMap } from 'csv-writer/src/lib/lang/object';

export async function createCsvFile(csvFileName: string):Promise<CsvWriter<ObjectMap<any>>>{
    return createObjectCsvWriter({
        path: path.resolve(__dirname, csvFileName),
        header: [
          { id: 'city', title: 'City Name' },
          { id: 'date', title: 'Date' },
          { id: 'temperatureCDay', title: 'Temperature C Day' },
          { id: 'temperatureFDay', title: 'Temperature F Day' },
          { id: 'humidityDay', title: 'Humidity Day' },
          { id: 'temperatureCNight', title: 'Temperature C Night' },
          { id: 'temperatureFNight', title: 'Temperature F Night' },
          { id: 'humidityNight', title: 'Humidity Night' },
        ],
      });
    };