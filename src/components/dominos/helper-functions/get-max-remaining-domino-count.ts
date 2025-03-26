import type EyeStat from "@/types/eye-stats"

export default function getMaxRemainingCount(stats: EyeStat[]): number {
    // Filter out the dominos with no remaining dominos
    const nonZeroRemaining = stats.filter((s) => s.remaining > 0)

    // If there are no remaining dominos, return 0
    return nonZeroRemaining.length ? Math.max(...nonZeroRemaining.map((s) => s.remaining)) : 0
}
