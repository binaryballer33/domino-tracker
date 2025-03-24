import { RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

type GameInforAndControlsProps = {
    playedCount: number
    remainingCount: number
    resetGame: () => void
}

export default function GameInforAndControls(props: GameInforAndControlsProps) {
    const { playedCount, remainingCount, resetGame } = props

    return (
        <div className="mt-6 flex justify-center gap-8">
            <div className="text-center">
                <h3 className="text-lg font-medium">Played</h3>
                <p className="text-3xl font-bold">{playedCount}</p>
            </div>
            <div className="text-center">
                <h3 className="text-lg font-medium">Boneyard</h3>
                <p className="text-3xl font-bold">{remainingCount}</p>
            </div>

            <div className="flex flex-col items-center">
                <h3 className="text-lg font-medium">Reset Game</h3>

                <Button className="px-4 py-0" onClick={resetGame} size="lg" variant="ghost">
                    <RefreshCcw className="!h-6 !w-6" />
                </Button>
            </div>
        </div>
    )
}
