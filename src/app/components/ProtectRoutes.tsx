"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/contexts/UserContext";
import Loading from "../loading";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            // Redirect to login if not authenticated
            router.push("/login");
        }
    }, [user, isLoading, router]);

    // While loading or if not authenticated, you can show a loader or nothing:
    if (isLoading || !user) {
        return <Loading />;
    }

    return children;
}
