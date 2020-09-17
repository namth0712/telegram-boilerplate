import cheerio from 'cheerio';
import { Country } from '../interfaces/Country';
import { getStorage, setStorage } from '../../../storage';
import { fetchRequest } from '../../../utils';

const statsUrl = 'https://www.worldometers.info/coronavirus/';

export default async (limit = 0): Promise<Array<Country>> => {
  let cacheData = getStorage('storageObj.corona.countries');
  if (cacheData) {
    const updateOffset = 60 * 60 * 1000; // 1h
    if (cacheData.lastUpdate > Date.now() - updateOffset) {
      return limit ? cacheData.data.slice(0, limit) : cacheData.data;
    }
  } else {
    cacheData = {};
  }

  try {
    const response = await fetchRequest({
      method: 'GET',
      url: statsUrl,
    });

    const regex = /(<table id="main_table_countries_today"(.*)<\/table>)/gms;
    const res = response.match(regex);
    const $ = cheerio.load(res[0]);

    const countries: Array<Country> = [];

    const tbody = $('tbody');
    let countryIndex = 0;
    $(tbody[0])
      .find('tr')
      .each((index, element) => {
        const trEl = $(element);
        if (trEl.hasClass('total_row_world')) {
          return;
        }
        const listTds = trEl.find('td');
        const countryName = $(listTds[1]).find('a').length
          ? $(listTds[1]).find('a').text().trim()
          : $(listTds[1]).text().trim();
        if (countryName === 'World') {
          return;
        }

        countryIndex += 1;
        const country = {
          index: countryIndex,
          name: countryName,
          total: parseInt($(listTds[2]).text().replace(/\D/g, '')) || 0,
          newCase: parseInt($(listTds[3]).text().replace(/\D/g, '')) || 0,
          totalDeath: parseInt($(listTds[4]).text().replace(/\D/g, '')) || 0,
          newDeath: parseInt($(listTds[5]).text().replace(/\D/g, '')) || 0,
          recovered: parseInt($(listTds[6]).text().replace(/\D/g, '')) || 0,
          active: parseInt($(listTds[8]).text().replace(/\D/g, '')) || 0,
          totalTest: parseInt($(listTds[12]).text().replace(/\D/g, '')) || 0,
          totalPopulation:
            parseInt($(listTds[14]).text().replace(/\D/g, '')) || 0,
        };
        countries.push(country);
      });

    cacheData.lastUpdate = Date.now();
    cacheData.data = countries;
    setStorage('storageObj.corona.countries', cacheData);

    return limit ? countries.slice(0, limit) : countries;
  } catch (error) {
    return [];
  }
};
