const elasticsearchService = require('./elasticsearch');
const dateUtil = require('../common/util/dateUtil');

const stockService = {
    getRecentStocksBySectorName : function(sectorName) {
        let query = `SELECT market,
                            sectorCode,
                            sectorName,
                            companyName,
                            companyCode,
                            price,
                            changePrice,
                            changeRate,
                            marketCap,
                            accTradePrice,
                            accTradeVolume,
                            foreignRatio,
                            numOfStocks,
                            date
                       FROM tbonestock
                      WHERE category = 'stock'
                        AND timestamp > '${dateUtil.getDateToQueryLastestStockWithFormat()}'
                        ${sectorName ? "AND sectorName LIKE '%"+sectorName+"%'" : "" }`;

        console.log(query);
        return elasticsearchService.sqlQuery(query);
    }
}

module.exports = stockService;