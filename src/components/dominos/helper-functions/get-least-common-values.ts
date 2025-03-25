import type { DominoEye } from "@/types/domino"
import type EyeStat from "@/types/eye-stats"

import getMinRemainingCount from "./get-min-remaining-domino-count"

export default function getLeastCommonValues(stats: EyeStat[]): DominoEye[] {
    const minRemaining = getMinRemainingCount(stats)
    if (minRemaining === 0) return [0]

    const values = stats.filter((stat) => stat.remaining === minRemaining).map((stat) => stat.value)
    return values
}
