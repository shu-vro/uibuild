import { useNode } from "@craftjs/core";
import React, { useState, useEffect, useCallback } from "react";
import ContentEditable from "react-contenteditable";
import {
    generalStatesDefault,
    GeneralSettings,
    generalStyles,
    GeneralStatesType,
    StyledComponent,
    generalPropsDefault,
} from "./GeneralSettings";
import { Resizer } from "../Resizer";
import { debounce } from "lodash";

type HeadingProps = {
    text?: string;
} & GeneralStatesType;

export function Heading({ text, ...props }: HeadingProps) {
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
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                style={{
                    ...generalStyles({
                        type: props.type || "normal",
                        normal: props.normal || {},
                        hover: props.hover || {},
                        focus: props.focus || {},
                        active: props.active || {},
                    }),
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
                    tagName="h1"
                />
            </Resizer>
            {/* <StyledComponent
                as={Resizer}
                propKey={{
                    width: "width",
                    height: "height",
                }}
                normal={props.normal || {}}
                hover={props.hover || {}}
                focus={props.focus || {}}
                active={props.active || {}}normal
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
                />
            </StyledComponent> */}
        </>
    );
}

export const TextDefaultProps: HeadingProps & GeneralStatesType = {
    text: "Type your header here!",
    ...generalStatesDefault,
    normal: {
        ...generalPropsDefault,
        fontSize: "2rem",
        fontWeight: "bold",
    },
};

Heading.craft = {
    props: TextDefaultProps,
    related: {
        settings: GeneralSettings,
    },
};
