import puppeteer, { Browser, Page } from "puppeteer";

const PuppetterGetContentHtml = async():Promise<{browser: Browser, page: Page}>  => {
    const browser = await puppeteer.launch({
        headless: true, // Test dengan false dulu
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
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

    return {browser, page};
}

export default PuppetterGetContentHtml;
