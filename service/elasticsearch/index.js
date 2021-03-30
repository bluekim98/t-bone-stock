const _upsert = require('./_upsert');
const _insert = require('./_insert');
const _sqlQuery = require('./_sqlQuery');
const _search = require('./_search');

module.exports = {
    upsert : _upsert,
    insert : _insert,
    sqlQuery : _sqlQuery,
    search : _search,
}