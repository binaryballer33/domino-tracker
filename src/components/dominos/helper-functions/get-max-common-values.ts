import type { DominoEye } from "@/types/domino"
import type EyeStat from "@/types/eye-stats"

export default function getMaxCommonValues(stats: EyeStat[]): DominoEye[] {
    const maxRemaining = Math.max(...stats.map((s) => s.remaining))
    const values = stats.filter((stat) => stat.remaining === maxRemaining).map((stat) => stat.value)
    return values
}
