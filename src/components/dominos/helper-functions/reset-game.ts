import type Domino from "@/types/domino"

import createDominos from "./create-dominos"

type ResetGameProps = {
    setDominos: (dominos: Domino[]) => void
    setHighlightedValue: (value: null | number) => void
}

export default function resetGame(props: ResetGameProps) {
    const { setDominos, setHighlightedValue } = props

    setDominos(createDominos())
    setHighlightedValue(null)
}
