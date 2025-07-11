import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

// import { AppSidebar } from "./components/AppSidebar";
// import Gradient from "./components/Gradient";

// import { SidebarProvider } from "@/components/ui/sidebar";

import "../globals.css";
import { createMetadata } from "@/src/lib/metadata";
import Providers from "../../contexts/Providers";

const font = Montserrat({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const APP_NAME = "UiBuild";
const APP_DESCRIPTION = "Best app in the world!";

export const metadata: Metadata = createMetadata({
    appName: APP_NAME,
    description: APP_DESCRIPTION,
});

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
    initialScale: 1,
    minimumScale: 0.2,
    maximumScale: 2,
    width: "device-width",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                {process.env.NODE_ENV === "development" && (
                    <script
                        crossOrigin="anonymous"
                        src="https://unpkg.com/react-scan/dist/auto.global.js"
                    />
                )}
            </head>
            <body className={`${font.className} antialiased`}>
                <Providers>
                    <main className="w-full mx-auto">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
