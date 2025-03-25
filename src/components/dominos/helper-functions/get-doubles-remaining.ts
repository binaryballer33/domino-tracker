import type EyeStat from "@/types/eye-stats"

export default function getDoublesRemaining(stats: EyeStat[]): number {
    // Count actual doubles remaining by checking their IDs
    const doubleEyes = ["0-0", "1-1", "2-2", "3-3", "4-4", "5-5", "6-6"]
    let count = 0

    stats.forEach((stat) => {
        const doubleId = `${stat.value}-${stat.value}`
        if (doubleEyes.includes(doubleId) && stat.dominoes.includes(doubleId)) count += 1
    })

    return count
}
