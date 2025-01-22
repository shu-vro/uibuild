import { useEditor } from "@craftjs/core";
import { Button, Chip } from "@heroui/react";
import React from "react";

export default function SettingsPanel() {
    const { actions, selected, isEnabled } = useEditor((state, query) => {
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
        };
    });
    return selected && isEnabled ? (
        <div className="w-[360px] sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto shrink-0">
            <Chip color="warning">{selected?.name}</Chip>
            <div data-cy="settings-panel">
                {selected.settings && React.createElement(selected.settings)}
            </div>
            {selected.isDeletable ? (
                <Button
                    variant="faded"
                    color="danger"
                    onPress={() => {
                        actions.delete(selected.id);
                    }}
                >
                    Delete
                </Button>
            ) : null}
        </div>
    ) : null;
}
