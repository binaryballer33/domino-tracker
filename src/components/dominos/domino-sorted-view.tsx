import type TDomino from "@/types/domino"

import Domino from "./domino"

type DominoSortedViewProps = {
    dominos: TDomino[]
    isDominoHighlighted: (domino: TDomino) => boolean
    isDominoPlayed: (domino: TDomino) => boolean
    toggleDomino: (index: number) => void
}

export default function DominoSortedView(props: DominoSortedViewProps) {
    const { dominos, isDominoHighlighted, isDominoPlayed, toggleDomino } = props

    return (
        <div className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {dominos.map((domino, index) => (
                <Domino
                    firstEye={domino.firstEye}
                    highlighted={isDominoHighlighted(domino)}
                    key={domino.id}
                    onClick={() => toggleDomino(index)}
                    played={isDominoPlayed(domino)}
                    secondEye={domino.secondEye}
                    size="xl"
                />
            ))}
        </div>
    )
}
