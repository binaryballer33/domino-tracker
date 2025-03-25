"use client"

import type EyeStat from "@/types/eye-stats"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import DominoDots from "./domino-dot"
import getDoublesRemaining from "./helper-functions/get-doubles-remaining"
import getHeavyDominoesRemaining from "./helper-functions/get-heavy-domino-remaining"
import getLeastCommonValues from "./helper-functions/get-least-common-values"
import getMaxCommonValues from "./helper-functions/get-max-common-values"
import getMaxRemainingCount from "./helper-functions/get-max-remaining-domino-count"
import getMinRemainingCount from "./helper-functions/get-min-remaining-domino-count"

type StatsPanelProps = {
    activeValue: null | number
    onHover: (value: null | number) => void
    stats: EyeStat[]
}

export default function StatsPanel(props: StatsPanelProps) {
    const { activeValue, onHover, stats } = props

    const mostCommonValues = getMaxCommonValues(stats)
    const leastCommonValues = getLeastCommonValues(stats)

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
                                                    <DominoDots dominoEye={stat.value} />
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
                            <div className="flex items-center">
                                <div className="mr-2 flex items-center gap-2">
                                    {mostCommonValues.map((value) => (
                                        <div
                                            className="flex h-6 w-6 items-center justify-center rounded-md bg-muted"
                                            key={value}
                                        >
                                            <DominoDots dominoEye={value} />
                                        </div>
                                    ))}
                                </div>
                                <span className="font-medium">{getMaxRemainingCount(stats)}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Least Common Remaining:</span>
                            <div className="flex items-center">
                                <div className="mr-2 flex items-center gap-2">
                                    {leastCommonValues.map((value) => (
                                        <div
                                            className="flex h-6 w-6 items-center justify-center rounded-md bg-muted"
                                            key={value}
                                        >
                                            <DominoDots dominoEye={value} />
                                        </div>
                                    ))}
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
