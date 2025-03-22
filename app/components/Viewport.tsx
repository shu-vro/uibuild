import { useDeviceWidth } from "@/contexts/DeviceWidthContext";
import { cn } from "@/lib/utils";
import { useEditor } from "@craftjs/core";
import React from "react";

export default function Viewport({ children }: { children: React.ReactNode }) {
    const { enabled, connectors } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    const { size } = useDeviceWidth();
    return (
        <div
            className={cn("border-x-2 transition-all ease-in-out", size)}
            ref={(ref) => {
                if (ref && enabled) {
                    connectors.select(connectors.hover(ref, null), null);
                }
            }}
        >
            {children}
        </div>
    );
}
