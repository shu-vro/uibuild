import { useDeviceWidth } from "@/contexts/DeviceWidthContext";
import { cn } from "@/lib/utils";
import { useEditor } from "@craftjs/core";
import { Button } from "@heroui/react";
import React from "react";
import { GoEyeClosed } from "react-icons/go";

export default function Viewport({ children }: { children: React.ReactNode }) {
    const { enabled, connectors, actions } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    const { size } = useDeviceWidth();
    // const { preview, togglePreview } = usePreview();

    return (
        <div
            className={cn("border-x-2 transition-all ease-in-out", size)}
            ref={(ref) => {
                if (ref && enabled) {
                    connectors.select(connectors.hover(ref, null), null);
                }
            }}
        >
            <Button
                color={"primary"}
                variant="flat"
                isIconOnly
                onPress={() =>
                    actions.setOptions(
                        (options) => (options.enabled = !enabled),
                    )
                }
                className={cn(
                    "fixed top-2 left-2 z-[900000000000]",
                    enabled && "hidden",
                )}
            >
                <GoEyeClosed />
            </Button>
            {children}
        </div>
    );
}
