const moment = require('moment');
const dateUtil = {
    'STRICT_DATE_OPIONAL_TIME_FORMAT' : 'YYYY-MM-DDTHH:mm:ss',
    'TIMESTAMP_FORMAT' : 'YYYY-MM-DD HH:mm:ss:SSS',

    getQuarterBeforeMonths: function(i = 1){
        return moment().subtract(i, 'months').quarter();
    },
    getYearBeforeMonths: function(i = 1){
        return moment().subtract(i, 'months').format('YYYY');
    },
    getLastFourQuatersWithFormat: function(format = 'YYYY/MM'){
        let quaters = [];
        for(let i=1; i<=4; i++){
            quaters.push(moment(this.getYearBeforeMonths(i*3)).quarter(this.getQuarterBeforeMonths(i*3)).add(2, 'months').format(format));
        }
        return quaters;
    },
    getDateToQueryLastestStockWithFormat: function(format = this.STRICT_DATE_OPIONAL_TIME_FORMAT) {
        let currentHour = moment().hour();

        if(currentHour < 16) return moment().add(-1, 'days').startOf('day').format(format);
        else return moment().startOf('day').format(format);
    },
    getCurrentTimeStamp: function() {
        return moment().format(this.TIMESTAMP_FORMAT);
    }
}


module.exports = dateUtil;