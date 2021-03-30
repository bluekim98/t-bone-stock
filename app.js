const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8281;


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require('./router/main')(app);
