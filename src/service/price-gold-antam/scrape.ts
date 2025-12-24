import axios from "axios";
import * as cheerio from 'cheerio';
import Environment from "../../helper/constan/environment";
import { redisGet, redisSet } from "../../config/redis";
import { getTTLUntilNextMorningGold } from "../../helper/ttl-cache";
import logger from "../../config/logger";

export type ScrapeGoldType = 'all' | 'antam' | 'g24';

export async function scrapeHargaEmas() {
    try {
        // Cek data redis
        const keyCacheRedis = `price-gold-antamv1`;
        const cache = await redisGet(keyCacheRedis);
        if (cache) {
            return JSON.parse(cache)
        }

        const response = await axios({
            method: 'GET',
            url: Environment.URL_API_ANTAM,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Cookie': 'XSRF-TOKEN=eyJpdiI6IklHZmVab1F3a1NuMzNmaUNNcHI4clE9PSIsInZhbHVlIjoiSjM4c1BCYld2RW9WQ3RZUUFjeTZuajdNazdvVG5tOUU5VTFER2pLM0M4akFlUlwvR2t1aHl2VHJCSVBsUjZwK0R0cXBNXC9YNlhUSjdzRkxkTnRhXC9JTVE9PSIsIm1hYyI6IjAzNTBkM2I3YWI2NjVmYjc2YzNjNmE2M2IyYjQ5Y2E0OGI2NjQzNzIyYTUxMDQ0NGIzNjUyOWIwOGFiOWQxZTEifQ%3D%3D; logammulia_session=hA2tXOM7YnUabHcbFjOtUYG9WC9y98vozsLPDeiX'
            }
        });
        const html = response.data;

        const $ = cheerio.load(html);

        const dataEmas: Array<any> = [];

        // ANTAM
        const dataRowsSelector = '#ANTAM .grid-cols-5.divide-x';
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

        // Set redis 1 hours
        const ttlGold = getTTLUntilNextMorningGold()
        await redisSet(keyCacheRedis, JSON.stringify(dataEmas), ttlGold);

        return dataEmas;
    } catch (error) {
        logger.error({ message: `Terjadi kesalahan saat scraping:`, error });
        throw error;
    }
}

export async function scrapeHargaEmasV2(typeGold: ScrapeGoldType) {
    try {
        // Cek data redis
        const keyCacheRedis = `price-gold-${typeGold}`;
        const cache = await redisGet(keyCacheRedis);
        if (cache) {
            return JSON.parse(cache)
        }

        const typeValidGold = ['all', 'antam', 'g24'];
        if (!typeValidGold.includes(typeGold)) return [];

        const response = await axios({
            method: 'GET',
            url: Environment.URL_API_ANTAM,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Cookie': 'XSRF-TOKEN=eyJpdiI6IklHZmVab1F3a1NuMzNmaUNNcHI4clE9PSIsInZhbHVlIjoiSjM4c1BCYld2RW9WQ3RZUUFjeTZuajdNazdvVG5tOUU5VTFER2pLM0M4akFlUlwvR2t1aHl2VHJCSVBsUjZwK0R0cXBNXC9YNlhUSjdzRkxkTnRhXC9JTVE9PSIsIm1hYyI6IjAzNTBkM2I3YWI2NjVmYjc2YzNjNmE2M2IyYjQ5Y2E0OGI2NjQzNzIyYTUxMDQ0NGIzNjUyOWIwOGFiOWQxZTEifQ%3D%3D; logammulia_session=hA2tXOM7YnUabHcbFjOtUYG9WC9y98vozsLPDeiX'
            }
        });
        const html = response.data;

        const $ = cheerio.load(html);

        const dataEmas: Array<any> = [];

        // G24
        if (typeGold === 'antam' || typeGold === 'all') {
            const goldG24: Record<string, any> = {
                type: 'G24',
                data: []
            }
            const dataRowsSelectorG24 = '[id="GALERI 24"] .grid-cols-5.divide-x';

            $(dataRowsSelectorG24).each((index, element) => {
                if (index === 0) return;

                const columns = $(element).find('> div');

                const berat = $(columns[0]).text().trim();
                const hargaJual = $(columns[1]).text().trim();
                const hargaBuyback = $(columns[2]).text().trim();

                goldG24.data.push({
                    berat: `${berat}`,
                    harga_jual: hargaJual.replace(/Rp\s*/g, '').trim(),
                    harga_buyback: hargaBuyback.replace(/Rp\s*/g, '').trim()
                });
            });
            dataEmas.push(goldG24);
        }

        // ANTAM
        if (typeGold === 'antam' || typeGold === 'all') {
            const dataRowsSelector = '#ANTAM .grid-cols-5.divide-x';
            const goldAntam: Record<string, any> = {
                type: 'ANTAM',
                data: []
            }
            $(dataRowsSelector).each((index, element) => {
                if (index === 0) return;

                const columns = $(element).find('> div');

                const berat = $(columns[0]).text().trim();
                const hargaJual = $(columns[1]).text().trim();
                const hargaBuyback = $(columns[2]).text().trim();

                goldAntam.data.push({
                    berat: `${berat}`,
                    harga_jual: hargaJual.replace(/Rp\s*/g, '').trim(),
                    harga_buyback: hargaBuyback.replace(/Rp\s*/g, '').trim()
                });
            });
            dataEmas.push(goldAntam);
        }

        // Set redis 30 minutes
        const ttlGold = 1800
        await redisSet(keyCacheRedis, JSON.stringify(dataEmas), ttlGold);

        return dataEmas;
    } catch (error) {
        logger.error({ message: `Terjadi kesalahan saat scraping:`, error });
        throw error;
    }
}