const AppUtil = require('./util.js');

const Article = {
    ECBPapers: {
        Working: {
            URL: "https://www.ecb.europa.eu/pub/research/working-papers/html/index.en.html",
            NAME: "ECB Working Papers"
        },
        Occasional: {
            // URL: "https://www.ecb.europa.eu/pub/research/occasional-papers/html/index.en.html",

            URL: "http://localhost:3000/mock/ecbOccasional.html",
            NAME: "ECB Occasional Papers"
        },
        Discussion: {
            URL: "https://www.ecb.europa.eu/pub/research/discussion-papers/html/index.en.html",
            NAME: "ECB Discussion Papers"
        },
        Legal: {
            URL: "https://www.ecb.europa.eu/pub/research/legal-working-papers/html/index.en.html",
            NAME: "ECB Legal Papers"
        },
        Statistics: {
            URL: "https://www.ecb.europa.eu/pub/research/statistics-papers/html/index.en.html",
            NAME: "ECB Statistics Papers"
        },
    },

    IMFPaper: {
        URL: 'https://www.imf.org/en/Publications/Search#sort=%40imfdate%20descending',
        NAME: "IMF"
    }
}

const getArticles = async function (eCBPapers) {

    return await getArticlesFromECB(Article.ECBPapers.Occasional);
}

// -------------------------------------
// LOAD ECB
// -------------------------------------  
const getArticlesFromECB = async function (eCBPapers) {

    console.log("> getArticleFromECB");
    let results = [];
    let url = eCBPapers.URL;

    // Load the page
    var page = await AppUtil.getPageContentUntilElement(url, '#snippet0');
    console.log("Page loaded");

    if (eCBPapers.NAME == Article.ECBPapers.Legal.NAME) {

        // Count the number of articles and parse them
        let numberOfArticles = AppUtil.countElementByClass(page, '.lazy-load.loaded');

        for (let i = 0; i < numberOfArticles; i++) {
            console.log("Article : ", i);
            let article = AppUtil.getNthElementByClass(page, '.lazy-load.loaded', i);

            if (article) {
                article = article.html();

                if (AppUtil.getNthElementByClass(article, '.title a', 0)) {

                    console.log("===> '" + article + "'");
                    let title = AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.title a', 0).html());
                    let link = AppUtil.getNthElementByClass(article, '.title a', 0).attr('href');
                    let description = AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.accordion dd', 0).html());
                    let date = new Date(AppUtil.getNthElementByClass(article, 'dt .date', 0).html());
                    let pdf = AppUtil.getNthElementByClass(article, '.pdf', 0);
                    if (pdf) {
                        pdf = pdf.attr('href');
                    }

                    results.push({
                        title: title,
                        content: description,
                        date: date,
                        link: "https://www.ecb.europa.eu" + link,
                        pdf: "https://www.ecb.europa.eu" + pdf,
                        source: eCBPapers.NAME
                    });

                }
            }

        }

    } else if (eCBPapers.NAME == Article.ECBPapers.Working.NAME) {

        // Count the number of articles and parse them
        let numberOfArticles = AppUtil.countElementByClass(page, '#snippet0 > dd');

        for (let i = 0; i < 10; i++) {
            console.log("Article : ", i);
            let article = AppUtil.getNthElementByClass(page, '#snippet0 > dd', i).html();

            let title = AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.title a', 0).html());
            let link = AppUtil.getNthElementByClass(article, '.title a', 0).attr('href');
            let description = AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.accordion dd', 0).html());
            let date = new Date(AppUtil.getNthElementByClass(page, '#snippet0 > dt .date', i).html());
            let pdf = AppUtil.getNthElementByClass(article, '.pdf', 0);
            if (pdf) {
                pdf = pdf.attr('href');
            }

            results.push({
                title: title,
                content: description,
                date: date,
                link: "https://www.ecb.europa.eu" + link,
                pdf: "https://www.ecb.europa.eu" + pdf,
                source: eCBPapers.NAME
            });

        }

    } else if (eCBPapers.NAME == Article.ECBPapers.Occasional.NAME) {

        // Count the number of articles and parse them
        let numberOfArticles = AppUtil.countElementByClass(page, '#lazyload-container > div > dd');

        for (let i = 0; i < numberOfArticles; i++) {
            console.log("Article : ", i);
            let article = AppUtil.getNthElementByClass(page, '#lazyload-container > div > dd', i).html();

            let title = AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.title a', 0).html());
            let link = AppUtil.getNthElementByClass(article, '.title a', 0).attr('href');
            let description = AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.accordion dd', 0).html());
            let date = new Date(AppUtil.getNthElementByClass(page, '#lazyload-container > div > dt .date', i).html());
            let pdf = AppUtil.getNthElementByClass(article, '.pdf', 0);
            if (pdf) {
                pdf = pdf.attr('href');
            }

            let numberOfAuthors = AppUtil.countElementByClass(article, '.authors li a');
            let authors = [];
            for (let j = 0; j < numberOfAuthors; j++) {
                let a = AppUtil.getNthElementByClass(article, '.authors li a', j).html();
                authors.push(AppUtil.cleanString(a));
            }

            results.push({
                title: title,
                content: description,
                date: date,
                link: "https://www.ecb.europa.eu" + link,
                pdf: "https://www.ecb.europa.eu" + pdf,
                source: eCBPapers.NAME,
                authors: authors
            });

        }

    }

    return results;
}

const getArticlesFromIMF = async function (eCBPapers) {

    console.log("> getArticlesFromIMF");
    let results = [];
    let url = IMFPaper.URL;

    // Load the page
    let page = await AppUtil.getPageContentUntilElement(url, '.coveo-list-layout');
    console.log("Page loaded");

    // Count the number of articles and parse them
    let numberOfArticles = AppUtil.countElementByClass(page, '.coveo-list-layout');

    for (let i = 0; i < numberOfArticles; i++) {
        console.log("Article : ", i);
        let article = AppUtil.getNthElementByClass(page, '.coveo-list-layout', i).html();
        let title = AppUtil.getNthElementByClass(article, 'h3 a', 0).html();
        let link = AppUtil.getNthElementByClass(article, 'h3 a', 0).attr('href');
        let description = AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.imf-description', 0).html());
        let date = new Date(AppUtil.cleanString(AppUtil.getNthElementByClass(article, '.imf-date', 0).html()));
        let pdf = AppUtil.getNthElementByClass(article, 'h4 a', 0);
        if (pdf) {
            pdf = pdf.attr('href');
        }

        results.push({
            title: title,
            content: description,
            date: date,
            link: link,
            pdf: pdf,
            source: IMFPaper.NAME
        });
    }

}

module.exports = Object.freeze({
    Article: Article,
    getArticlesFromIMF: getArticlesFromIMF,
    getArticlesFromECB: getArticlesFromECB,
    getArticles: getArticles,
});