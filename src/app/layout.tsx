import type { Viewport } from "next/"
import type { ReactNode } from "react"

import Providers from "@/layouts/providers/providers-layout"

import Header from "@/components/header"

export const dynamic = "force-dynamic"

export const viewport: Viewport = {
    colorScheme: "dark",
    initialScale: 1,
    width: "device-width",
}

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
