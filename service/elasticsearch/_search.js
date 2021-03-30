const { Client } = require('@elastic/elasticsearch')

module.exports = async function search(body){
    const client = new Client({
        node: 'http://127.0.0.1:9200',
        auth: {
          username: 'elastic',
          password: '04280215'
        }
      });
      
      /* let body = {
        "index":"t**",
        "body":{
          "version":true,
          "size":500,
          "sort":[
            {"date":
              {"order":"desc","unmapped_type":"boolean"}
            }
          ],
          "aggs":{
            "2":{
              "date_histogram":{
                "field":"date","fixed_interval":"12h","time_zone":"Asia/Seoul","min_doc_count":1
              }
            }
          },
          "stored_fields":["*"],
          "script_fields":{},
          "docvalue_fields":[{"field":"date","format":"date_time"}],
          "_source":{"excludes":[]},
          "query":{
            "bool":{
              "must":[],
              "filter":[
                {
                  "bool":{"should":[{"match":{"category":"stock"}}],
                  "minimum_should_match":1
                }
              },
              {
                "range":{
                "date":{
                  "gte":"2020-12-24T08:18:49.371Z",
                  "lte":"2021-01-23T08:18:49.371Z",
                  "format":"strict_date_optional_time"
                }
              }
              }
            ],
            "should":[],
            "must_not":[]
          }
        },
        "highlight":{"pre_tags":["@kibana-highlighted-field@"],"post_tags":["@/kibana-highlighted-field@"],"fields":{"*":{}},"fragment_size":2147483647}},"preference":1611389814508} */
      let data = await client.search(body);

      console.log(data);

}