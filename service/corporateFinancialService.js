const elasticSearchService = require('./elasticsearch');
const quarterlyReportService = require('./quarterlyReportService');
const dateUtil = require('../common/util/dateUtil');

const corporateFinancialService = {
    
    updateTodaysCorporateFinancial : async function() {
        return this.getLatelyFourQuartersReports()
                    .then((latelyFourQuartersReports) => this.makeYearlyReports(latelyFourQuartersReports))
                    .then((yearlyReports) => this._convertToDocuments(yearlyReports))
                    .then((documents) => elasticSearchService.upsert(documents))
                    .then((response) => {
                        console.log(`UPDATE Today's CorporateFinancial SUCCESS [${dateUtil.getCurrentTimeStamp()}]`);
                        return response;
                    })
                    .catch((error) => {
                        const timestamp = dateUtil.getCurrentTimeStamp();
                        const message = `UPDATE Today's CorporateFinancial FAIL [${timestamp}]`; 
                        console.log(message);
                        return {
                            timestamp, 
                            "status": 500, 
                            "error": "Internal Server Error", 
                            message, 
                            "path": ""
                        }
                    });
    },
    getLatelyFourQuartersReports : async function() {
        const latelyFourQuarters = dateUtil.getLatelyFourQuarters();
        
        let latelyFourQuartersReports = [];
        for(let i=0; i<4; i++) {
            let year = latelyFourQuarters[i].year;
            let quarter = latelyFourQuarters[i].quarter;
            let quarterlyReports = await quarterlyReportService.getAllCompaniesQuarterlyReports({year, quarter});            
            latelyFourQuartersReports.push(quarterlyReports);
        }
        return latelyFourQuartersReports;
    },
    makeYearlyReports : async function(latelyFourQuartersReports) {
        let yearlyReports = [];
        // TODO
        // valid check
        // merge 4quarters 
        return yearlyReports;
    },
    _convertToDocuments : async function(yearlyReports) {
        let documents = [];
        // TODO
        // make document id
        // make document && push
        return documents;
    }

};

module.exports = corporateFinancialService;