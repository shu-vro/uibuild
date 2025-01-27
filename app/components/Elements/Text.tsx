import { useNode } from "@craftjs/core";
import React, { useState, useEffect, useCallback } from "react";
import ContentEditable from "react-contenteditable";
import {
    generalPropsDefault,
    GeneralSettings,
    GeneralSettingsProps,
    generalStyles,
} from "./GeneralSettings";
import { Resizer } from "../Resizer";
import { debounce } from "lodash";

type TextProps = {
    text?: string;
} & GeneralSettingsProps;

export function Text({ text, ...props }: TextProps) {
    const {
        selected,
        actions: { setProp },
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(text);

    useEffect(() => {
        if (selected) {
            return;
        }

        setEditable(false);
    }, [selected]);

    const debouncedSetProp = useCallback(
        debounce((value) => {
            setProp(
                (props: any) =>
                    (props.text = value.replace(/<\/?[^>]+(>|$)/g, "")),
                500,
            );
        }, 500),
        [],
    );

    return (
        <Resizer
            propKey={{ width: "width", height: "height" }}
            style={{
                ...generalStyles(props),
            }}
            onClick={() => selected && setEditable(true)}
        >
            <ContentEditable
                html={value as string}
                disabled={!editable}
                onChange={(e) => {
                    setValue(e.target.value);
                    debouncedSetProp(e.target.value);
                }}
                tagName="p"
                style={{}}
            />
        </Resizer>
    );
}

export const TextDefaultProps = {
    text: "Hi",
    ...generalPropsDefault,
};

Text.craft = {
    props: TextDefaultProps,
    related: {
        settings: GeneralSettings,
    },
};
