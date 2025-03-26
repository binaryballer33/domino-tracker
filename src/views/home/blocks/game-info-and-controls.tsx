type GameInfoAndControlsProps = {
    playedCount: number
    remainingCount: number
}

export default function GameInfoAndControls(props: GameInfoAndControlsProps) {
    const { playedCount, remainingCount } = props

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
        </div>
    )
}
