const fileParser = require('../../../common/parser/fileParser');

module.exports = async function fileParserTest() {
    console.log('####### START fileParserTest #########');

    // parseXlsxFile  test
    await (async function parseXlsxFile(){
        //given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';

        //when
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        
        //then
        console.log(xlsxObject !== null);
        console.log(xlsxObject instanceof Object);

    }());

    // getCompanyReportsOf test
    await (async function getCorporateReportsOf(){
        //given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);

        //when
        const corporateReports = await fileParser.getCorporateReportsOf(xlsxObject);

        //then
        console.log(corporateReports !== null);
        console.log(corporateReports instanceof Array);
        console.log(corporateReports[0] instanceof Object);

    }());
    
}