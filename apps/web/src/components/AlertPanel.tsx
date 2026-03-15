
'use client'

import type { CompoundAlert } from '@/types'

interface AlertPanelProps {
    alerts: CompoundAlert[]
}

function truncateAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function truncateTxHash(hash: string): string {
    return `${hash.slice(0, 10)}...${hash.slice(-6)}`
}

function formatUSD(value: string): string {
    const num = parseFloat(value)
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`
    return `$${num.toFixed(2)}`
}

function formatTimestamp(timestamp: number): string {
    const diffMs = Date.now() - timestamp
    const diffMin = Math.floor(diffMs / 60_000)

    if (diffMin < 1) return 'JUST NOW'
    if (diffMin < 60) return `${diffMin}M AGO`
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}H AGO`
    return new Date(timestamp).toLocaleDateString()
}

function getUrgencyConfig(urgency: string): { label: string; className: string } {
    switch (urgency) {
        case 'CRITICAL':
            return { label: 'CRITICAL', className: 'bg-red-600 text-white' }
        case 'HIGH':
            return { label: 'HIGH', className: 'bg-orange-500 text-white' }
        case 'MEDIUM':
            return { label: 'MEDIUM', className: 'bg-yellow-400 text-black' }
        default:
            return { label: 'LOW', className: 'bg-blue-600 text-white' }
    }
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
    const sortedAlerts = [...alerts].sort((a, b) => {
        if (a.isCorrelated && !b.isCorrelated) return -1
        if (!a.isCorrelated && b.isCorrelated) return 1
        const tsA = a.wwAlert?.timestamp || a.lsAlert?.timestamp || 0
        const tsB = b.wwAlert?.timestamp || b.lsAlert?.timestamp || 0
        return tsB - tsA
    })

    if (sortedAlerts.length === 0) {
        return (
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-10 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-xl font-black uppercase tracking-tight">NO ACTIVE ALERTS</p>
                <p className="text-gray-500 font-bold mt-2">Monitoring the chain for risks...</p>
            </div>
        )
    }

    return (
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col h-full">
            <div className="border-b-4 border-black p-6 flex items-center justify-between bg-white bg-blue-50">
                <h2 className="text-2xl font-black uppercase flex items-center gap-2 tracking-tighter">
                    <span className="text-blue-600">⚡</span>
                    LIVE FEED
                </h2>
                <span className="bg-black text-white px-3 py-1 font-black text-xs uppercase tracking-widest">{alerts.length} SIGNALS</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y-4 divide-black">
                {sortedAlerts.map((alert, idx) => {
                    const urgencyConfig = getUrgencyConfig(alert.combinedUrgency)
                    const ts = alert.wwAlert?.timestamp || alert.lsAlert?.timestamp || Date.now()

                    return (
                        <div
                            key={`${alert.walletAddress}-${ts}-${idx}`}
                            className={`p-6 transition-colors hover:bg-blue-50 ${alert.isCorrelated ? 'bg-blue-50/50' : ''}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {alert.isCorrelated && (
                                        <span className="bg-blue-600 text-white px-2 py-0.5 font-black text-[10px] uppercase tracking-wider border-2 border-black">
                                            COMPOUND
                                        </span>
                                    )}
                                    <span className={`px-2 py-0.5 font-black text-[10px] uppercase tracking-wider border-2 border-black ${urgencyConfig.className}`}>
                                        {urgencyConfig.label}
                                    </span>
                                </div>
                                <span className="text-xs font-black text-gray-500">{formatTimestamp(ts)}</span>
                            </div>

                            <div className="text-lg font-bold leading-tight mb-4 tracking-tight">
                                {alert.isCorrelated ? (
                                    <>
                                        WALLET <span className="font-mono text-blue-600 underline">{truncateAddress(alert.walletAddress)}</span>
                                        {' '}MOVED <strong className="text-black bg-blue-100 px-1 border-b-2 border-blue-600">{formatUSD(alert.wwAlert?.amount || '0')} {alert.wwAlert?.token}</strong>
                                        {' '}TO {alert.wwAlert?.label || 'EXCHANGE'}
                                        {' '}<strong>AND</strong> HF DROPPED TO <strong className="text-red-600 font-black">{parseFloat(alert.lsAlert?.healthFactor || '0').toFixed(3)}</strong>.
                                    </>
                                ) : alert.wwAlert ? (
                                    <>
                                        WHALE <span className="font-mono text-blue-600 underline">{truncateAddress(alert.walletAddress)}</span>
                                        {' '}TRANSFERRED <strong className="text-black bg-blue-50 px-1 border-b-2 border-blue-400">{formatUSD(alert.wwAlert.amount)} {alert.wwAlert.token}</strong>
                                        {' '}— <span className="text-blue-600 uppercase italic font-black">{alert.wwAlert.intent ?? 'UNKNOWN'}</span>.
                                    </>
                                ) : alert.lsAlert ? (
                                    <>
                                        POSITION <span className="font-mono text-blue-600 underline">{truncateAddress(alert.walletAddress)}</span>
                                        {' '}HF IS NOW <strong className="text-red-600 font-black">{parseFloat(alert.lsAlert.healthFactor).toFixed(3)}</strong>
                                        {' '}WITH <strong className="text-black">{formatUSD(alert.lsAlert.debt)}</strong> DEBT.
                                    </>
                                ) : null}
                            </div>

                            {alert.isCorrelated && (
                                <div className="flex items-center gap-6 pt-4 mt-4 border-t-2 border-dashed border-black">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">TXHASH</span>
                                        <span className="font-mono text-xs font-bold">{truncateTxHash(alert.wwAlert?.txHash || '')}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">COLLATERAL</span>
                                        <span className="font-bold text-sm text-green-600">{formatUSD(alert.lsAlert?.collateral || '0')}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
