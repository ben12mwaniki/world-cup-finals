const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_finals';

// Get the World Cup finals data from Wikipedia
//  and write it to a JSON file
async function getWorldCupFinals() {
  try {
    const finals = [];
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $('#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(17) > tbody > tr');
    
    listItems.each((index, element) => {
      
      if (index === 0) {
        return; // Skip the first iteration as it contains the table headers
      }
      const year = $(element).find('th').text();
      const winner = $(element).find('td:nth-child(2)').text();
      const score = $(element).find('td:nth-child(3)').text();
      const runnerUp = $(element).find('td:nth-child(4)').text();
      const venue = $(element).find('td:nth-child(5)').text();
      const location = $(element).find('td:nth-child(6)').text();
 
      finals.push({
        year,
        winner,
        score,
        runnerUp,
        venue,
        location
      });
    });
    
    fs.writeFile('finals.json', JSON.stringify(finals, null, 2), (err) => {
      if (err) throw err;
      console.log('Finals data has been written to finals.json');
    });

    return;
  } catch (error) {
    console.error(error);
  }
}

getWorldCupFinals();



