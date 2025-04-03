import { useEditor, useNode } from "@craftjs/core";
import React, { useState, useEffect, useCallback } from "react";
import ContentEditable from "react-contenteditable";
import {
    generalStatesDefault,
    GeneralSettings,
    generalStyles,
    GeneralStatesType,
    StyledComponent,
} from "./GeneralSettings";
import { Resizer } from "../Resizer";
import debounce from "lodash/debounce";
import { Accordion, AccordionItem } from "@heroui/react";
import TextInput from "../input-components/TextInput";

type TextProps = {
    text?: string;
    id?: string;
} & GeneralStatesType;

export const TextDefaultProps = {
    text: "Hi",
    id: "",
    ...generalStatesDefault,
};

export function Text({ text, ...props }: TextProps) {
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    const {
        selected,
        actions: { setProp },
        textValue,
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,

        textValue: state.data.props.text,
    }));

    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(text);

    useEffect(() => {
        if (selected) {
            return;
        }

        setEditable(false);
    }, [selected]);

    useEffect(() => {
        if (textValue === value) {
            return;
        }

        setValue(textValue);
    }, [textValue]);

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

    return enabled ? (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                onClick={() => selected && setEditable(true)}
            >
                <ContentEditable
                    id={props.id}
                    style={{
                        ...generalStyles({
                            type: props.type || "normal",
                            normal: props.normal || {},
                            hover: props.hover || {},
                            focus: props.focus || {},
                            active: props.active || {},
                        }),
                    }}
                    html={value as string}
                    disabled={!editable}
                    onChange={(e) => {
                        setValue(e.target.value);
                        debouncedSetProp(e.target.value);
                    }}
                    tagName="p"
                />
            </Resizer>
        </>
    ) : (
        <StyledComponent
            id={props.id}
            as="p"
            $normal={props.normal || {}}
            $hover={props.hover || {}}
            $focus={props.focus || {}}
            $active={props.active || {}}
            $default={TextDefaultProps.normal}
        >
            {value}
        </StyledComponent>
    );
}

function TextSettings() {
    return (
        <GeneralSettings>
            <Accordion
                defaultSelectedKeys={["1"]}
                selectionMode="multiple"
                variant="splitted"
                className="px-0"
                itemClasses={{
                    content: "flex flex-col gap-4 m-0",
                }}
            >
                <AccordionItem key="1" aria-label="Text" title="Text Props">
                    <TextInput propName="text" label="Text Content" />
                    <TextInput propName="id" label="ID" />
                </AccordionItem>
            </Accordion>
        </GeneralSettings>
    );
}

Text.craft = {
    props: TextDefaultProps,
    related: {
        settings: TextSettings,
    },
};
