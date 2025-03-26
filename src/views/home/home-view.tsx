"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import StatsPanel from "@/components/dominos/domino-stats"
import calculateEyeStats from "@/components/dominos/helper-functions/calculate-stats"
import createDominos from "@/components/dominos/helper-functions/create-dominos"

import DominoViewTabs from "./blocks/domino-view-tabs"
import ResetGame from "./blocks/reset-game"

export default function HomeView() {
    const [dominos, setDominos] = useState(createDominos())
    const [highlightedValue, setHighlightedValue] = useState<null | number>(null)

    const eyeStats = calculateEyeStats(dominos)

    return (
        <div className="container mx-auto px-4 py-2">
            <Card className="mx-auto w-full max-w-6xl">
                <CardHeader>
                    <div className="flex items-center justify-center gap-4">
                        <CardTitle className="text-center text-2xl md:text-3xl">Domino Tracker</CardTitle>
                        <ResetGame setDominos={setDominos} setHighlightedValue={setHighlightedValue} />
                    </div>
                    <CardDescription className="text-center">
                        Click On Dominos To Mark / Unmark Them As Played
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <DominoViewTabs dominos={dominos} highlightedValue={highlightedValue} setDomino={setDominos} />

                        <StatsPanel
                            activeValue={highlightedValue}
                            dominos={dominos}
                            onHover={setHighlightedValue}
                            stats={eyeStats}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
