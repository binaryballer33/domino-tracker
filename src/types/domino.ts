export type DominoEye = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type DominoDotSize = "lg" | "md" | "sm" | "xl" | "xs"

type Domino = {
    firstEye: DominoEye
    id: string
    played: boolean
    secondEye: DominoEye
}

export type DominoWithIndex = {
    index: number
} & Domino

export default Domino
