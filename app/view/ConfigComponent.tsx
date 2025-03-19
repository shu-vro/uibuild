import React from "react";
import { useEditor } from "@craftjs/core";
import { useEffectOnce } from "@craftjs/utils";
import lz from "lzutf8";
import { get } from "idb-keyval";

export default function ConfigComponent() {
    const { actions, query, enabled, canUndo, canRedo } = useEditor(
        (state, query) => ({
            enabled: state.options.enabled,
            canUndo: state.options.enabled && query.history.canUndo(),
            canRedo: state.options.enabled && query.history.canRedo(),
        }),
    );
    useEffectOnce(() => {
        (async () => {
            const data = await get("craft.js");
            if (data) {
                const json = JSON.parse(lz.decompress(lz.decodeBase64(data)));
                console.log(actions, json);
                actions.deserialize(json);
            }
        })();
    });
    return null;
}
