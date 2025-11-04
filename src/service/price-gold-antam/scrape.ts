import axios from "axios";
import * as cheerio from 'cheerio';

// URL target
const url = 'https://galeri24.co.id/harga-emas';

async function scrapeHargaEmas() {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Cookie': 'XSRF-TOKEN=eyJpdiI6IklHZmVab1F3a1NuMzNmaUNNcHI4clE9PSIsInZhbHVlIjoiSjM4c1BCYld2RW9WQ3RZUUFjeTZuajdNazdvVG5tOUU5VTFER2pLM0M4akFlUlwvR2t1aHl2VHJCSVBsUjZwK0R0cXBNXC9YNlhUSjdzRkxkTnRhXC9JTVE9PSIsIm1hYyI6IjAzNTBkM2I3YWI2NjVmYjc2YzNjNmE2M2IyYjQ5Y2E0OGI2NjQzNzIyYTUxMDQ0NGIzNjUyOWIwOGFiOWQxZTEifQ%3D%3D; logammulia_session=hA2tXOM7YnUabHcbFjOtUYG9WC9y98vozsLPDeiX'
            }
        });
        const html = response.data;

        const $ = cheerio.load(html);

        const dataEmas: Array<any> = [];

        const dataRowsSelector = '#ANTAM .grid-cols-5.divide-x';

        const tanggalUpdate = $('#ANTAM .text-lg.font-semibold').text().trim();
        console.log(`\n📅 ${tanggalUpdate}`);

        $(dataRowsSelector).each((index, element) => {
            if (index === 0) return;

            const columns = $(element).find('> div');

            const berat = $(columns[0]).text().trim();
            const hargaJual = $(columns[1]).text().trim();
            const hargaBuyback = $(columns[2]).text().trim();

            dataEmas.push({
                berat: `${berat}`,
                harga_jual: hargaJual.replace(/Rp\s*/g, '').trim(),
                harga_buyback: hargaBuyback.replace(/Rp\s*/g, '').trim()
            });
        });

        return dataEmas;
    } catch (error) {
        console.error(`❌ Terjadi kesalahan saat scraping:`, error);
        throw error;
    }
}

export default scrapeHargaEmas;