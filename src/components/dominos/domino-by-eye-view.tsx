"use client"

import Domino from "./domino"

type DominoByEyeProps = {
    dominoes: {
        first: number
        id: string
        index: number
        played: boolean
        second: number
    }[]
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
                (domino) => domino.first === eyeValue || domino.second === eyeValue,
            )

            // Sort them by the other value (or by the same value for doubles)
            return matchingDominoes.sort((a, b) => {
                const aOtherValue = a.first === eyeValue ? a.second : a.first
                const bOtherValue = b.first === eyeValue ? b.second : b.first
                return aOtherValue - bOtherValue
            })
        })

    const isDominoHighlighted = (domino: { first: number; second: number }) => {
        if (highlightedValue === null) return false
        return domino.first === highlightedValue || domino.second === highlightedValue
    }

    return (
        <div className="space-y-6">
            {dominoesByEye.map((eyeDominoes, eyeValue) => (
                <div className="space-y-2" key={eyeValue}>
                    <div className="flex flex-wrap gap-2">
                        {eyeDominoes.map((domino) => {
                            // Ensure the eye value is shown first
                            const first = domino.first === eyeValue ? domino.first : domino.second
                            const second = domino.first === eyeValue ? domino.second : domino.first

                            return (
                                <div className="w-16" key={domino.id}>
                                    <Domino
                                        first={first}
                                        highlighted={isDominoHighlighted(domino)}
                                        onClick={() => onToggle(domino.index)}
                                        played={domino.played}
                                        second={second}
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
