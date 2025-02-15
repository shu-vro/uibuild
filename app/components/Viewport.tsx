import { useEditor } from "@craftjs/core";
import React from "react";

export default function Viewport({ children }: { children: React.ReactNode }) {
    const { enabled, connectors } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    return (
        <div
            className="grow border-x-2"
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
