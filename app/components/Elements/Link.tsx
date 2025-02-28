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
import { Accordion, AccordionItem, Input } from "@heroui/react";
import TextInput from "../input-components/TextInput";
import SelectableInput from "../input-components/SelectableInput";

type LinkProps = {
    text?: string;
    href?: string;
    target?: string;
} & GeneralStatesType;

export function LinkComponent({ text, ...props }: LinkProps) {
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
                    tagName="a"
                    href={props.href}
                    target={props.target}
                    rel="noopener noreferrer"
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

export const LinkDefaultProps: LinkProps & GeneralStatesType = {
    text: "Your Link here!",
    href: "#",
    target: "_blank",
    ...generalStatesDefault,
    normal: {
        ...generalPropsDefault,
        fontSize: "2rem",
        fontWeight: "bold",
    },
};

function LinkSettings() {
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
                    <TextInput propName="href" label="Link" />
                    <SelectableInput
                        propName="target"
                        label="Target"
                        options={["_blank", "_self", "_parent", "_top"]}
                    />
                </AccordionItem>
            </Accordion>
        </GeneralSettings>
    );
}

LinkComponent.craft = {
    name: "Link",
    props: LinkDefaultProps,
    related: {
        settings: LinkSettings,
    },
};
