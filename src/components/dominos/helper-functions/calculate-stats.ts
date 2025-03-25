import type Domino from "@/types/domino"
import type { DominoEye } from "@/types/domino"
import type EyeStat from "@/types/eye-stats"

export default function calculateEyeStats(dominoes: Domino[]): EyeStat[] {
    // Calculate stats for each eye value
    const stats = Array(7)
        .fill(0)
        .map((_, i) => ({
            dominoes: [] as string[],
            played: 0,
            remaining: 0,
            total: 0,
            value: i as DominoEye,
        }))

    dominoes.forEach((domino) => {
        // Count first value
        stats[domino.firstEye].total += 1

        // If the domino has not been played, increment the remaining count and add the domino to the list of dominoes
        if (!domino.played) {
            stats[domino.firstEye].remaining += 1
            stats[domino.firstEye].dominoes.push(domino.id)
        } else {
            stats[domino.firstEye].played += 1
        }

        // If not a double, count second value too
        if (domino.firstEye !== domino.secondEye) {
            stats[domino.secondEye].total += 1
            if (!domino.played) {
                stats[domino.secondEye].remaining += 1
                stats[domino.secondEye].dominoes.push(domino.id)
            } else {
                stats[domino.secondEye].played += 1
            }
        }
    })

    return stats
}
