const dateUtil = require('../common/util/dateUtil');
const elasticsearchService = require('./elasticsearch');

const consensusService = {
  getLastFourQuartersConsensusByStocks: function(stocks){
        const _getQuarterCondition = () => {
          let condition = '';
          let lastFourQuarters = dateUtil.getLastFourQuatersWithFormat('YYYY/MM');
          let quarterCondition = 'id LIKE';
    
          for(let i=0; i<lastFourQuarters.length; i++) {
            condition += `${quarterCondition} '${lastFourQuarters[i]}%'`; 
            if(i < lastFourQuarters.length-1) condition += ' OR ';
          }
    
          return condition;
        }
        let query = `SELECT id, companyCode,
                            revenue, revenueComparedLastYear, revenueComparedConsensus,
                            operatingIncomeLoss, operatingIncomeLossComparedLastYear, operatingIncomeLossComparedConsensus,
                            profit, profitComparedLastYear, profitComparedConsensus,
                            asset, liabilities, equity, issuedCapital,
                            EPS, BPS, DPS, PER, PBR
                       FROM tbonestock
                      WHERE category = 'consensus'
                        AND (${_getQuarterCondition()})`;

        if(stocks && stocks.length > 0 ) query += `AND companyCode IN (${stocks.map(({companyCode}) => `'${companyCode}'`).toString()})`;
    
        console.log(query);
        return elasticsearchService.sqlQuery(query);
      }
}

module.exports = consensusService;