import { useDeviceWidth } from "@/src/contexts/DeviceWidthContext";
import { cn } from "@/src/lib/utils";
import { useEditor } from "@craftjs/core";
import { Button } from "@heroui/react";
import React from "react";
import { GoEyeClosed } from "react-icons/go";
import ReactDOM from "react-dom";

export default function Viewport({ children }: { children: React.ReactNode }) {
    const { enabled, connectors, actions } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    const { size } = useDeviceWidth();

    // The fixed button rendered via a portal
    const fixedButton = (
        <Button
            color="primary"
            variant="ghost"
            isIconOnly
            onPress={() =>
                actions.setOptions((options) => (options.enabled = !enabled))
            }
            className={cn(
                "fixed top-2 left-2 z-[900000000000]",
                enabled && "hidden",
            )}
        >
            <GoEyeClosed />
        </Button>
    );

    return (
        <>
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
            {ReactDOM.createPortal(fixedButton, document.body)}
        </>
    );
}
