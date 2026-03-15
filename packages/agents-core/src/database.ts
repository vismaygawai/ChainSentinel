
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'local_db.json');

interface DBData {
    wallets: any[];
    positions: any[];
    users: any[];
}

function readDB(): DBData {
    if (!fs.existsSync(DB_PATH)) {
        return { wallets: [], positions: [], users: [] };
    }
    try {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    } catch {
        return { wallets: [], positions: [], users: [] };
    }
}

function writeDB(data: DBData) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const prisma = {
    wallet: {
        findMany: async () => readDB().wallets,
        create: async ({ data }: any) => {
            const db = readDB();
            db.wallets.push(data);
            writeDB(db);
            return data;
        },
        deleteMany: async () => {
            const db = readDB();
            db.wallets = [];
            writeDB(db);
        }
    },
    user: {
        count: async () => readDB().users.length
    }
} as any;
