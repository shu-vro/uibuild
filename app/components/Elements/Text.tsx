import { useNode } from "@craftjs/core";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import {
    generalPropsDefault,
    GeneralSettings,
    GeneralSettingsProps,
    generalStyles,
} from "./GeneralSettings";

type TextProps = {
    text?: string;
} & GeneralSettingsProps;

export function Text({ text, ...props }: TextProps) {
    const {
        connectors: { connect },
        selected,
        actions: { setProp },
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (selected) {
            return;
        }

        setEditable(false);
    }, [selected]);

    return (
        <div
            style={{
                ...generalStyles(props),
            }}
            ref={(ref) => {
                if (ref) {
                    connect(ref);
                }
            }}
            onClick={() => selected && setEditable(true)}
        >
            <ContentEditable
                html={text as string}
                disabled={!editable}
                onChange={(e) =>
                    setProp(
                        (props: any) =>
                            (props.text = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                "",
                            )),
                        500,
                    )
                }
                tagName="p"
                style={{}}
            />
        </div>
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
