"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import DominoDots from "./domino-dots"

type EyeStat = {
    dominoes: string[]
    played: number
    remaining: number
    total: number
    value: number
}

type StatsPanelProps = {
    activeValue: null | number
    onHover: (value: null | number) => void
    stats: EyeStat[]
}

export default function StatsPanel(props: StatsPanelProps) {
    const { activeValue, onHover, stats } = props

    const mostCommonValue = getMostCommonValue(stats)
    const leastCommonValue = getLeastCommonValue(stats)

    return (
        <div className="space-y-4">
            <h3 className="text-center text-lg font-medium">Statistics</h3>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Eye Values Remaining</CardTitle>
                    <Separator className="my-2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {stats.map((stat) => (
                            <TooltipProvider delayDuration={100} key={stat.value}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            className={`cursor-pointer rounded-md p-2 transition-colors ${
                                                activeValue === stat.value ? "bg-primary/10" : "hover:bg-muted"
                                            }`}
                                            onMouseEnter={() => onHover(stat.value)}
                                            onMouseLeave={() => onHover(null)}
                                        >
                                            <div className="mb-1 flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                                                    <DominoDots value={stat.value} />
                                                </div>
                                                <div className="flex-1 font-medium">
                                                    {stat.remaining} / {stat.total} Remaining
                                                </div>
                                            </div>
                                            <Progress className="h-2" value={(stat.remaining / stat.total) * 100} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-[200px]" side="right">
                                        <p className="mb-1 font-medium">Remaining Dominoes With {stat.value}:</p>
                                        <div className="text-xs">
                                            {stat.dominoes.length > 0 ? (
                                                stat.dominoes.map((d) => <div key={d}>{d}</div>)
                                            ) : (
                                                <div>None Remaining</div>
                                            )}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Probability Analysis</CardTitle>
                    <Separator className="my-2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span>Most Common Remaining:</span>
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                                    <DominoDots value={mostCommonValue} />
                                </div>
                                <span className="font-medium">{getMaxRemainingCount(stats)}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Least Common Remaining:</span>
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                                    <DominoDots value={leastCommonValue} />
                                </div>
                                <span className="font-medium">{getMinRemainingCount(stats)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span>Doubles Remaining:</span>
                            <span className="font-medium">{getDoublesRemaining(stats)} / 7</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Heavy Dominoes ( 10+ Pips ):</span>
                            <span className="font-medium">{getHeavyDominoesRemaining(stats)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Helper functions for statistics
function getMostCommonValue(stats: EyeStat[]): number {
    return stats.reduce((max, stat) => (stat.remaining > stats[max].remaining ? stat.value : max), 0)
}

function getLeastCommonValue(stats: EyeStat[]): number {
    return stats.reduce(
        (min, stat) => (stat.remaining < stats[min].remaining && stat.remaining > 0 ? stat.value : min),
        0,
    )
}

function getMaxRemainingCount(stats: EyeStat[]): number {
    return Math.max(...stats.map((s) => s.remaining))
}

function getMinRemainingCount(stats: EyeStat[]): number {
    const nonZeroRemaining = stats.filter((s) => s.remaining > 0)
    return nonZeroRemaining.length ? Math.min(...nonZeroRemaining.map((s) => s.remaining)) : 0
}

function getDoublesRemaining(stats: EyeStat[]): number {
    // Count actual doubles remaining by checking their IDs
    const doubleIds = ["0-0", "1-1", "2-2", "3-3", "4-4", "5-5", "6-6"]
    let count = 0

    stats.forEach((stat) => {
        const doubleId = `${stat.value}-${stat.value}`
        if (doubleIds.includes(doubleId) && stat.dominoes.includes(doubleId)) {
            count += 1
        }
    })

    return count
}

function getHeavyDominoesRemaining(stats: EyeStat[]): number {
    // Approximation - higher values are more likely to be in heavy dominoes
    return Math.floor((stats[4].remaining + stats[5].remaining + stats[6].remaining) / 2)
}
