import type { DominoWithIndex } from "@/types/domino"

/**
 * Returns an array of 7 arrays, each row containing the dominoes sorted in order for example:
 * simple: [[ 0-0, 0-1, 0-2, 0-3, 0-4, 0-5, 0-6 ], [ 1-1, 1-2, 1-3, 1-4, 1-5, 1-6 ], ... ]
 *
 * complex:
 * [
 *  [ {domino}, {domino}, {domino} ],
 *  [ {domino}, {domino}, {domino}, ... ],
 *  ...
 * ]
 * @param dominos - The array of dominoes to sort
 * @returns An array of 7 arrays, each containing the dominoes sorted in order
 */
export default function getSevenRowsOfSortedDominos(dominos: DominoWithIndex[]): DominoWithIndex[][] {
    return Array(7)
        .fill(null)
        .map((_, eyeValue) => {
            // Find all dominoes that contain this eye value
            const matchingDominoes = dominos.filter(
                (domino) => domino.firstEye === eyeValue || domino.secondEye === eyeValue,
            )

            // Sort them by the other value (or by the same value for doubles)
            return matchingDominoes.sort((a, b) => {
                const aOtherValue = a.firstEye === eyeValue ? a.secondEye : a.firstEye
                const bOtherValue = b.firstEye === eyeValue ? b.secondEye : b.firstEye
                return aOtherValue - bOtherValue
            })
        })
}
