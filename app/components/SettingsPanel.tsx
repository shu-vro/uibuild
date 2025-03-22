import { cn } from "@/lib/utils";
import { useEditor } from "@craftjs/core";
import { Chip } from "@heroui/react";
import React from "react";

export default function SettingsPanel() {
    const { selected, isEnabled, editorEnabled } = useEditor((state, query) => {
        const currentNodeId = query.getEvent("selected").last();
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings:
                    state.nodes[currentNodeId].related &&
                    state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable(),
            };
        }

        return {
            selected,
            isEnabled: state.options.enabled,
            editorEnabled: state.options.enabled,
        };
    });

    return (
        <div
            className={cn(
                `w-[360px] sticky top-0 max-h-[calc(100vh-4rem)] overflow-auto shrink-0 transition-width duration-300 ease-in-out`,
                !editorEnabled ? "w-0" : "w-[360px]",
            )}
        >
            {selected && isEnabled ? (
                <>
                    <Chip color="warning">{selected?.name}</Chip>
                    <div data-cy="settings-panel">
                        {selected.settings &&
                            React.createElement(selected.settings)}
                    </div>
                </>
            ) : null}
        </div>
    );
}
