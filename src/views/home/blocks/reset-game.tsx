import type Domino from "@/types/domino"
import type { Dispatch, SetStateAction } from "react"

import { RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import resetGame from "@/components/dominos/helper-functions/reset-game"

type ResetGameProps = {
    setDominos: Dispatch<SetStateAction<Domino[]>>
    setHighlightedValue: Dispatch<SetStateAction<null | number>>
}

export default function ResetGame(props: ResetGameProps) {
    const { setDominos, setHighlightedValue } = props

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="px-4 py-0"
                        onClick={() => resetGame({ setDominos, setHighlightedValue })}
                        size="lg"
                        variant="ghost"
                    >
                        <RefreshCcw className="!h-6 !w-6" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Reset Tracker</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
