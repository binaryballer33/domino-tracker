"use client"

import type { DominoWithIndex } from "@/types/domino"

import Domino from "./domino"

type DominoByEyeProps = {
    dominoes: DominoWithIndex[]
    highlightedValue: null | number
    onToggle: (index: number) => void
}

export default function DominoByEye(props: DominoByEyeProps) {
    const { dominoes, highlightedValue, onToggle } = props

    // Create arrays for each eye value (0-6)
    const dominoesByEye = Array(7)
        .fill(null)
        .map((_, eyeValue) => {
            // Find all dominoes that contain this eye value
            const matchingDominoes = dominoes.filter(
                (domino) => domino.firstEye === eyeValue || domino.secondEye === eyeValue,
            )

            // Sort them by the other value (or by the same value for doubles)
            return matchingDominoes.sort((a, b) => {
                const aOtherValue = a.firstEye === eyeValue ? a.secondEye : a.firstEye
                const bOtherValue = b.firstEye === eyeValue ? b.secondEye : b.firstEye
                return aOtherValue - bOtherValue
            })
        })

    const isDominoHighlighted = (domino: DominoWithIndex) => {
        if (highlightedValue === null) return false
        return domino.firstEye === highlightedValue || domino.secondEye === highlightedValue
    }

    return (
        <div className="space-y-6">
            {dominoesByEye.map((eyeDominoes, eyeValue) => (
                <div className="space-y-2" key={eyeValue}>
                    <div className="flex flex-wrap gap-2">
                        {eyeDominoes.map((domino) => {
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
