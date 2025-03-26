import type Domino from "@/types/domino"
import type { DominoEye } from "@/types/domino"

// Generate all possible domino combinations (0-0 through 6-6)
export default function createDominos() {
    const dominos: Domino[] = []

    for (let firstEye = 0; firstEye <= 6; firstEye += 1) {
        for (let secondEye = firstEye; secondEye <= 6; secondEye += 1) {
            dominos.push({
                firstEye: firstEye as DominoEye,
                id: `${firstEye}-${secondEye}`,
                played: false,
                secondEye: secondEye as DominoEye,
            })
        }
    }

    return dominos
}
