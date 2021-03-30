const { Client } = require('@elastic/elasticsearch')

module.exports = async function sqlQuery(query){
    const client = new Client({
      node: 'http://127.0.0.1:9200',
      auth: {
        username: 'elastic',
        password: '04280215'
      }
    });

    // "SELECT * FROM \"game-of-thrones\" WHERE house='stark'"
    const { body } = await client.sql.query({
        body: { 
            query,
            "fetch_size" : 10000
        }
    });
    const data = body.rows.map(row => {
        const obj = {}
        for (var i = 0; i < row.length; i++) {
            obj[body.columns[i].name] = row[i]
        }
        return obj
    });
    return data;
}