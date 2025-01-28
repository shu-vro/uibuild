import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

// import { AppSidebar } from "./components/AppSidebar";
// import Gradient from "./components/Gradient";
import Sonner from "./components/Sonner";

// import { SidebarProvider } from "@/components/ui/sidebar";
import ThemeProvider from "@/contexts/theme-provider";

import "@smastrom/react-rating/style.css";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "lenis/dist/lenis.css";

const font = Montserrat({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const APP_NAME = "UiBuild";
const APP_DEFAULT_TITLE = "UiBuild";
const APP_TITLE_TEMPLATE = "%s • UiBuild";
const APP_DESCRIPTION = "Best app in the world!";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 2,
    width: "device-width",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth max-sm:text-[12px]">
            <body className={`${font.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* <AppSidebar /> */}
                    <main className="w-full mx-auto">
                        {children}
                        <Sonner />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
