import { useNode } from "@craftjs/core";
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Slider,
    Tab,
    Tabs,
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import SizeInput from "../SizeInput";

type TextAlign = "left" | "center" | "right";

type Position = "relative" | "absolute" | "fixed" | "sticky" | "static";

interface TextProps {
    text?: string;
    fontSize?: string;
    textAlign?: TextAlign;
    display?: string;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
    width?: string;
    paddingOption?: string;
    paddingAll?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    marginOption?: string;
    marginAll?: string;
    marginLeft?: string;
    marginRight?: string;
    marginTop?: string;
    marginBottom?: string;
    position?: Position;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
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
    paddingOption,
    paddingAll,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    marginOption,
    marginAll,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    position,
    left,
    right,
    top,
    bottom,
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
                fontSize: `${fontSize}`,
                textAlign,
                display,
                flex: `${flexGrow} ${flexShrink} ${flexBasis}`,
                width,
                maxWidth,
                position,
                top,
                left,
                right,
                bottom,
                padding:
                    paddingOption === "all"
                        ? paddingAll
                        : `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
                margin:
                    marginOption === "all"
                        ? marginAll
                        : `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
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
        paddingOption,
        paddingAll,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        marginOption,
        marginAll,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        position,
        top,
        left,
        right,
        bottom,
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

        paddingOption: node.data.props.paddingOption,
        paddingAll: node.data.props.paddingAll,
        paddingLeft: node.data.props.paddingLeft,
        paddingRight: node.data.props.paddingRight,
        paddingTop: node.data.props.paddingTop,
        paddingBottom: node.data.props.paddingBottom,

        marginOption: node.data.props.marginOption,
        marginAll: node.data.props.marginAll,
        marginLeft: node.data.props.marginLeft,
        marginRight: node.data.props.marginRight,
        marginTop: node.data.props.marginTop,
        marginBottom: node.data.props.marginBottom,

        position: node.data.props.position,
        top: node.data.props.top,
        left: node.data.props.left,
        right: node.data.props.right,
        bottom: node.data.props.bottom,
    }));

    return (
        <>
            <Accordion
                selectionMode="multiple"
                variant="splitted"
                itemClasses={{
                    content: "flex flex-col gap-4 pl-2",
                }}
            >
                <AccordionItem
                    key="1"
                    aria-label="Layout"
                    title="Layout"
                    // classNames={{
                    //     content: "",
                    // }}
                >
                    {/* <Slider
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
                    /> */}
                    <SizeInput
                        propName="fontSize"
                        value={fontSize}
                        label="Font size"
                    />
                    <Select
                        className="max-w-xs"
                        label="Display"
                        labelPlacement="outside"
                        placeholder="Select an option"
                        selectedKeys={[display]}
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
                <AccordionItem key="2" aria-label="Size" title="Size">
                    <SizeInput propName="width" value={width} label="Width" />
                    <SizeInput
                        propName="maxWidth"
                        value={maxWidth}
                        label="Max Width"
                    />
                </AccordionItem>
                <AccordionItem key="3" aria-label="Space" title="Space">
                    <p>Padding</p>
                    <Tabs
                        aria-label="Options"
                        selectedKey={paddingOption || "all"}
                        onSelectionChange={(val) => {
                            setProp((props: any) => {
                                return (props.paddingOption = val);
                            }, 1000);
                        }}
                    >
                        <Tab key="all" title="All">
                            <Card>
                                <CardBody>
                                    <SizeInput
                                        propName="paddingAll"
                                        value={paddingAll}
                                        label="Padding All"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="custom" title="Custom">
                            <Card>
                                <CardBody className="flex flex-col gap-8">
                                    <SizeInput
                                        value={paddingLeft}
                                        propName="paddingLeft"
                                        label="Padding Left"
                                    />
                                    <SizeInput
                                        value={paddingRight}
                                        propName="paddingRight"
                                        label="Padding Right"
                                    />
                                    <SizeInput
                                        value={paddingTop}
                                        propName="paddingTop"
                                        label="Padding Top"
                                    />
                                    <SizeInput
                                        value={paddingBottom}
                                        propName="paddingBottom"
                                        label="Padding Bottom"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                    <p>Margin</p>
                    <Tabs
                        aria-label="Options"
                        selectedKey={marginOption || "all"}
                        onSelectionChange={(val) => {
                            setProp((props: any) => {
                                return (props.marginOption = val);
                            }, 1000);
                        }}
                    >
                        <Tab key="all" title="All">
                            <Card>
                                <CardBody>
                                    <SizeInput
                                        propName="marginAll"
                                        value={marginAll}
                                        label="Margin All"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="custom" title="Custom">
                            <Card>
                                <CardBody className="flex flex-col gap-8">
                                    <SizeInput
                                        value={marginLeft}
                                        propName="marginLeft"
                                        label="Margin Left"
                                    />
                                    <SizeInput
                                        value={marginRight}
                                        propName="marginRight"
                                        label="Margin Right"
                                    />
                                    <SizeInput
                                        value={marginTop}
                                        propName="marginTop"
                                        label="Margin Top"
                                    />
                                    <SizeInput
                                        value={marginBottom}
                                        propName="marginBottom"
                                        label="Margin Bottom"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </AccordionItem>
                <AccordionItem key="4" aria-label="Position" title="Position">
                    <Select
                        className="max-w-xs"
                        label="Display"
                        labelPlacement="outside"
                        placeholder="Select an option"
                        selectedKeys={[position]}
                        onChange={(value) => {
                            setProp(
                                (props: any) =>
                                    (props.position = value.target.value),
                                1000,
                            );
                        }}
                    >
                        <SelectItem key="relative" value="relative">
                            relative
                        </SelectItem>
                        <SelectItem key="absolute" value="absolute">
                            absolute
                        </SelectItem>
                        <SelectItem key="fixed" value="fixed">
                            fixed
                        </SelectItem>
                        <SelectItem key="sticky" value="sticky">
                            sticky
                        </SelectItem>
                        <SelectItem key="static" value="static">
                            static
                        </SelectItem>
                    </Select>
                    {position === "relative" ||
                    position === "absolute" ||
                    position === "fixed" ||
                    position === "sticky" ? (
                        <>
                            <SizeInput propName="top" value={top} label="Top" />
                            <SizeInput
                                propName="left"
                                value={left}
                                label="Left"
                            />
                            <SizeInput
                                propName="right"
                                value={right}
                                label="Right"
                            />
                            <SizeInput
                                propName="bottom"
                                value={bottom}
                                label="Bottom"
                            />
                        </>
                    ) : null}
                </AccordionItem>
            </Accordion>
        </>
    );
};

export const TextDefaultProps = {
    text: "Hi",
    fontSize: "1rem",
    textAlign: "left",
    width: "auto",
    maxWidth: "auto",
    display: "block",
    position: "relative",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    paddingOption: "all",
    paddingAll: "0rem",
    paddingLeft: "0rem",
    paddingRight: "0rem",
    paddingTop: "0rem",
    paddingBottom: "0rem",
    marginOption: "all",
    marginAll: "0rem",
    marginLeft: "0rem",
    marginRight: "0rem",
    marginTop: "0rem",
    marginBottom: "0rem",
};

Text.craft = {
    props: TextDefaultProps,
    related: {
        settings: TextSettings,
    },
};
