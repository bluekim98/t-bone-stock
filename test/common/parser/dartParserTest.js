const dartParser = require('../../../common/parser/dartParser');
const fileParser = require('../../../common/parser/fileParser');

module.exports = async function dartParserTest() {
    console.log('####### START dartParserTest #########');
    
    const LG_INNOTEK_CODE = '011070';
    const LG_INNOTEK_NAME = 'LG이노텍';

    (async function getAllCompanyNameObjectOf(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const corporateReports = await fileParser.getCorporateReportsOf(xlsxObject);

        
        // when
        const allCompanyNameObject = await dartParser.getAllCompanyNameObjectOf(corporateReports);
        
        // then
        console.log(allCompanyNameObject.length !== null);
        console.log(allCompanyNameObject instanceof Object);
        console.log(allCompanyNameObject[LG_INNOTEK_CODE] === LG_INNOTEK_NAME);

    }());

    (async function __getValueCode(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const corporateReports = await fileParser.getCorporateReportsOf(xlsxObject);
        
        // when
        const firstIndexRowData = corporateReports[0];
        let valueCode = await dartParser.__getValueCode(firstIndexRowData);
        
        // then
        console.log(valueCode !== null);
        console.log(valueCode === '당기 1분기 3개월');
        

    }());

    (async function getVerifiedCorporateReportsOf(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const corporateReports = await fileParser.getCorporateReportsOf(xlsxObject);
        
        // when
        const verifiedCorporateReports = await dartParser.getVerifiedCorporateReportsOf(corporateReports);
        
        console.log(verifiedCorporateReports !== null);
        console.log(verifiedCorporateReports instanceof Object);
        console.log(verifiedCorporateReports[LG_INNOTEK_CODE] !== null);
        console.log(verifiedCorporateReports[LG_INNOTEK_CODE] instanceof Object);
        
    }());
 
}