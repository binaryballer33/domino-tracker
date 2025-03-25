import type { DominoEye } from "@/types/domino"

type EyeStat = {
    dominoes: string[]
    played: number
    remaining: number
    total: number
    value: DominoEye
}

export default EyeStat
