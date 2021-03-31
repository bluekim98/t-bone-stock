const quarterlyReportService = require('../../service/quarterlyReportService');
const dartParser = require('../../common/parser/dartParser');
const fileParser = require('../../common/parser/fileParser');

module.exports = async function quarterlyReportServiceTest() {
    console.log('####### START quarterlyReportServiceTest #########');


    await (async function __convertElasticObjectOf(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const corporateReports = await fileParser.getCorporateReportsOf(xlsxObject);
        const verifiedCorporateReports = await dartParser.getVerifiedCorporateReportsOf(corporateReports);
        const allCompanyNameObject = await dartParser.getAllCompanyNameObjectOf(corporateReports);
        const dateObject = {
            year : '2020',
            quater : '1Q'
        }

        // when
        const elasticDocument = await quarterlyReportService
                                            .__convertElasticObjectOf(verifiedCorporateReports, allCompanyNameObject, dateObject);

        console.log(elasticDocument !== null);
        console.log(elasticDocument instanceof Array);
        console.log(elasticDocument[0] !== null);
        console.log(elasticDocument[0] instanceof Object);
        console.log(elasticDocument[0]["id"] !== null);
    }());
    
}