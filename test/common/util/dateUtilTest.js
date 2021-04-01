const dateUtil = require('../../../common/util/dateUtil');

module.exports = async function dateUtilTest() {
    console.log('####### START dateUtilTest #########');

    await (async function getCurrentTimeStampWithFormat(){
        // given
        const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss:SSS';
        // when
        const timestamp = dateUtil.getCurrentTimeStampWithFormat(TIMESTAMP_FORMAT);
        // then
        console.log(timestamp.length === TIMESTAMP_FORMAT.length);
    }());

    await (async function getLatelyQuarters(){
        // given
        
        //when
        const latelyFourQuarters = dateUtil.getLatelyFourQuarters();
        // then
        console.log(latelyFourQuarters instanceof Array);
        console.log(latelyFourQuarters.length === 4);
        
        for(let i=0; i<3; i++) {
            console.log(latelyFourQuarters[i].year >= latelyFourQuarters[i+1].year);
        }

    }());


    
    
}