import { redisGet, redisSet } from "../../config/redis";
import Environment from "../../helper/constan/environment";
import PuppetterGetContentHtml from "../../helper/puppetter-get-content-html";
import { getTTLUntilNextMorningStock } from "../../helper/ttl-cache";

export async function getIHSGData() {
    // Cek data redis
    const keyCacheRedis = 'price-stock-idx';
    const cache = await redisGet(keyCacheRedis);
    if (cache) {
        return JSON.parse(cache)
    }

    const { page, browser } = await PuppetterGetContentHtml()

    await page.goto(Environment.URL_API_IHSG, {
        waitUntil: 'networkidle2'
    });

    let content = await page.content();
    content = content.replace(`<html><head><meta name=\"color-scheme\" content=\"light dark\"><meta charset=\"utf-8\"></head><body><pre>`, '');
    content = content.replace(`</pre><div class=\"json-formatter-container\"></div></body></html>`, '');

    await browser.close();
    const priceStockIDX = JSON.parse(content);

    // Set redis 3 minutes
    const ttlStock = getTTLUntilNextMorningStock()
    await redisSet(keyCacheRedis, JSON.stringify(priceStockIDX), ttlStock);

    return priceStockIDX;
}