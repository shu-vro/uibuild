import { Metadata } from "next";

export function createMetadata({
    appName,
    defaultTitle = "UiBuild",
    titleTemplate = "%s • UiBuild",
    description,
    manifest = "/manifest.json",
}: {
    appName: string;
    defaultTitle?: string;
    titleTemplate?: string;
    description: string;
    manifest?: string;
}): Metadata {
    return {
        applicationName: appName,
        title: {
            default: defaultTitle,
            template: titleTemplate,
        },
        description,
        manifest,
        appleWebApp: {
            capable: true,
            statusBarStyle: "default",
            title: defaultTitle,
        },
        formatDetection: {
            telephone: false,
        },
        openGraph: {
            type: "website",
            siteName: appName,
            title: {
                default: defaultTitle,
                template: titleTemplate,
            },
            description,
        },
        twitter: {
            card: "summary",
            title: {
                default: defaultTitle,
                template: titleTemplate,
            },
            description,
        },
    };
}
