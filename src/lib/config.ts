import type { Metadata } from "next"

const APP_NAME = "Domino Tracker"

type AppMetadata = {
    homePage: Metadata
}

// eslint-disable-next-line import/prefer-default-export
export const appMetadata: AppMetadata = {
    homePage: {
        description: "Home Page For The App",
        icons: {
            icon: "/domino.png",
        },
        title: `${APP_NAME}`,
    },
}
