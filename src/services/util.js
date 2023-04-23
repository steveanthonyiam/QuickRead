const fs = require("fs");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

exports.cleanString = function (str) {
    return str.replace(/[\*\+]/g, " ")
        .replace(/^\d+(\s+)?/, "") // or add .trim()
        .replace(/\n?/, "")
        .replace(/\s{2,}/g, " ")
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim();
}

exports.getPageContentUntilElement = async function (url, classToWait) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigue vers l'URL spécifiée
    await page.goto(url);

    // Utilise setTimeout pour attendre jusqu'à 10 secondes
    await page.waitForSelector(`${classToWait}`);

    await scrollToEnd(page);

    await page.waitForTimeout(3000);

    // Récupère le contenu HTML de la page
    const html = await page.content();

    await browser.close();

    return html;
}

async function scrollToEnd(
    page,
    distance = 200,
    scrollDelay = 1000,
) {

    try {
        var totalHeight = 0;
        while (true) {
            var scrollHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate(`window.scrollBy(0, ${distance})`);
            totalHeight += distance;
            let innerHeight = await page.evaluate('window.innerHeight');
            if (totalHeight >= scrollHeight - innerHeight) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    } catch (e) { }

}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise(async (resolve) => {
            var totalHeight = 0;
            var distance = 1000;

            while (true) {

                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    break;
                }
                console.log("loop");

                await new Promise(resolve => setTimeout(resolve, 100));
            } console.log("end");

            resolve();

            /*
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
            
                            if (totalHeight >= scrollHeight - window.innerHeight) {
                                clearInterval(timer);
                                resolve();
                            }
                        }, 100);
            
                        */
        });
    });
}

exports.httpGet = function (url) {
    return new Promise((resolve, reject) => {
        const http = require('http'),
            https = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let chunks = [];

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                chunks.push(chunk);
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(Buffer.concat(chunks));
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
}

exports.getBetween = function (totalText, start, end, next = 1) {

    var startPos = 0;

    for (let i = 0; i < next; i++) {
        startPos = totalText.indexOf(start) + start.length;
        console.log(">startPos : ", startPos);
        totalText = totalText.substring(startPos, totalText.length).trim();
    }

    var endPos = totalText.indexOf(end);
    console.log("startPos : ", startPos);
    console.log("endPos : ", endPos);
    return totalText.substring(0, endPos).trim();
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

exports.saveToFile = function (data, fileName) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            console.error('Erreur lors de la sauvegarde du fichier : ' + err);
        } else {
            console.log('Le fichier ' + fileName + ' a été sauvegardé avec succès !');
        }
    });
}

exports.countElementByClass = function (html, cssPath) {
    // Charge le HTML dans Cheerio
    const $ = cheerio.load(html);

    // Utilise Cheerio pour récupérer tous les éléments avec la classe spécifiée
    const elements = $(cssPath);

    return elements.length;
}

exports.getNthElementByClass = function (html, cssPath, n) {
    // Charge le HTML dans Cheerio
    const $ = cheerio.load(html);

    // Utilise Cheerio pour récupérer tous les éléments avec la classe spécifiée
    const elements = $(cssPath);

    // Si aucun élément n'a été trouvé, retourne null
    if (elements.length === 0) {
        return null;
    }

    // Récupère le n-ème élément trouvé
    const nthElement = elements.eq(n);

    // Si l'élément n'a pas été trouvé, retourne null
    if (nthElement.length === 0) {
        return null;
    }

    return nthElement;
}
