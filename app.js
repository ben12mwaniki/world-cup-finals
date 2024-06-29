const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const url = 'https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_finals';

async function getWorldCupFinals() {
  try {
    const finals = [];
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $('#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(17) > tbody > tr');
    
    
    return finals;
  } catch (error) {
    console.error(error);
  }
}

getWorldCupFinals();

//#mw-content-text > div.mw-content-ltr.mw-parser-output > table:nth-child(17) > tbody > tr:nth-child(1) > th > a


