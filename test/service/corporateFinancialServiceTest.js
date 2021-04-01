const corporateFinancialService = require('../../service/corporateFinancialService');
const dateUtil = require('../../common/util/dateUtil');


module.exports = async function corporateFinancialServiceTest() {
    console.log('####### START corporateFinancialServiceTest #########');

    await (async function getLatelyFourQuartersReports(){
        // given 
        const latelyFourQuarters = dateUtil.getLatelyFourQuarters();
        // when
        const latelyFourQuartersReports = await corporateFinancialService.getLatelyFourQuartersReports();
        // then
        console.log(latelyFourQuartersReports instanceof Array);
        console.log(latelyFourQuartersReports.length === 4);

        for(let i=0; i<4; i++) {
            let currentQuarter = `${latelyFourQuarters[i].year}_${latelyFourQuarters[i].quarter}Q`;
            let currentReports = latelyFourQuartersReports[i];
            let documentId = currentReports[0].id;
            let quarterInReport = documentId.substring(0, 7);
            console.log(currentQuarter === quarterInReport);
        }

    }());

    
}