"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/contexts/UserContext";
import Loading from "../loading";

export default function ProtectRoutes({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (pathname !== "/auth/login" && pathname !== "/auth/signup") {
            if (!isLoading && !user) {
                // Redirect to login if not authenticated
                router.push("/auth/login");
            }
        } else {
            if (user && !isLoading) {
                router.push("/");
            }
        }
    }, [user, isLoading, router, pathname]);

    // While loading or if not authenticated, you can show a loader or nothing:
    if (isLoading && !user) {
        return <Loading />;
    }

    return children;
}
