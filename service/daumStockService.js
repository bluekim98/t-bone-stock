const puppeteer = require('puppeteer');
const stockParser = require('../common/parser/stockParser');

var daumStockService = {
    getAllStockPrice : async function(market) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.goto(`https://finance.daum.net/domestic/all_stocks?market=${market}`);
        const response = await page.waitForResponse(res => {
            if(res.url().includes('finance.daum.net/api/quotes/sectors') && res.status() === 200){
                return res;
            }
        });
        const {data} = await response.json();

        return stockParser.parseAllStock(data);
    }
}

module.exports = daumStockService;