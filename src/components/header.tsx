"use client"

import ThemeToggle from "./theme-toggle"

export default function Header() {
    return (
        <header className="fixed right-4 top-4 z-50">
            <ThemeToggle />
        </header>
    )
}
