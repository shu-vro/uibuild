import { Metadata } from "next";
import React from "react";
import HomePage from "./components/HomePage";
import { createMetadata } from "@/lib/metadata";

const APP_NAME = "Editor";
const APP_DEFAULT_TITLE = "UiBuild";
const APP_TITLE_TEMPLATE = "%s • UiBuild";
const APP_DESCRIPTION = "Best app in the world!";

export const metadata: Metadata = createMetadata({
    appName: APP_NAME,
    description: APP_DESCRIPTION,
});

export default function page() {
    return <HomePage />;
}
