const axios = require('axios');
const cheerio = require('cheerio');



// const url = 'https://www.findbook.ru/search/d1?title=&authors=&isbn=5-85476-011-8&publisher=&s=1';

// const url = 'https://www.findbook.ru/search/d1?isbn=5-85541-004-8';
const url = 'https://www.findbook.ru/search/d1?isbn=5-7415-0231-8';

axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'binary' })
    .then(response => {
    // const $ = cheerio.load(response.data);


    const iconv = require('iconv-lite');
    const html = iconv.decode(response.data, 'windows-1251');
    const $ = cheerio.load(html);

    const bookInfo = [];

    $('div.results__book').each((index, element) => {
        const title = $(element).find('h4.results__title').text().trim(); // b.results__title-name
        // const author = $(element).find('h4.results__title').text().trim();
        //   const publisher = $(element).find('span.publisher').text().trim();
        //   const year = $(element).find('span.year').text().trim();
        //   const price = $(element).find('span.price').text().trim();

      bookInfo.push({
        title,
        // author,
        // publisher,
        // year,
        // price
      });
    });

    if (bookInfo.length === 0) {
        console.log('Ничего не найдено');
      } else {
    console.log(bookInfo);
      }
  })
  .catch(error => console.error(error));
