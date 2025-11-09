
import Redis from "ioredis";
import Environment from "../helper/constan/environment";

const clientRedis = new Redis({
    port: Environment.REDIS_PORT as number,
    host: Environment.REDIS_HOST,
});

export async function redisSet(key: string, value: string, ttl = 60) {
    await clientRedis.set(key, value, "EX", ttl)
};

export async function redisGet(key: string) {
    return await clientRedis.get(key)
};

export async function redisDelete(key: string) {
    return await clientRedis.del(key)
};

export default clientRedis;

