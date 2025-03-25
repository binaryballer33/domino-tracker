"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import StatsPanel from "@/components/dominos/domino-stats"
import calculateEyeStats from "@/components/dominos/helper-functions/calculate-stats"
import createDominoes from "@/components/dominos/helper-functions/create-dominos"
import resetGame from "@/components/dominos/helper-functions/reset-game"

import DominoViewTabs from "./blocks/domino-view-tabs"
import GameInforAndControls from "./blocks/game-info-and-controls"

export default function HomeView() {
    const [dominoes, setDominoes] = useState(createDominoes())
    const [highlightedValue, setHighlightedValue] = useState<null | number>(null)

    const playedCount = dominoes.filter((d) => d.played).length
    const remainingCount = dominoes.length - playedCount

    const eyeStats = calculateEyeStats(dominoes)

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="mx-auto w-full max-w-6xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl md:text-3xl">Domino Tracker</CardTitle>
                    <CardDescription className="text-center">
                        Click On Dominoes To Mark/Unmark Them As Played
                    </CardDescription>

                    <GameInforAndControls
                        playedCount={playedCount}
                        remainingCount={remainingCount}
                        resetGame={() => resetGame({ setDominoes, setHighlightedValue })}
                    />
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Dominoes section */}
                        <DominoViewTabs
                            dominoes={dominoes}
                            highlightedValue={highlightedValue}
                            setDominoes={setDominoes}
                        />

                        {/* Stats section */}
                        <StatsPanel activeValue={highlightedValue} onHover={setHighlightedValue} stats={eyeStats} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <GameInforAndControls
                        playedCount={playedCount}
                        remainingCount={remainingCount}
                        resetGame={() => resetGame({ setDominoes, setHighlightedValue })}
                    />
                </CardFooter>
            </Card>
        </div>
    )
}
