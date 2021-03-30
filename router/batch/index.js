const daumStockService = require('../../service/daumStockService');
const fnguideService = require('../../service/fnguideService');
const elasticService = require('../../service/elasticsearch');

function batch(app){
    app.get('/updateStockPrice', async (req, res) => {
        console.log('fetch stock price');
        // request.get('http://comp.fnguide.com/SVO2/json/data/01_06/01_A005930_A_D.json', (err, resp, body) => {
        //     console.log(resp)
        //     console.log(body);
        // })
        let market = req.query.market || 'KOSPI';
        let body = await daumStockService.getAllStockPrice(market);
        elasticService.upsert(body);
        res.send(`update ${market || 'KOSPI'} Stock Price complete!`);
    })
    
    app.get('/updateCompanyConsensus/yearly', async (req, res) => {
        console.log('fetch Company Consensus');
    
        let interval = req.query.interval;
        fnguideService.upsertCompanyYearlyConsensusWithCallingInterval(interval);
    
        res.send(`Stack All company's consensus.`);
    });
    
    app.get('/updateCompanyConsensus/qaurterly', async (req, res) => {
        console.log('fetch Company Consensus');
    
        let interval = req.query.interval;
        fnguideService.upsertCompanyQaurterlyConsensusWithCallingInterval(interval);
    
        res.send(`Stack All company's consensus.`);
    });
}

module.exports = batch;
