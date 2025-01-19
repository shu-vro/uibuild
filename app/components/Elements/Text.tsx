import { useNode } from "@craftjs/core";
import {
    Accordion,
    AccordionItem,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Slider,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";

type TextAlign = "left" | "center" | "right";

interface TextProps {
    text?: string;
    fontSize?: number;
    textAlign?: TextAlign;
    display?: string;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
    width?: string;
    [key: string]: any;
}

export function Text({
    text,
    fontSize,
    textAlign,
    display,
    flexGrow,
    flexBasis,
    flexShrink,
    width,
    maxWidth,
    ...props
}: TextProps) {
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
                // width: "100%",
                fontSize: `${fontSize}rem`,
                textAlign,
                display,
                flex: `${flexGrow} ${flexShrink} ${flexBasis}`,
                width,
                maxWidth,
            }}
            {...props}
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

const TextSettings = () => {
    const {
        actions: { setProp },
        fontSize,
        textAlign,
        display,
        width,
        maxWidth,
        flexGrow,
        flexShrink,
        flexBasis,
    } = useNode((node) => ({
        text: node.data.props.text,
        fontSize: node.data.props.fontSize,
        width: node.data.props.width,
        maxWidth: node.data.props.maxWidth,
        textAlign: node.data.props.textAlign,
        display: node.data.props.display,
        flexGrow: node.data.props.flexGrow,
        flexShrink: node.data.props.flexShrink,
        flexBasis: node.data.props.flexBasis,
    }));

    return (
        <>
            <Accordion selectionMode="multiple" variant="splitted">
                <AccordionItem
                    key="1"
                    aria-label="Layout"
                    title="Layout"
                    classNames={{
                        content: "flex flex-col gap-4",
                    }}
                >
                    <Slider
                        value={fontSize || 7}
                        label="Font size"
                        size="sm"
                        step={0.1}
                        minValue={0.75}
                        maxValue={6}
                        getValue={(v) => `${v}rem`}
                        onChange={(value) => {
                            setProp(
                                (props: any) => (props.fontSize = value),
                                1000,
                            );
                        }}
                    />
                    <Select
                        className="max-w-xs"
                        label="Display"
                        labelPlacement="outside"
                        placeholder="Select an option"
                        value={display}
                        onChange={(value) => {
                            setProp(
                                (props: any) =>
                                    (props.display = value.target.value),
                                1000,
                            );
                        }}
                    >
                        <SelectItem key="inline" value="inline">
                            inline
                        </SelectItem>
                        <SelectItem key="block" value="block">
                            block
                        </SelectItem>
                        <SelectItem key="inline-block" value="inline-block">
                            inline-block
                        </SelectItem>
                        <SelectItem key="flex" value="flex">
                            flex
                        </SelectItem>
                        <SelectItem key="none" value="none">
                            none
                        </SelectItem>
                    </Select>
                    <RadioGroup
                        label="Text align"
                        orientation="horizontal"
                        value={textAlign}
                        onChange={(value) => {
                            setProp(
                                (props: any) =>
                                    (props.textAlign = value.target.value),
                                1000,
                            );
                        }}
                    >
                        <Radio value="left">left</Radio>
                        <Radio value="center">center</Radio>
                        <Radio value="right">right</Radio>
                    </RadioGroup>
                    <div className="flex gap-4 flex-col">
                        Flex:
                        <Input
                            type="number"
                            label="Grow"
                            value={flexGrow}
                            onChange={(e) => {
                                setProp(
                                    (props: any) =>
                                        (props.flexGrow = e.target.value),
                                    1000,
                                );
                            }}
                        />
                        <Input
                            type="number"
                            label="Shrink"
                            value={flexShrink}
                            onChange={(e) => {
                                setProp(
                                    (props: any) =>
                                        (props.flexShrink = e.target.value),
                                    1000,
                                );
                            }}
                        />
                        <Select
                            className="max-w-xs"
                            label="basis"
                            labelPlacement="outside"
                            placeholder="Select an option"
                            value={flexBasis}
                            onChange={(value) => {
                                setProp(
                                    (props: any) =>
                                        (props.flexBasis = value.target.value),
                                    1000,
                                );
                            }}
                        >
                            <SelectItem key="auto" value="auto">
                                auto
                            </SelectItem>
                            <SelectItem key="block" value="inherit">
                                inherit
                            </SelectItem>
                        </Select>
                    </div>
                </AccordionItem>
                <AccordionItem
                    key="2"
                    aria-label="Size"
                    title="Size"
                    classNames={{
                        content: "flex flex-col gap-4",
                    }}
                >
                    <Input
                        type="string"
                        label="Width"
                        value={width}
                        labelPlacement="outside"
                        onValueChange={(e) => {
                            setProp((props: any) => {
                                return (props.width = e);
                            }, 1000);
                        }}
                    />
                    <Input
                        type="string"
                        label="Max Width"
                        value={maxWidth}
                        labelPlacement="outside"
                        onValueChange={(e) => {
                            setProp((props: any) => {
                                return (props.maxWidth = e);
                            }, 1000);
                        }}
                    />
                </AccordionItem>
                <AccordionItem
                    key="3"
                    aria-label="Space"
                    title="Space"
                ></AccordionItem>
            </Accordion>
        </>
    );
};

export const TextDefaultProps = {
    text: "Hi",
    fontSize: 1,
    textAlign: "left",
    width: "auto",
    maxWidth: "auto",
    display: "block",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
};

Text.craft = {
    props: TextDefaultProps,
    related: {
        settings: TextSettings,
    },
};
