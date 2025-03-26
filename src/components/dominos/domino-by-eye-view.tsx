"use client"

import type { DominoWithIndex } from "@/types/domino"

import Domino from "./domino"
import getSevenRowsOfSortedDominos from "./helper-functions/get-seven-rows-sorted-dominos"

type DominoByEyeViewProps = {
    dominoes: DominoWithIndex[]
    highlightedValue: null | number
    onToggle: (index: number) => void
}

export default function DominoByEyeView(props: DominoByEyeViewProps) {
    const { dominoes, highlightedValue, onToggle } = props

    // Create array of array of domino objects [ [ {domino}, {domino}, {domino} ], [ {domino}, {domino}, {domino}, ... ] ]
    const sortedRowsOfDominos: DominoWithIndex[][] = getSevenRowsOfSortedDominos(dominoes)

    const isDominoHighlighted = (domino: DominoWithIndex) => {
        if (highlightedValue === null) return false
        return domino.firstEye === highlightedValue || domino.secondEye === highlightedValue
    }

    return (
        <div className="space-y-6">
            {sortedRowsOfDominos.map((sortedRow, eyeValue) => (
                <div className="space-y-2" key={eyeValue}>
                    <div className="flex flex-wrap gap-2">
                        {sortedRow.map((domino) => {
                            // Ensure the eye value is shown first
                            const first = domino.firstEye === eyeValue ? domino.firstEye : domino.secondEye
                            const second = domino.firstEye === eyeValue ? domino.secondEye : domino.firstEye

                            return (
                                <div className="w-16" key={domino.id}>
                                    <Domino
                                        firstEye={first}
                                        highlighted={isDominoHighlighted(domino)}
                                        onClick={() => onToggle(domino.index)}
                                        played={domino.played}
                                        secondEye={second}
                                    />
                                    <div className="mt-1 text-center text-xs">
                                        {first}-{second}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
