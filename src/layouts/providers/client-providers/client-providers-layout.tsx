"use client"

import { type ReactNode } from "react"

import ThemeProvider from "@/layouts/providers/client-providers/theme-provider"
import { NuqsAdapter } from "nuqs/adapters/next/app"

type LayoutProps = {
    children: ReactNode
}

export default function ClientProviders({ children }: LayoutProps) {
    return (
        <ThemeProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
    )
}
