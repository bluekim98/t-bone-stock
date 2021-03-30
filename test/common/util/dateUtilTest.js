const dateUtil = require('../../../common/util/dateUtil');

module.exports = async function dateUtilTest() {
    console.log('####### START dateUtilTest #########');

    // parseXlsxFile  test
    await (async function parseXlsxFile(){
        // given
        const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss:SSS';
        // when
        const timestamp = dateUtil.getCurrentTimeStamp();
        // then
        console.log(timestamp.length === TIMESTAMP_FORMAT.length);
    }());
    
}