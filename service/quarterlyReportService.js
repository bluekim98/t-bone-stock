const fileParser = require('../common/parser/fileParser');
const dartParser = require('../common/parser/dartParser');
const elasticSearchService = require('./elasticsearch');
const dateUtil = require('../common/util/dateUtil');

const quarterlyReportService = {
    addQuarterlyReport : async function({ fileName, year, quarter }) {
        const filePath = `dart/${year}`;
        const xlsxObject= await fileParser.parseXlsxFile(filePath, fileName);
        const corporateReports = await fileParser.getCorporateReportsOf(xlsxObject);
        
        const verifiedCorporateReports = await dartParser.getVerifiedCorporateReportsOf(corporateReports);
        const allCompanyNameObject = await dartParser.getAllCompanyNameObjectOf(corporateReports);
        const elasticDocument = await this.__convertElasticObjectOf(verifiedCorporateReports, allCompanyNameObject, {year, quarter});

        const response = await elasticSearchService
                                    .upsert(elasticDocument)
                                    .then(response => {
                                        console.log(`INSERT REPORT SUCCESS [${fileName}][${dateUtil.getCurrentTimeStamp()}]`);
                                        return response;
                                    });
        return response;
    },
    __convertElasticObjectOf : async function(verifiedCorporateReports, allCompanyNameObject, {year, quarter}) {

        let idx = 0;
        let documents = [];
        for(let companyCode in verifiedCorporateReports) {
            let documentId = this.__makeQuarterlyReportDocumentId({year, quarter, companyCode});
            documents[idx++] = {
                companyCode,
                companyName : allCompanyNameObject[companyCode],
                ...verifiedCorporateReports[companyCode],
                id : documentId
            }
        }
        
        return documents;
    },
    __makeQuarterlyReportDocumentId : function({year, quarter, companyCode}) {
        return `${year}_${quarter}Q${companyCode}`;
    },
    getQuarterlyReport : async function({year, quarter, companyCode}) {
        let documentId = this.__makeQuarterlyReportDocumentId({year, quarter, companyCode});
        let query = `
            SELECT  *
            FROM    tbonestock
            WHERE   id = '${documentId}'
        `;
        console.log(query);
        return await elasticSearchService.sqlQuery(query);
    },
    getAllCompaniesQuarterlyReports : async function({year, quarter}) {
        let documentIdLikly =`${year}_${quarter}`;
        let query = `
            SELECT  *
            FROM    tbonestock
            WHERE   id LIKE '%${documentIdLikly}%'
        `;
        
        // WHERE   _id LIKE %${documentIdLikly}%
        console.log(query);
        return await elasticSearchService.sqlQuery(query);
    }

};

module.exports = quarterlyReportService;