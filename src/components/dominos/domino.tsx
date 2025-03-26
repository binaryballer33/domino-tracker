"use client"

import type { DominoDotSize, DominoEye } from "@/types/domino"

import { cn } from "@/lib/utils"

import DominoDots from "./domino-dot"

type DominoProps = {
    firstEye: DominoEye
    highlighted?: boolean
    onClick: () => void
    played: boolean
    secondEye: DominoEye
    size?: DominoDotSize
}

export default function Domino(props: DominoProps) {
    const { firstEye, highlighted = false, onClick, played, secondEye, size } = props

    const notPlayedStyles = "bg-white hover:border-gray-400 dark:bg-zinc-900"
    const playedStyles = "bg-gray-100 opacity-40 dark:bg-gray-700"

    return (
        <button
            className={cn(
                "flex aspect-[4/5] w-full flex-col overflow-hidden rounded-lg border-2 border-gray-600 transition-all",
                played ? playedStyles : notPlayedStyles,
                highlighted && !played && "border-primary bg-primary/5 ring-2 ring-primary",
            )}
            onClick={onClick}
            type="button"
        >
            <div className="flex flex-1 items-center justify-center border-b border-gray-600">
                <DominoDots dominoEye={firstEye} size={size || "sm"} />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <DominoDots dominoEye={secondEye} size={size || "sm"} />
            </div>
        </button>
    )
}
