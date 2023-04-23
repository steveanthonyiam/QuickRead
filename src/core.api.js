
const AppUtil = require('./services/util.js');
const ScrapService = require('./services/scrap.service');

exports.init = function (app) {
    app.get('/search', async (req, res) => {

        let url = req.query.url;
        console.log("/search => " + url);
        let results = await ScrapService.getArticles();

        res.send(results);

    });

}