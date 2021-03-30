const moment = require('moment');
const constants = require('../constant');
const numberUtil = require('../util/numberUtil');
const consensusParser = {
    //"2022/12(E)" -> "2022/12"로 변환
    _getOnlyDate : (date) => date.substr(0, 7),

    //3,017,521 -> 3017521로 변환
    _getErasedCommaNumber : (numStr) => {
        return numStr.replace(/,/g, '');
    },

    parseConsensus : function(data, companyCode){
        console.log(`start parse Consensus`);
        
        let bulkBody = [], consensusMap = {
            'D_2' : {},
            'D_3' : {},
            'D_4' : {},
            'D_5' : {},
            'D_6' : {},
            'D_7' : {}
        },
        arrMapper = [
            constants.YEAR,
            constants.REVENUE,
            constants.REVENUE_COMPARED_LAST_YEAR,
            constants.REVENUE_COMPARED_CONSENSUS,
            constants.OPERATING_INCOME_LOSS,
            constants.OPERATING_INCOME_LOSS_COMPARED_LAST_YEAR,
            constants.OPERATING_INCOME_LOSS_COMPARED_CONSENSUS,
            constants.PROFIT,
            constants.PROFIT_COMPARED_LAST_YEAR,
            constants.PROFIT_COMPARED_CONSENSUS,
            constants.PASS,
            constants.PASS,
            constants.ASSET,
            constants.LIABILITIES,
            constants.EQUITY,
            constants.PASS,
            constants.PASS,
            constants.ISSUED_CAPITAL,
            constants.EPS,
            constants.BPS,
            constants.DPS,
            constants.PER,
            constants.PBR
        ];

        /*
        0 : 항목
        1 : 매출액(억원)
        2 : 전년동기대비(%)
        3 : 컨센서스대비(%)
        4 : 영업이익(억원)
        5 : 전년동기대비(%)
        6 : 컨센서스대비(%)
        7 : 당기순이익(억원)
        8 : 전년동기대비(%)
        9 : 컨센서스대비(%)
        12: 자산총계(억원)
        13: 부채총계(억원)
        14: 자본총계(억원)
        17: 자본금(억원)
        18: EPS
        19: BPS
        20: DPS
        21: PER
        22: PBR
        */
        try{
            for(let i=0; i<data.length; i++){
                if(arrMapper[i] === PASS) continue;
                
                let valueName = arrMapper[i];
                for(let j=2; j<=7; j++){
                    let value = data[i][`D_${j}`] || constants.NO_VALUE;
    
                    if(i == 0) value = this._getOnlyDate(value);
                    else value = this._getErasedCommaNumber(value);
    
                    consensusMap[`D_${j}`][valueName] = value;
                }
            }
    
            for(const [key, value] of Object.entries(consensusMap)){
                let { year, revenue, revenueComparedLastYear, revenueComparedConsensus,
                operatingIncomeLoss, operatingIncomeLossComparedLastYear, operatingIncomeLossComparedConsensus,
                profit, profitComparedLastYear, profitComparedConsensus,
                asset, liabilities, equity, issuedCapital,
                EPS, BPS, DPS, PER, PBR } = value;
    
                bulkBody.push({
                    category: 'consensus',
                    id: `${year}${companyCode}`,
                    companyCode,
                    date: moment(new Date()).format('YYYY-MM-DD'),
                    revenue, revenueComparedLastYear, revenueComparedConsensus,
                    operatingIncomeLoss, operatingIncomeLossComparedLastYear, operatingIncomeLossComparedConsensus,
                    profit, profitComparedLastYear, profitComparedConsensus,
                    asset, liabilities, equity, issuedCapital,
                    EPS, BPS, DPS, PER, PBR,
                });
            }
            console.log(`finish parse Consensus`);
            return bulkBody;
        }catch(err){
            console.error(err)
        }
    },

    parseQuarterToWholeYearConsensus : function(quaterConsensus) {  
        let wholeYearConsensus = {}; 
        const { OPERATING_INCOME_LOSS, PROFIT, REVENUE, ASSET, LIABILITIES, NO_VALUE } = constants;

        for(let quater of quaterConsensus){
            let { companyCode, operatingIncomeLoss, profit, revenue } = quater;
            try{
                if(wholeYearConsensus[companyCode]){
                    wholeYearConsensus[companyCode][OPERATING_INCOME_LOSS] += numberUtil.parseInt(operatingIncomeLoss);
                    wholeYearConsensus[companyCode][PROFIT] += numberUtil.parseInt(profit);
                    wholeYearConsensus[companyCode][REVENUE] += numberUtil.parseInt(revenue);
                }else{
                    wholeYearConsensus[companyCode] = {
                        quaters : []
                    };
                    wholeYearConsensus[companyCode][OPERATING_INCOME_LOSS] = numberUtil.parseInt(operatingIncomeLoss);
                    wholeYearConsensus[companyCode][PROFIT] = numberUtil.parseInt(profit);
                    wholeYearConsensus[companyCode][REVENUE] = numberUtil.parseInt(revenue);
                }
                wholeYearConsensus[companyCode].quaters.push(quater);
            }catch(err){
                console.error(err);
            }
        }

        for (let [key, consensus] of Object.entries(wholeYearConsensus)) {
            let { quaters, operatingIncomeLoss, profit, revenue } = consensus;
            let length = quaters.length;
            if(length){
                consensus[OPERATING_INCOME_LOSS] = operatingIncomeLoss * 4/length;
                consensus[PROFIT] = profit * 4/length;
                consensus[REVENUE] = revenue * 4/length;

                for(let i=length-1; i>-1; i--){
                  if(quaters[i][ASSET] === NO_VALUE || consensus[ASSET]){}
                  else{
                    consensus[ASSET] = numberUtil.parseInt(quaters[i][ASSET]);
                  }
                  if(quaters[i][LIABILITIES] === NO_VALUE || consensus[LIABILITIES]){}
                  else{
                    consensus[LIABILITIES] = numberUtil.parseInt(quaters[i][LIABILITIES]);
                  }
                }
            }
        }

        return wholeYearConsensus;
    },
}

module.exports = consensusParser;