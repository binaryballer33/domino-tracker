import { type ReactNode } from "react"

import ClientProvidersLayout from "@/layouts/providers/client-providers/client-providers-layout"

type LayoutProps = {
    children: ReactNode
}

export default function Providers({ children }: LayoutProps) {
    return <ClientProvidersLayout>{children}</ClientProvidersLayout>
}
