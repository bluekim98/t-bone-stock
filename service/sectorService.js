const elasticsearchService = require('./elasticsearch');

const sectorService = {
    getAllSectors : function(){
        let query = `SELECT sectorName, market, sectorCode
                       FROM tbonestock
                      WHERE category = 'sector'
                      GROUP BY sectorName, market, sectorCode`;

        console.log(query);
        return elasticsearchService.sqlQuery(query);
      },
}

module.exports = sectorService;