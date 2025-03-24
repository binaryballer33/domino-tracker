"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Domino from "@/components/dominos/domino"
import DominoByEye from "@/components/dominos/domino-by-eye-view"
import StatsPanel from "@/components/dominos/domino-stats"

import GameInforAndControls from "./blocks/game-info-and-controls"

type TDomino = {
    first: number
    id: string
    played: boolean
    second: number
}

export default function HomeView() {
    // Generate all possible domino combinations (0-0 through 6-6)
    const generateDominoes = () => {
        const dominoes: TDomino[] = []
        for (let i = 0; i <= 6; i += 1) {
            for (let j = i; j <= 6; j += 1) {
                dominoes.push({ first: i, id: `${i}-${j}`, played: false, second: j })
            }
        }
        return dominoes
    }

    const [dominoes, setDominoes] = useState(generateDominoes())
    const [highlightedValue, setHighlightedValue] = useState<null | number>(null)

    const toggleDomino = (index: number) => {
        const newDominoes = [...dominoes]
        newDominoes[index].played = !newDominoes[index].played
        setDominoes(newDominoes)
    }

    const resetGame = () => {
        setDominoes(generateDominoes())
        setHighlightedValue(null)
    }

    const playedCount = dominoes.filter((d) => d.played).length
    const remainingCount = dominoes.length - playedCount

    // Calculate stats for each eye value
    const calculateEyeStats = () => {
        const stats = Array(7)
            .fill(0)
            .map((_, i) => ({
                dominoes: [] as string[],
                played: 0,
                remaining: 0,
                total: 0,
                value: i,
            }))

        dominoes.forEach((domino) => {
            // Count first value
            stats[domino.first].total += 1
            if (!domino.played) {
                stats[domino.first].remaining += 1
                stats[domino.first].dominoes.push(domino.id)
            } else {
                stats[domino.first].played += 1
            }

            // If not a double, count second value too
            if (domino.first !== domino.second) {
                stats[domino.second].total += 1
                if (!domino.played) {
                    stats[domino.second].remaining += 1
                    stats[domino.second].dominoes.push(domino.id)
                } else {
                    stats[domino.second].played += 1
                }
            }
        })

        return stats
    }

    const eyeStats = calculateEyeStats()

    const isDominoHighlighted = (domino: TDomino) => {
        if (highlightedValue === null) return false
        return domino.first === highlightedValue || domino.second === highlightedValue
    }

    const isDominoPlayed = (domino: TDomino) => {
        return domino.played
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="mx-auto w-full max-w-6xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl md:text-3xl">Domino Tracker</CardTitle>
                    <CardDescription className="text-center">Click On Dominoes To Mark Them As Played</CardDescription>

                    <GameInforAndControls
                        playedCount={playedCount}
                        remainingCount={remainingCount}
                        resetGame={resetGame}
                    />
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Dominoes section */}
                        <div>
                            <Tabs className="mb-6" defaultValue="by-eye">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="by-eye">View 1</TabsTrigger>
                                    <TabsTrigger value="all">View 2</TabsTrigger>
                                </TabsList>

                                <TabsContent className="mt-4" value="by-eye">
                                    <DominoByEye
                                        dominoes={dominoes.map((domino, index) => ({
                                            ...domino,
                                            index, // Pass index for toggling
                                        }))}
                                        highlightedValue={highlightedValue}
                                        onToggle={toggleDomino}
                                    />
                                </TabsContent>

                                <TabsContent className="mt-4" value="all">
                                    <div className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-5">
                                        {dominoes.map((domino, index) => (
                                            <Domino
                                                first={domino.first}
                                                highlighted={isDominoHighlighted(domino)}
                                                key={domino.id}
                                                onClick={() => toggleDomino(index)}
                                                played={isDominoPlayed(domino)}
                                                second={domino.second}
                                            />
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Stats section */}
                        <div>
                            <StatsPanel activeValue={highlightedValue} onHover={setHighlightedValue} stats={eyeStats} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <GameInforAndControls
                        playedCount={playedCount}
                        remainingCount={remainingCount}
                        resetGame={resetGame}
                    />
                </CardFooter>
            </Card>
        </div>
    )
}
