import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import Environment from '../../helper/constan/environment';

puppeteer.use(StealthPlugin());

export async function getIHSGData(maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu'
                ]
            });

            const page = await browser.newPage();
            
            await page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
            );

            await page.goto(Environment.URL_API_IHSG, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            let content = await page.content();
            await browser.close();

            // Parse content
            content = content.replace(/<html>.*?<pre>/, '').replace(/<\/pre>.*<\/html>/, '');
            
            return JSON.parse(content);

        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait before retry
        }
    }
}