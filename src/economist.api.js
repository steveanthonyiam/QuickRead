
const AppUtil = require('./services/util.js');

exports.init = function (app) {

    app.get('/economist/get', async (req, res) => {

        let url = req.query.url;
        console.log(url);
        url = url.replaceAll("---", "/");

        //'graphic-detail---2022---10---20---in-america-and-eastern-europe-covid-19-got-worse-in-2021'
        url = 'https://www.economist.com/' + url;
        console.log(url);

        var buf = await AppUtil.httpGet(url);

        var page = buf.toString('utf-8');

        var title = AppUtil.getBetween(page, '"headline":"', '","articleBo');
        var content = AppUtil.getBetween(page, '"bodyText":"', '"about"');

        res.send({ title: title, content: content });

    });

    app.get('/economist/top', async (req, res) => {

        var buf = await AppUtil.httpGet('https://www.economist.com/');

        var page = buf.toString('utf-8');

        var title = AppUtil.getBetween(page, '<script type="application/ld+json">', '</script>', 2);
        title = title.replaceAll('@', '');

        res.send(JSON.parse(title));

    });

}