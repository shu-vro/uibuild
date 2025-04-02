"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "@/src/contexts/theme-provider";
import { UserProvider } from "@/src/contexts/UserContext";
import Sonner from "../app/(protected_routes)/editor/components/Sonner";
import ProtectRoutes from "../app/(protected_routes)/components/ProtectRoutes";

// Create your QueryClient inside a client component.
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <UserProvider>
                    {/* <ProtectRoutes> */}
                    {children}
                    {/* </ProtectRoutes> */}
                </UserProvider>
                <Sonner />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export function NotProtectedProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Sonner />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
