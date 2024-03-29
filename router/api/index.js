const sectorService = require('../../service/sectorService');
const consensusService = require('../../service/consensusService');
const stockService = require('../../service/stockService');
const consensusParser = require('../../common/parser/consensusParser');
const stockParser = require('../../common/parser/stockParser');
const quarterlyReportService = require('../../service/quarterlyReportService');

function api(app){
    app.get('/sectors/all', async (req, res) => {
        console.log('get all sectors')
        let result = await sectorService.getAllSectors();
        res.send(result);
    });


    app.get('/consensus/lastFourQuater', async (req, res) => {
        console.log('get last four quater consesus');
        try {
            let quaterConsessus = await consensusService.getLastFourQuartersConsensusByStocks();
            res.send(consensusParser.parseQuarterToWholeYearConsensus(quaterConsessus))
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    })
    
    app.get('/stocks/recent', async (req, res) => {
        console.log('get recent stocks');
        let { sectorName } = req.query;
        res.send(await stockService.getRecentStocksBySectorName(sectorName));
    })

    app.post('/report/quarter', async (req, res) => {
        console.log('post report quarter');
        let { fileName, year, quarter } = req.body;
        res.send(await quarterlyReportService.addQuarterlyReport({ fileName, year, quarter }));
    })

    app.get('/report/quarter/company', async (req, res) => {
        console.log('get report quarter company');
        let {year, quarter, companyCode} = req.query;
        res.send(await quarterlyReportService.getQuarterlyReport({year, quarter, companyCode}));
    })

    app.get('/report/quarter/all', async (req, res) => {
        console.log('get report quarter all');
        let {year, quarter} = req.query;
        res.send(await quarterlyReportService.getAllCompaniesQuarterlyReports({year, quarter}));
    })
}

module.exports = api;
