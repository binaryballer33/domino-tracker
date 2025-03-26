import type TDomino from "@/types/domino"
import type { Dispatch, SetStateAction } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import DominoRowsSortedByEyeView from "@/components/dominos/domino-rows-sorted-by-eye-view"
import DominoSortedView from "@/components/dominos/domino-sorted-view"

type DominoViewTabsProps = {
    dominos: TDomino[]
    highlightedValue: null | number
    setDominoes: Dispatch<SetStateAction<TDomino[]>>
}

export default function DominoViewTabs(props: DominoViewTabsProps) {
    const { dominos, highlightedValue, setDominoes } = props

    const toggleDomino = (index: number) => {
        const newDominoes = [...dominos]
        newDominoes[index].played = !newDominoes[index].played
        setDominoes(newDominoes)
    }

    const isDominoHighlighted = (domino: TDomino) => {
        if (highlightedValue === null) return false
        return domino.firstEye === highlightedValue || domino.secondEye === highlightedValue
    }

    const isDominoPlayed = (domino: TDomino) => domino.played

    const dominoesWithIndex = dominos.map((domino, index) => ({
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
                    <DominoRowsSortedByEyeView
                        dominos={dominoesWithIndex}
                        isDominoHighlighted={isDominoHighlighted}
                        isDominoPlayed={isDominoPlayed}
                        onToggle={toggleDomino}
                    />
                </TabsContent>

                <TabsContent className="mt-4" value="all">
                    <DominoSortedView
                        dominos={dominoesWithIndex}
                        isDominoHighlighted={isDominoHighlighted}
                        isDominoPlayed={isDominoPlayed}
                        toggleDomino={toggleDomino}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
