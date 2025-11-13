import puppeteer from "puppeteer";
import { redisGet, redisSet } from "../../config/redis";
import Environment from "../../helper/constan/environment";
import { getTTLUntilNextMorningStock } from "../../helper/ttl-cache";

export async function getIHSGData() {
    // Cek data redis
    const keyCacheRedis = 'price-stock-idx';
    const cache = await redisGet(keyCacheRedis);
    if (cache) {
        return JSON.parse(cache)
    }

    const browser = await puppeteer.launch({
        headless: Environment.DEBUG === 'active' ? false : true, // Test dengan false dulu
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--enable-features=NetworkService',
            '--disable-features=IsolateOrigins,site-per-process'
        ]
    });

    const page = await browser.newPage();

    // Pastikan cookies enabled di browser context
    await page.evaluateOnNewDocument(() => {
        // Force cookies enabled
        Object.defineProperty(navigator, 'cookieEnabled', {
            get: () => true,
            configurable: true
        });
    });

    // Set user agent agar tidak terdeteksi bot
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

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