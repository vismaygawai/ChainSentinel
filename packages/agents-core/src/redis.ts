
import { EventEmitter } from 'events';

class LocalRedisMock extends EventEmitter {
    private storage: Map<string, any> = new Map();

    async set(key: string, value: any, mode?: string, duration?: number, flag?: string) {
        this.storage.set(key, value);
        if (mode === 'EX' || mode === 'PX') {
            const ttl = mode === 'EX' ? duration! * 1000 : duration!;
            setTimeout(() => this.storage.delete(key), ttl);
        }
        return 'OK';
    }

    async get(key: string) {
        return this.storage.get(key) || null;
    }

    async exists(key: string) {
        return this.storage.has(key) ? 1 : 0;
    }

    async del(...keys: string[]) {
        keys.forEach(k => this.storage.delete(k));
        return keys.length;
    }

    async lpush(key: string, ...values: string[]) {
        const list = this.storage.get(key) || [];
        list.unshift(...values);
        this.storage.set(key, list);
        return list.length;
    }

    async lrange(key: string, start: number, stop: number) {
        const list = this.storage.get(key) || [];
        if (stop === -1) return list.slice(start);
        return list.slice(start, stop + 1);
    }

    async keys(pattern: string) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return Array.from(this.storage.keys()).filter(k => regex.test(k));
    }

    pipeline() {
        return {
            exec: async () => [],
            lpush: (key: string, val: string) => this.lpush(key, val),
            ltrim: (key: string, start: number, stop: number) => {
                const list = this.storage.get(key) || [];
                this.storage.set(key, list.slice(start, stop + 1));
            }
        } as any;
    }

    async quit() {
        return 'OK';
    }
}

let instance: LocalRedisMock | null = null;

export const getRedisClient = () => {
    if (!instance) {
        instance = new LocalRedisMock();
        console.log("⚡ [Shim] Local In-Memory Redis initialized");
    }
    return instance;
};

export const historyKey = (pipeline: string, address: string) => `hist:${pipeline}:${address}`;
export const cooldownKey = (pipeline: string, address: string) => `cd:${pipeline}:${address}`;
