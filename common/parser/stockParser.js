const { OPERATING_INCOME_LOSS } = require('../constant');
const constatns = require('../constant');

const stockParser = {
    parseAllStock : function(data){
        console.log(`start parse All Stock`);
        let bulkBody = [], stockMap = {};

        for(const group of data){
            let { accTradePrice, accTradeVolume, includedStocks, sectorName, market,
                sectorCode, date, changeRate, change} = group;
            
            if(change === 'FALL') changeRate *= -1;
            bulkBody.push({
                category: 'sector',
                id:`${sectorCode}`,
                market,
                sectorName,
                sectorCode, 
                changeRate,
                accTradePrice,
                accTradeVolume,
                date,
            })

            let parsedData = includedStocks.map( (stock) => {
                let { accTradePrice, accTradeVolume, change, changePrice, changeRate, marketCap,
                code, foreignRatio, name, symbolCode, tradePrice} = stock;
                
                if(change === 'FALL') {
                    changeRate *= -1;
                    changePrice *= -1;
                }
                if(stockMap[symbolCode]) {
                    if(stockMap[symbolCode].sectorName && !stockMap[symbolCode].sectorName.includes(sectorName))
                        stockMap[symbolCode].sectorName += `, ${sectorName}`;
                }else{
                    stockMap[symbolCode] = {
                        category: 'stock',
                        id: `symbolCode`,
                        market,
                        sectorName,
                        sectorCode,
                        companyName: name,
                        companyCode: symbolCode,
                        price: tradePrice,
                        numOfStocks: marketCap/tradePrice,
                        changePrice,
                        changeRate,
                        marketCap,
                        enterpriseCode : code,
                        accTradePrice,
                        accTradeVolume,
                        foreignRatio,
                        date
                    };
                }
                return stockMap[symbolCode];
            });
            bulkBody = bulkBody.concat(parsedData);
        }
        console.log(`finish parse All Stock`);
        return bulkBody;
    },

    
}

module.exports = stockParser;