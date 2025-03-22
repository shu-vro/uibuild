import { Metadata, Viewport } from "next";
import PageWrapper from "./PageWrapper";

export const metadata: Metadata = {
    title: "Editor",
};

export const viewport: Viewport = {
    initialScale: 0.2,
    minimumScale: 0.2,
    maximumScale: 2,
    width: "device-width",
};

export default function App() {
    console.log("hi");
    return <PageWrapper />;
}
