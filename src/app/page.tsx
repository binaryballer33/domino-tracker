import { appMetadata } from "@/lib/config"

import HomeView from "@/views/home/home-view"

export const metadata = appMetadata.homePage

export default async function HomePage() {
    return <HomeView />
}
