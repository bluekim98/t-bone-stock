const CONSENSUS_KEY = require('./_consensusKey');
const STOCK_KEY = require('./_stockKey');

const constants = {
    ...CONSENSUS_KEY,
    ...STOCK_KEY,
    PSR: 'PSR',
    ROE: 'ROE',
    ROA: 'ROA',
    EV_EBITDA: 'EV/EBITDA'
}
module.exports = constants