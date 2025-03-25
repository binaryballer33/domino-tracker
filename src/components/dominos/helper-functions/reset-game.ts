import type Domino from "@/types/domino"

import createDominoes from "./create-dominos"

type ResetGameProps = {
    setDominoes: (dominoes: Domino[]) => void
    setHighlightedValue: (value: null | number) => void
}

export default function resetGame(props: ResetGameProps) {
    const { setDominoes, setHighlightedValue } = props

    setDominoes(createDominoes())
    setHighlightedValue(null)
}
