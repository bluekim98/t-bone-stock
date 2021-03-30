const fileParser = require('../common/parser/fileParser');
const dartParser = require('../common/parser/dartParser');
const elasticService = require('../service/elasticsearch');
const dateUtil = require('../common/util/dateUtil');

const dartStockService = {
    addQuarterlyReport : async function({ fileName, year, quarter }) {
        const filePath = `dart/${year}`;
        const xlsxObject= await fileParser.parseXlsxFile(filePath, fileName);
        const corporateReports = await fileParser.getCorporateReportsOf(xlsxObject);
        
        const verifiedCorporateReports = await dartParser.getVerifiedCorporateReportsOf(corporateReports);
        const allCompanyNameObject = await dartParser.getAllCompanyNameObjectOf(corporateReports);
        const elasticDocument = await dartParser.getElasticDocumentOf(verifiedCorporateReports, allCompanyNameObject, {year, quarter});

        const response = await elasticService
                                    .upsert(elasticDocument)
                                    .then(response => {
                                        console.log(`INSERT REPORT SUCCESS [${fileName}][${dateUtil.getCurrentTimeStamp()}]`);
                                        return response;
                                    });
        return response;
    },
};

module.exports = dartStockService;