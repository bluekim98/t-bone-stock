const { Client } = require('@elastic/elasticsearch')

module.exports = async function insert(dataArr){
    const client = new Client({
        node: 'http://localhost:9200',
        auth: {
          username: 'elastic',
          password: '04280215'
        }
      });
      /*elasticSearch 전달 값 구성*/
    const bulkObj = {
      datasource: dataArr,
      onDocument (doc) {
        return {
          index: { _index:'tbonestock',
                    _type :'_doc',
                    _id   : `${doc.category}_${doc.bizCode}_${doc.date}_${doc.id}` }
        }
      }
    };
    
    const result = await client.helpers.bulk(bulkObj);
    console.log(result);
}
