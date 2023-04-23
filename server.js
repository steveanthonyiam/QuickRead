
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');

const EconomistApi = require('./src/economist.api.js');
const CoreApi = require('./src/core.api.js');

app.use(cors({
  origin: '*'
}));

app.use('/examples', express.static('examples'));
app.use('/mock', express.static('mock'));

EconomistApi.init(app);
CoreApi.init(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
