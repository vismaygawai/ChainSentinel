
'use client'

import type { LiquidShieldPosition, RiskTier } from '@/types'

interface PositionCardProps {
    position: LiquidShieldPosition
}

function truncateAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatUSD(value: string): string {
    const num = parseFloat(value)
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`
    return `$${num.toFixed(2)}`
}

function getTierConfig(tier: RiskTier): { label: string; className: string } {
    switch (tier) {
        case 'CRITICAL':
            return { label: 'CRITICAL', className: 'bg-red-600 text-white' }
        case 'DANGER':
            return { label: 'DANGER', className: 'bg-orange-500 text-white' }
        case 'WARNING':
            return { label: 'WARNING', className: 'bg-yellow-400 text-black' }
        default:
            return { label: 'SAFE', className: 'bg-green-500 text-white' }
    }
}

function calculateGaugeFill(hf: number): number {
    const min = 1.0
    const max = 3.0
    if (hf <= min) return 0
    if (hf >= max) return 100
    return ((hf - min) / (max - min)) * 100
}

export default function PositionCard({ position }: PositionCardProps) {
    const latestSnapshot = position.snapshots?.[0]
    const hf = latestSnapshot ? parseFloat(latestSnapshot.healthFactor) : 0

    let tier: RiskTier
    if (hf < 1.1) tier = 'CRITICAL'
    else if (hf < 1.3) tier = 'DANGER'
    else if (hf < 2.0) tier = 'WARNING'
    else tier = 'SAFE'

    const tierConfig = getTierConfig(tier)
    const gaugeFill = calculateGaugeFill(hf)

    return (
        <div className={`bg-white border-4 border-black p-6 flex flex-col gap-6 transition-all hover:shadow-[7px_7px_0px_#000] shadow-[5px_5px_0px_#000] relative ${tier === 'CRITICAL' ? 'animate-pulse' : ''}`}>
            <div className="flex justify-between items-start">
                <span className="font-mono text-base font-bold text-blue-600 underline decoration-4 underline-offset-4">{truncateAddress(position.address)}</span>
                <div className={`px-3 py-1 text-xs font-black uppercase border-3 border-black ${tierConfig.className}`}>
                    {tierConfig.label}
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Health Factor</div>
                <div className="text-6xl font-black leading-none text-black [text-shadow:4px_4px_0px_theme(colors.blue.200)] transition-all">
                    {hf.toFixed(2)}
                </div>

                <div className="w-full mt-2">
                    <div className="flex justify-between text-[10px] font-black text-gray-400 mb-1">
                        <span>1.0</span>
                        <span>2.0</span>
                        <span>3.0+</span>
                    </div>
                    <div className="w-full h-4 bg-gray-100 border-[3px] border-black relative overflow-hidden">
                        <div
                            className={`h-full transition-all duration-700 ${
                                tier === 'SAFE' ? 'bg-green-500' :
                                tier === 'WARNING' ? 'bg-yellow-400' :
                                'bg-red-600'
                            }`}
                            style={{ width: `${gaugeFill}%` }}
                        />
                        <div
                            className="absolute top-0 w-1 h-full bg-black -translate-x-1/2"
                            style={{ left: `${Math.min(100, Math.max(0, gaugeFill))}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 bg-blue-50 p-4 border-2 border-black">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-900 uppercase">Collateral</span>
                    <span className="font-mono text-sm font-bold text-black">{formatUSD(latestSnapshot?.collateral || '0')}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-900 uppercase">Debt</span>
                    <span className="font-mono text-sm font-bold text-red-600">{formatUSD(latestSnapshot?.debt || '0')}</span>
                </div>
            </div>
        </div>
    )
}
