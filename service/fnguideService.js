const request = require('request');
const elasticService = require('../service/elasticsearch');
const consensusParser = require('../common/parser/consensusParser');

const fnguideService = {
    _getAllStockId : function() {
        let query = ` SELECT companyCode
                        FROM tbonestock
                       WHERE companyCode IS NOT NULL
                         AND category = 'stock'
                       GROUP BY companyCode`;
        return elasticService.sqlQuery(query);
    },
    
    _requestFnguidApiYearly : function(companyCode) {
        console.log(`_requestFnguidApi - ${companyCode}`)
        return new Promise( (resolve, reject) => {
            request.get(`http://comp.fnguide.com/SVO2/json/data/01_06/01_${companyCode}_A_D.json`, (err, resp, body) => {
                if (!err && resp.statusCode == 200) {
                    try{
                        let jsonBody = JSON.parse(body.trim()),
                        consensusResult = consensusParser.parseConsensus(jsonBody.comp, companyCode)
                        resolve(consensusResult);
                    }catch(e){
                        reject(e)
                    }
                }else{
                    reject(new Error(`Fail _requestFnguidApi : ${resp.statusCode}, ${resp.statusMessage}`));
                }
            })

        })
    },
    _requestFnguidApiQaurterly : function(companyCode) {
        console.log(`_requestFnguidApi - ${companyCode}`)
        return new Promise( (resolve, reject) => {
            request.get(`http://comp.fnguide.com/SVO2/json/data/01_06/01_${companyCode}_Q_D.json`, (err, resp, body) => {
                if (!err && resp.statusCode == 200) {
                    try{
                        let jsonBody = JSON.parse(body.trim()),
                        consensusResult = consensusParser.parseConsensus(jsonBody.comp, companyCode)
                        resolve(consensusResult);
                    }catch(e){
                        reject(e)
                    }
                }else{
                    reject(new Error(`Fail _requestFnguidApi : ${resp.statusCode}, ${resp.statusMessage}`));
                }
            })

        })
    },

    getStockIdsWhichHaveConsensus : async function() {
        let companyCodes = await this._getAllStockId();
        
        return companyCodes.filter(({companyCode}) => {
            let matchCode = companyCode.match(/A([0-9]+)0/);
            return matchCode && matchCode[0].length === 7;
        });
    },

    upsertCompanyYearlyConsensusWithCallingInterval : async function (interval = 30000) {
        let companyCodes = await this.getStockIdsWhichHaveConsensus();
        
        for(let i=0; i<companyCodes.length; i++){
            let { companyCode } = companyCodes[i];

            setTimeout(async function(companyCode) {
                console.log(`Request ${companyCode} consensus`);
                this._requestFnguidApiYearly(companyCode)
                .then( async consensusResult => { 
                    await elasticService.upsert(consensusResult)
                    console.log(`Finish ${companyCode} consensus`);
                })
                .catch( errorMsg => console.error(errorMsg) )

            }.bind(this), interval*i, companyCode);
        }
    },
    upsertCompanyQaurterlyConsensusWithCallingInterval : async function (interval = 30000) {
        let companyCodes = await this.getStockIdsWhichHaveConsensus();
        
        for(let i=0; i<companyCodes.length; i++){
            let { companyCode } = companyCodes[i];

            setTimeout(async function(companyCode) {
                console.log(`Request ${companyCode} consensus`);
                this._requestFnguidApiQaurterly(companyCode)
                .then( async consensusResult => { 
                    await elasticService.upsert(consensusResult)
                    console.log(`Finish ${companyCode} consensus`);
                })
                .catch( errorMsg => console.error(errorMsg) )

            }.bind(this), interval*i, companyCode);
        }
    },
}



 
module.exports = fnguideService;