import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import type { KnownAddressInfo } from '../types.ts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

let knownAddressesCache: KnownAddressInfo[] | null = null

function loadKnownAddresses(): KnownAddressInfo[] {
    if (knownAddressesCache) return knownAddressesCache
    try {
        const data = readFileSync(join(__dirname, 'knownAddresses.json'), 'utf8')
        knownAddressesCache = JSON.parse(data)
        return knownAddressesCache || []
    } catch {
        return []
    }
}

export function lookupKnownAddress(address: string): string | null {
    const list = loadKnownAddresses()
    const entry = list.find((a) => a.address.toLowerCase() === address.toLowerCase())
    return entry ? entry.label : null
}
