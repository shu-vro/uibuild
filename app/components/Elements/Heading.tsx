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
import { Accordion, AccordionItem } from "@heroui/react";
import SelectableInput from "../input-components/SelectableInput";

type HeadingProps = {
    text?: string;
    heading?: string;
} & GeneralStatesType;

export function Heading({ text, heading, ...props }: HeadingProps) {
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
                    tagName={heading}
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

function HeadingSettings() {
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
                <AccordionItem key="1" aria-label="Link" title="Link">
                    <SelectableInput
                        propName="heading"
                        label="Heading"
                        options={["h1", "h2", "h3", "h4", "h5", "h6"]}
                    />
                </AccordionItem>
            </Accordion>
        </GeneralSettings>
    );
}

export const TextDefaultProps: HeadingProps & GeneralStatesType = {
    text: "Type your header here!",
    heading: "h1",
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
        settings: HeadingSettings,
    },
};
