import { useEditor, useNode } from "@craftjs/core";
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
import _, { debounce } from "lodash";
import { Accordion, AccordionItem } from "@heroui/react";
import SelectableInput from "../input-components/SelectableInput";

type HeadingProps = {
    text?: string;
    heading?: string;
} & GeneralStatesType;

const HeadingNormalProps = {
    ..._.cloneDeep(generalPropsDefault),
    fontSize: "2rem",
    fontWeight: "bold",
};

export const HeadingDefaultProps: HeadingProps & GeneralStatesType = {
    text: "Type your header here!",
    heading: "h1",
    // ..._.cloneDeep(generalStatesDefault),
    type: "normal",
    normal: HeadingNormalProps,
    hover: _.cloneDeep(HeadingNormalProps),
    focus: _.cloneDeep(HeadingNormalProps),
    active: _.cloneDeep(HeadingNormalProps),
};

export function Heading({ text, heading, ...props }: HeadingProps) {
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
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

    return enabled ? (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                onClick={() => selected && setEditable(true)}
            >
                <ContentEditable
                    html={value as string}
                    disabled={!editable}
                    style={{
                        ...generalStyles({
                            type: props.type || "normal",
                            normal: props.normal || {},
                            hover: props.hover || {},
                            focus: props.focus || {},
                            active: props.active || {},
                        }),
                    }}
                    onChange={(e) => {
                        setValue(e.target.value);
                        debouncedSetProp(e.target.value);
                    }}
                    tagName={heading}
                />
            </Resizer>
        </>
    ) : (
        <StyledComponent
            as={heading}
            $normal={props.normal || {}}
            $hover={props.hover || {}}
            $focus={props.focus || {}}
            $active={props.active || {}}
            $default={HeadingDefaultProps.normal}
        >
            {text}
        </StyledComponent>
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

Heading.craft = {
    name: "Heading",
    props: HeadingDefaultProps,
    related: {
        settings: HeadingSettings,
    },
};
