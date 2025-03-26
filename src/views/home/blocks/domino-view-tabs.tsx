import type TDomino from "@/types/domino"
import type { Dispatch, SetStateAction } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Domino from "@/components/dominos/domino"
import DominoByEyeView from "@/components/dominos/domino-by-eye-view"

type DominoViewTabsProps = {
    dominoes: TDomino[]
    highlightedValue: null | number
    setDominoes: Dispatch<SetStateAction<TDomino[]>>
}

export default function DominoViewTabs(props: DominoViewTabsProps) {
    const { dominoes, highlightedValue, setDominoes } = props

    const toggleDomino = (index: number) => {
        const newDominoes = [...dominoes]
        newDominoes[index].played = !newDominoes[index].played
        setDominoes(newDominoes)
    }

    const isDominoHighlighted = (domino: TDomino) => {
        if (highlightedValue === null) return false
        return domino.firstEye === highlightedValue || domino.secondEye === highlightedValue
    }

    const isDominoPlayed = (domino: TDomino) => domino.played

    const dominoesWithIndex = dominoes.map((domino, index) => ({
        ...domino,
        index,
    }))

    return (
        <div>
            <Tabs className="mb-6" defaultValue="by-eye">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="by-eye">View 1</TabsTrigger>
                    <TabsTrigger value="all">View 2</TabsTrigger>
                </TabsList>

                <TabsContent className="mt-4" value="by-eye">
                    <DominoByEyeView
                        dominoes={dominoesWithIndex}
                        highlightedValue={highlightedValue}
                        onToggle={toggleDomino}
                    />
                </TabsContent>

                <TabsContent className="mt-4" value="all">
                    <div className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-5">
                        {dominoes.map((domino, index) => (
                            <Domino
                                firstEye={domino.firstEye}
                                highlighted={isDominoHighlighted(domino)}
                                key={domino.id}
                                onClick={() => toggleDomino(index)}
                                played={isDominoPlayed(domino)}
                                secondEye={domino.secondEye}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
