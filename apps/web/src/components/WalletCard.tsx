
'use client'

import type { WalletInfo } from '@/types'

interface WalletCardProps {
    wallet: WalletInfo
}

function truncateAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatTime(timestamp: number | null): string {
    if (!timestamp) return 'No alerts yet'
    const diffMs = Date.now() - timestamp
    const diffMin = Math.floor(diffMs / 60_000)

    if (diffMin < 1) return 'Just now'
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`
    return new Date(timestamp).toLocaleDateString()
}

function getIntentConfig(intent: string): { label: string; className: string } {
    switch (intent) {
        case 'CEX_DEPOSIT':
            return { label: 'CEX Deposit', className: 'bg-black text-white' }
        case 'ACCUMULATION':
            return { label: 'Accumulation', className: 'bg-green-600 text-white' }
        case 'DISTRIBUTION':
            return { label: 'Distribution', className: 'bg-red-600 text-white' }
        default:
            return { label: 'Unknown', className: 'bg-gray-500 text-white' }
    }
}

export default function WalletCard({ wallet }: WalletCardProps) {
    const historyCount = wallet.historyCount ?? 0
    const isBaseline = historyCount < 5
    const intentConfig = getIntentConfig(wallet.intent)

    return (
        <div className={`bg-white border-4 border-black p-5 flex flex-col gap-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#000] shadow-[4px_4px_0px_#000] ${isBaseline ? 'bg-gray-50' : ''}`}>
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-base font-bold text-blue-600 underline decoration-2 underline-offset-2">{truncateAddress(wallet.address)}</span>
                    {wallet.label && (
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{wallet.label}</span>
                    )}
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-black uppercase border-2 border-black ${intentConfig.className}`}>
                    {intentConfig.label}
                </span>
            </div>

            <div className="flex-1">
                {isBaseline ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">⏳</span>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase text-black">Building baseline...</span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">
                                    {historyCount}/5 scans collected
                                </span>
                            </div>
                        </div>
                        <div className="h-3 bg-gray-200 border-2 border-black relative overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${(historyCount / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Last Alert</span>
                            <span className="text-xs font-black text-black" suppressHydrationWarning>
                                {formatTime(wallet.lastAlertTime ?? null)}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Scans</span>
                            <span className="text-xs font-black text-black">{historyCount}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
