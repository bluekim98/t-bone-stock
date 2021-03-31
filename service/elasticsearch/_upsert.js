const { Client } = require('@elastic/elasticsearch')
const dateUtil = require('../../common/util/dateUtil');

module.exports = async function upsert(body){
    const client = new Client({
      node: 'http://127.0.0.1:9200',
      auth: {
        username: 'elastic',
        password: '04280215'
      }
    });
    
    body = body.flatMap( data => [
         { "update": { "_id" : `${data.id}`, "retry_on_conflict": 3 }},
         { "doc": {
             ...data,
             timestamp : dateUtil.getCurrentTimeStamp()
         }, "doc_as_upsert" : true} 
    ])

    let params = {
        index: 'tbonestock',
        body
    }
 

    const { body: bulkResponse } = await client.bulk(params);
    if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
                erroredDocuments.push({
                    // If the status is 429 it means that you can retry the document,
                    // otherwise it's very likely a mapping error, and you should
                    // fix the document before to try it again.
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                })
            }
        })
        return erroredDocuments;
    }
    return body;
}