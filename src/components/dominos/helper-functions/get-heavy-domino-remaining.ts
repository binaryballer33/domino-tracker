import type EyeStat from "@/types/eye-stats"

export default function getHeavyDominoesRemaining(stats: EyeStat[]): number {
    // Approximation - higher values are more likely to be in heavy dominoes
    return Math.floor((stats[4].remaining + stats[5].remaining + stats[6].remaining) / 2)
}
