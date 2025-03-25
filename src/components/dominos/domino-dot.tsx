type DominoDotsProps = {
    dominoEye: 0 | 1 | 2 | 3 | 4 | 5 | 6
    size?: "lg" | "md" | "sm"
}

export default function DominoDots(props: DominoDotsProps) {
    const { dominoEye, size = "sm" } = props
    const dotSize = getDotSize(size)

    return <div className="flex h-full w-full items-center justify-center">{renderDots(dominoEye, dotSize)}</div>
}

function renderDots(dominoEye: number, dotSize: string) {
    // Render dots based on the value
    switch (dominoEye) {
        case 0:
            return <div className="h-full w-full" />
        case 1:
            return (
                <div className="relative h-full w-full">
                    <div
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                </div>
            )
        case 2:
            return (
                <div className="relative h-full w-full">
                    <div className={`absolute left-[25%] top-[25%] rounded-full bg-black dark:bg-white ${dotSize}`} />
                    <div
                        className={`absolute bottom-[25%] right-[25%] rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                </div>
            )
        case 3:
            return (
                <div className="relative h-full w-full">
                    <div className={`absolute left-[25%] top-[25%] rounded-full bg-black dark:bg-white ${dotSize}`} />
                    <div
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute bottom-[25%] right-[25%] rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                </div>
            )
        case 4:
            return (
                <div className="relative h-full w-full">
                    <div className={`absolute left-[25%] top-[25%] rounded-full bg-black dark:bg-white ${dotSize}`} />
                    <div className={`absolute right-[25%] top-[25%] rounded-full bg-black dark:bg-white ${dotSize}`} />
                    <div
                        className={`absolute bottom-[25%] left-[25%] rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute bottom-[25%] right-[25%] rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                </div>
            )
        case 5:
            return (
                <div className="relative h-full w-full">
                    <div className={`absolute left-[25%] top-[25%] rounded-full bg-black dark:bg-white ${dotSize}`} />
                    <div className={`absolute right-[25%] top-[25%] rounded-full bg-black dark:bg-white ${dotSize}`} />
                    <div
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute bottom-[25%] left-[25%] rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute bottom-[25%] right-[25%] rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                </div>
            )
        case 6:
            return (
                <div className="relative h-full w-full">
                    {/* Left column */}
                    <div
                        className={`absolute left-[30%] top-[20%] -translate-x-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute bottom-[20%] left-[30%] -translate-x-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />

                    {/* Right column */}
                    <div
                        className={`absolute right-[30%] top-[20%] translate-x-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute right-[30%] top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                    <div
                        className={`absolute bottom-[20%] right-[30%] translate-x-1/2 rounded-full bg-black dark:bg-white ${dotSize}`}
                    />
                </div>
            )
        default:
            return null
    }
}

function getDotSize(size: "lg" | "md" | "sm") {
    switch (size) {
        case "lg":
            return "h-2.5 w-2.5"
        case "md":
            return "h-2 w-2"
        case "sm":
            return "h-1 w-1"
        default:
            return "h-2.5 w-2.5"
    }
}
