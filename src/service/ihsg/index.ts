import puppeteer from "puppeteer";

export async function getIHSGData() {
    const browser = await puppeteer.launch({
        headless: false, // Test dengan false dulu
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

    await page.goto('https://idx.co.id/primary/TradingSummary/GetStockSummary?length=9999&start=0', {
        waitUntil: 'networkidle2'
    });

    const content = await page.content();
    console.log(content);

    await browser.close();
}