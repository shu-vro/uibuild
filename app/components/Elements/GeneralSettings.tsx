"use client";

import { useEditor, useNode } from "@craftjs/core";
import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody,
    Input,
    Radio,
    RadioGroup,
    Slider,
    Tab,
    Tabs,
    Tooltip,
} from "@heroui/react";
import React from "react";
import SizeInput from "../SizeInput";
import SelectableInput from "../SelectableInput";
import ColorInput from "../ColorInput";
import {
    GoArrowRight,
    GoArrowLeft,
    GoArrowUp,
    GoArrowDown,
} from "react-icons/go";
import {
    LuAlignVerticalJustifyStart,
    LuAlignVerticalJustifyCenter,
    LuAlignVerticalJustifyEnd,
    LuAlignVerticalSpaceBetween,
    LuAlignVerticalSpaceAround,
    LuStretchVertical,
    LuStretchHorizontal,
    LuBaseline,
} from "react-icons/lu";
import {
    PiAlignLeft,
    PiAlignRight,
    PiAlignCenterHorizontal,
} from "react-icons/pi";
import SliderInput from "../SliderInput";

export type GeneralSettingsProps = {
    display?: string;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
    gapOption?: string;
    gapAll?: string;
    gapRow?: string;
    flexWrap?: React.CSSProperties["flexWrap"];

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
    position?: React.CSSProperties["position"];
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;

    fontName?: string;
    fontColor?: string;
    fontSize?: string;
    textAlign?: React.CSSProperties["textAlign"];
    fontWeight?: string;
    fontLineHeight?: string;
    fontSpacing?: string;
    fontVerticalAlign?: string;
    textBreaking?: React.CSSProperties["wordBreak"];
    textDirection?: React.CSSProperties["direction"];
    textDecoration?: string;
    textStyle?: string;

    borderRadiusOption?: string;
    borderRadiusAll?: string;
    borderRadiusTopLeft?: string;
    borderRadiusTopRight?: string;
    borderRadiusBottomRight?: string;
    borderRadiusBottomLeft?: string;

    borderWidthOption?: string;
    borderWidthAll?: string;
    borderWidthLeft?: string;
    borderWidthRight?: string;
    borderWidthTop?: string;
    borderWidthBottom?: string;

    borderStyleOption?: string;
    borderStyleAll?: string;
    borderStyleLeft?: string;
    borderStyleRight?: string;
    borderStyleTop?: string;
    borderStyleBottom?: string;

    borderColorOption?: string;
    borderColorAll?: string;
    borderColorLeft?: string;
    borderColorRight?: string;
    borderColorTop?: string;
    borderColorBottom?: string;

    opacity?: number;
    mixBlendMode?: React.CSSProperties["mixBlendMode"];
    cursor?: React.CSSProperties["cursor"];

    [key: string]: any;
} & React.CSSProperties;

export const generalPropsDefault: GeneralSettingsProps = {
    width: "auto",
    maxWidth: "auto",
    height: "auto",
    maxHeight: "auto",
    display: "block",
    position: "relative",

    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "nowrap",
    gapOption: "all",
    gapAll: "0.25rem",
    gapRow: "0.25rem",
    gapColumn: "0.25rem",

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
    fontName: "MontSerrat",
    fontColor: "currentColor",
    fontSize: "1rem",
    textAlign: "left",
    fontWeight: "400",
    fontLineHeight: "normal",
    fontSpacing: "normal",
    fontVerticalAlign: "baseline",
    textTransform: "none",
    textDirection: "ltr",
    textBreaking: "normal", // white space
    textDecoration: "none",
    textStyle: "normal",

    borderRadiusOption: "all",
    borderRadiusAll: "0rem",
    borderRadiusTopLeft: "0rem",
    borderRadiusTopRight: "0rem",
    borderRadiusBottomRight: "0rem",
    borderRadiusBottomLeft: "0rem",

    borderWidthOption: "all",
    borderWidthAll: "0rem",
    borderWidthLeft: "0rem",
    borderWidthRight: "0rem",
    borderWidthTop: "0rem",
    borderWidthBottom: "0rem",

    borderStyleOption: "all",
    borderStyleAll: "solid",
    borderStyleLeft: "solid",
    borderStyleRight: "solid",
    borderStyleTop: "solid",
    borderStyleBottom: "solid",

    borderColorOption: "all",
    borderColorAll: "currentColor",
    borderColorLeft: "currentColor",
    borderColorRight: "currentColor",
    borderColorTop: "currentColor",
    borderColorBottom: "currentColor",

    opacity: 1,
    mixBlendMode: "normal",
    cursor: "auto",
};

export function generalStyles({
    display,
    flexGrow,
    flexBasis,
    flexShrink,
    gapOption,
    gapAll,
    gapRow,
    gapColumn,
    flexWrap,
    width,
    maxWidth,
    height,
    maxHeight,
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

    fontName,
    fontLineHeight,
    fontSize,
    fontWeight,
    textStyle,

    fontColor,
    textAlign,
    fontSpacing,
    fontVerticalAlign,
    textTransform,
    textDirection,
    textBreaking,
    textDecoration,

    borderRadiusOption,
    borderRadiusAll,
    borderRadiusTopLeft,
    borderRadiusTopRight,
    borderRadiusBottomRight,
    borderRadiusBottomLeft,

    borderWidthOption,
    borderWidthAll,
    borderWidthLeft,
    borderWidthRight,
    borderWidthTop,
    borderWidthBottom,

    borderStyleOption,
    borderStyleAll,
    borderStyleLeft,
    borderStyleRight,
    borderStyleTop,
    borderStyleBottom,

    borderColorOption,
    borderColorAll,
    borderColorLeft,
    borderColorRight,
    borderColorTop,
    borderColorBottom,
    ...props
}: GeneralSettingsProps) {
    return {
        display,
        flex: `${flexGrow} ${flexShrink} ${flexBasis}`,
        width,
        maxWidth,
        position,
        top,
        left,
        right,
        bottom,
        font: `${textStyle} normal ${fontWeight} ${fontSize}/${fontLineHeight} ${fontName}`,
        color: fontColor,
        textAlign,
        verticalAlign: fontVerticalAlign,
        textTransform,
        direction: textDirection,
        wordBreak: textBreaking,
        textDecoration,
        letterSpacing: fontSpacing,
        flexWrap,
        borderRadius:
            borderRadiusOption === "all"
                ? borderRadiusAll
                : `${borderRadiusTopLeft} ${borderRadiusTopRight} ${borderRadiusBottomRight} ${borderRadiusBottomLeft}`,
        borderWidth:
            borderWidthOption === "all"
                ? borderWidthAll
                : `${borderWidthTop} ${borderWidthRight} ${borderWidthBottom} ${borderWidthLeft}`,
        borderStyle:
            borderStyleOption === "all"
                ? borderStyleAll
                : `${borderStyleTop} ${borderStyleRight} ${borderStyleBottom} ${borderStyleLeft}`,
        borderColor:
            borderColorOption === "all"
                ? borderColorAll
                : `${borderColorTop} ${borderColorRight} ${borderColorBottom} ${borderColorLeft}`,
        padding:
            paddingOption === "all"
                ? paddingAll
                : `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
        margin:
            marginOption === "all"
                ? marginAll
                : `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
        gap: gapOption === "all" ? gapAll : `${gapRow} ${gapColumn}`,
        ...props,
    };
}

export function GeneralSettings({ children }: { children?: React.ReactNode }) {
    const {
        actions: { setProp },
        fontSize,
        textAlign,
        flexGrow,
        flexShrink,
        flexDirection,
        justifyContent,
        alignItems,
        gapOption,
        paddingOption,
        marginOption,
        position,
        display,
        fontColor,
        fontLineHeight,
        fontSpacing,
        fontVerticalAlign,
        borderWidthOption,
        borderStyleOption,
        borderRadiusOption,
        borderColorOption,
    } = useNode((node) => ({
        text: node.data.props.text,
        width: node.data.props.width,
        maxWidth: node.data.props.maxWidth,
        height: node.data.props.height,
        maxHeight: node.data.props.maxHeight,

        display: node.data.props.display,
        flexGrow: node.data.props.flexGrow,
        flexShrink: node.data.props.flexShrink,
        flexBasis: node.data.props.flexBasis,
        flexDirection: node.data.props.flexDirection,
        justifyContent: node.data.props.justifyContent,
        alignItems: node.data.props.alignItems,
        flexWrap: node.data.props.flexWrap,
        gapOption: node.data.props.gap,
        gapRow: node.data.props.gapRow,
        gapColumn: node.data.props.gapColumn,

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

        fontName: node.data.props.fontName,
        fontColor: node.data.props.fontColor,
        fontSize: node.data.props.fontSize,
        fontWeight: node.data.props.fontWeight,
        fontLineHeight: node.data.props.fontLineHeight,
        fontSpacing: node.data.props.fontSpacing,
        textAlign: node.data.props.textAlign,
        fontVerticalAlign: node.data.props.fontVerticalAlign,
        textTransform: node.data.props.textTransform,
        textDirection: node.data.props.textDirection,
        textBreaking: node.data.props.textBreaking,
        textDecoration: node.data.props.textDecoration,
        textStyle: node.data.props.textStyle,

        borderRadiusOption: node.data.props.borderRadiusOption,
        borderRadiusAll: node.data.props.borderRadiusAll,
        borderRadiusTopLeft: node.data.props.borderRadiusTopLeft,
        borderRadiusTopRight: node.data.props.borderRadiusTopRight,
        borderRadiusBottomRight: node.data.props.borderRadiusBottomRight,
        borderRadiusBottomLeft: node.data.props.borderRadiusBottomLeft,

        borderWidthOption: node.data.props.borderWidthOption,
        borderWidthAll: node.data.props.borderWidthAll,
        borderWidthLeft: node.data.props.borderWidthLeft,
        borderWidthRight: node.data.props.borderWidthRight,
        borderWidthTop: node.data.props.borderWidthTop,
        borderWidthBottom: node.data.props.borderWidthBottom,

        borderStyleOption: node.data.props.borderStyleOption,
        borderStyleAll: node.data.props.borderStyleAll,
        borderStyleLeft: node.data.props.borderStyleLeft,
        borderStyleRight: node.data.props.borderStyleRight,
        borderStyleTop: node.data.props.borderStyleTop,
        borderStyleBottom: node.data.props.borderStyleBottom,

        borderColorOption: node.data.props.borderColorOption,
        borderColorAll: node.data.props.borderColorAll,
        borderColorLeft: node.data.props.borderColorLeft,
        borderColorRight: node.data.props.borderColorRight,
        borderColorTop: node.data.props.borderColorTop,
        borderColorBottom: node.data.props.borderColorBottom,
    }));

    const { actions, selected, isEnabled } = useEditor((state, query) => {
        const currentNodeId = query.getEvent("selected").last();
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings:
                    state.nodes[currentNodeId].related &&
                    state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable(),
            };
        }

        return {
            selected,
            isEnabled: state.options.enabled,
        };
    });

    return (
        <>
            <Accordion
                keepContentMounted
                selectionMode="multiple"
                variant="splitted"
                className="px-0"
                itemClasses={{
                    content: "flex flex-col gap-4 m-0",
                }}
            >
                <AccordionItem key="1" aria-label="Layout" title="Layout">
                    <SelectableInput
                        label="Display"
                        propName="display"
                        options={[
                            "inline",
                            "block",
                            "inline-block",
                            "flex",
                            "none",
                        ]}
                    />

                    {display === "flex" && (
                        <>
                            <div>
                                <p>Flex Direction</p>
                                <Tabs
                                    aria-label="Options"
                                    selectedKey={flexDirection}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props.flexDirection = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab
                                        key="row"
                                        title={
                                            <Tooltip content="Row">
                                                <GoArrowRight />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="column"
                                        title={
                                            <Tooltip content="Column">
                                                <GoArrowDown />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="row-reverse"
                                        title={
                                            <Tooltip content="Row Reverse">
                                                <GoArrowLeft />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="column-reverse"
                                        title={
                                            <Tooltip content="Column Reverse">
                                                <GoArrowUp />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                </Tabs>
                            </div>
                            <div>
                                <p>Justify Content</p>
                                <Tabs
                                    aria-label="Options"
                                    selectedKey={justifyContent}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props.justifyContent = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab
                                        key="flex-start"
                                        title={
                                            <Tooltip content="Start">
                                                <LuAlignVerticalJustifyStart />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="center"
                                        title={
                                            <Tooltip content="Center">
                                                <LuAlignVerticalJustifyCenter />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="flex-end"
                                        title={
                                            <Tooltip content="End">
                                                <LuAlignVerticalJustifyEnd />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="space-between"
                                        title={
                                            <Tooltip content="Space Between">
                                                <LuAlignVerticalSpaceBetween />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="space-around"
                                        title={
                                            <Tooltip content="Space Around">
                                                <LuAlignVerticalSpaceAround />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="space-evently"
                                        title={
                                            <Tooltip content="Space Evently">
                                                <LuStretchHorizontal />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                </Tabs>
                            </div>
                            <div>
                                <p>Align Items</p>
                                <Tabs
                                    aria-label="Options"
                                    className="mb-4 mt-0"
                                    selectedKey={alignItems}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props.alignItems = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab
                                        key="flex-start"
                                        title={
                                            <Tooltip content="Start">
                                                <PiAlignLeft />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="center"
                                        title={
                                            <Tooltip content="Center">
                                                <PiAlignCenterHorizontal />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="flex-end"
                                        title={
                                            <Tooltip content="End">
                                                <PiAlignRight />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="stretch"
                                        title={
                                            <Tooltip content="stretch">
                                                <LuStretchVertical />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                    <Tab
                                        key="baseline"
                                        title={
                                            <Tooltip content="baseline">
                                                <LuBaseline />
                                            </Tooltip>
                                        }
                                    ></Tab>
                                </Tabs>

                                <SelectableInput
                                    label="Flex Wrap"
                                    propName="flexWrap"
                                    options={["nowrap", "wrap", "wrap-reverse"]}
                                />
                                <div>
                                    <p>Gap</p>
                                    <Tabs
                                        aria-label="Options"
                                        selectedKey={gapOption}
                                        onSelectionChange={(val) => {
                                            setProp((props: any) => {
                                                return (props.gapOption = val);
                                            }, 1000);
                                        }}
                                    >
                                        <Tab key="all" title="All">
                                            <Card>
                                                <CardBody>
                                                    <SizeInput
                                                        propName="gapAll"
                                                        label="All"
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Tab>
                                        <Tab key="custom" title="Custom">
                                            <Card>
                                                <CardBody className="flex flex-col gap-4">
                                                    <SizeInput
                                                        propName="gapRow"
                                                        label="Row"
                                                    />
                                                    <SizeInput
                                                        propName="gapColumn"
                                                        label="Column"
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </>
                    )}

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
                        <SelectableInput
                            label="Flex basis"
                            propName="flexBasis"
                            options={["auto", "inherit"]}
                        />
                    </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Size" title="Size">
                    <SizeInput propName="width" label="Width" />
                    <SizeInput propName="maxWidth" label="Max Width" />
                    <SizeInput propName="height" label="Height" />
                    <SizeInput propName="maxHeight" label="Max Height" />
                </AccordionItem>
                <AccordionItem key="3" aria-label="Space" title="Space">
                    <div>
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
                                            label="Padding All"
                                        />
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="custom" title="Custom">
                                <Card>
                                    <CardBody className="flex flex-col gap-8">
                                        <SizeInput
                                            propName="paddingTop"
                                            label="Padding Top"
                                        />
                                        <SizeInput
                                            propName="paddingLeft"
                                            label="Padding Left"
                                        />
                                        <SizeInput
                                            propName="paddingBottom"
                                            label="Padding Bottom"
                                        />
                                        <SizeInput
                                            propName="paddingRight"
                                            label="Padding Right"
                                        />
                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                    <div>
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
                                            label="Margin All"
                                        />
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="custom" title="Custom">
                                <Card>
                                    <CardBody className="flex flex-col gap-8">
                                        <SizeInput
                                            propName="marginTop"
                                            label="Margin Top"
                                        />
                                        <SizeInput
                                            propName="marginLeft"
                                            label="Margin Left"
                                        />
                                        <SizeInput
                                            propName="marginBottom"
                                            label="Margin Bottom"
                                        />
                                        <SizeInput
                                            propName="marginRight"
                                            label="Margin Right"
                                        />
                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                </AccordionItem>
                <AccordionItem key="4" aria-label="Position" title="Position">
                    <SelectableInput
                        label="Position"
                        propName="position"
                        options={[
                            "relative",
                            "absolute",
                            "fixed",
                            "sticky",
                            "static",
                        ]}
                    />
                    {position === "relative" ||
                    position === "absolute" ||
                    position === "fixed" ||
                    position === "sticky" ? (
                        <>
                            <SizeInput propName="top" label="Top" />
                            <SizeInput propName="left" label="Left" />
                            <SizeInput propName="bottom" label="Bottom" />
                            <SizeInput propName="right" label="Right" />
                        </>
                    ) : null}
                </AccordionItem>
                <AccordionItem
                    key="5"
                    aria-label="Typography"
                    title="Typography"
                >
                    <SelectableInput
                        label="Font Name"
                        propName="fontName"
                        options={[
                            "MontSerrat",
                            "Arial",
                            "Helvetica",
                            "Times New Roman",
                            "Georgia",
                            "Verdana",
                            "Tahoma",
                            "Trebuchet MS",
                            "Courier New",
                            "Lucida Console",
                            "Lucida Sans Unicode",
                        ]}
                    />
                    <ColorInput propName="fontColor" label="Font Color" />
                    <SizeInput
                        propName="fontSize"
                        value={fontSize}
                        label="Font size"
                    />
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
                    <RadioGroup
                        label="Text Vertical align"
                        orientation="horizontal"
                        value={fontVerticalAlign}
                        onChange={(value) => {
                            setProp(
                                (props: any) =>
                                    (props.textAlign = value.target.value),
                                1000,
                            );
                        }}
                    >
                        <Radio value="baseline">baseline</Radio>
                        <Radio value="top">top</Radio>
                        <Radio value="middle">middle</Radio>
                        <Radio value="bottom">bottom</Radio>
                    </RadioGroup>

                    <SelectableInput
                        propName="fontWeight"
                        label="Font Weight"
                        options={[
                            "normal",
                            "bold",
                            "bolder",
                            "lighter",
                            "initial",
                            "inherit",
                            "100",
                            "200",
                            "300",
                            "400",
                            "500",
                            "600",
                            "700",
                            "800",
                            "900",
                        ]}
                    />
                    <SizeInput
                        propName="fontLineHeight"
                        value={fontLineHeight}
                        label="Line Height"
                        customValues={["normal"]}
                    />
                    <SizeInput
                        value={fontSpacing}
                        propName="fontSpacing"
                        label="Text Spacing"
                    />
                    <SelectableInput
                        propName="textTransform"
                        label="Text Transform"
                        options={[
                            "none",
                            "capitalize",
                            "uppercase",
                            "lowercase",
                        ]}
                    />
                    <SelectableInput
                        propName="textDirection"
                        label="Text Direction"
                        options={["ltr", "rtl"]}
                    />
                    <SelectableInput
                        propName="textBreaking"
                        label="Text Breaking"
                        options={[
                            "normal",
                            "break-all",
                            "keep-all",
                            "break-word",
                        ]}
                    />
                    <SelectableInput
                        propName="textDecoration"
                        label="Text Decoration"
                        options={[
                            "none",
                            "underline",
                            "overline",
                            "line-through",
                        ]}
                    />
                    <SelectableInput
                        propName="textStyle"
                        label="Text Style"
                        options={["normal", "italic", "oblique"]}
                    />
                </AccordionItem>
                <AccordionItem key="6" aria-label="Border" title="Border">
                    <p>Border Radius</p>
                    <Tabs
                        aria-label="Options"
                        selectedKey={borderRadiusOption || "all"}
                        onSelectionChange={(val) => {
                            setProp((props: any) => {
                                return (props.borderRadiusOption = val);
                            }, 1000);
                        }}
                    >
                        <Tab key="all" title="All">
                            <Card>
                                <CardBody>
                                    <SizeInput
                                        propName="borderRadiusAll"
                                        label="All"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="custom" title="Custom">
                            <Card>
                                <CardBody className="flex flex-col gap-4">
                                    <SizeInput
                                        propName="borderWidthTopLeft"
                                        label="Top Left"
                                    />
                                    <SizeInput
                                        propName="borderWidthTopRight"
                                        label="Top Right"
                                    />
                                    <SizeInput
                                        propName="borderWidthBottomLeft"
                                        label="Bottom Left"
                                    />
                                    <SizeInput
                                        propName="borderWidthBottomRight"
                                        label="Bottom Right"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                    <p>Border Width</p>
                    <Tabs
                        aria-label="Options"
                        selectedKey={borderWidthOption || "all"}
                        onSelectionChange={(val) => {
                            setProp((props: any) => {
                                return (props.borderWidthOption = val);
                            }, 1000);
                        }}
                    >
                        <Tab key="all" title="All">
                            <Card>
                                <CardBody>
                                    <SizeInput
                                        propName="borderWidthAll"
                                        label="All"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="custom" title="Custom">
                            <Card>
                                <CardBody className="flex flex-col gap-4">
                                    <SizeInput
                                        propName="borderWidthTop"
                                        label="Top"
                                    />
                                    <SizeInput
                                        propName="borderWidthLeft"
                                        label="Left"
                                    />
                                    <SizeInput
                                        propName="borderWidthBottom"
                                        label="Bottom"
                                    />
                                    <SizeInput
                                        propName="borderWidthRight"
                                        label="Right"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                    <p>Border Style</p>
                    <Tabs
                        aria-label="Options"
                        selectedKey={borderStyleOption || "all"}
                        onSelectionChange={(val) => {
                            setProp((props: any) => {
                                return (props.borderStyleOption = val);
                            }, 1000);
                        }}
                    >
                        <Tab key="all" title="All">
                            <Card>
                                <CardBody>
                                    <SelectableInput
                                        propName="borderStyleAll"
                                        label="All"
                                        options={[
                                            "none",
                                            "hidden",
                                            "dotted",
                                            "dashed",
                                            "solid",
                                            "double",
                                            "groove",
                                            "ridge",
                                            "inset",
                                            "outset",
                                            "initial",
                                            "inherit",
                                        ]}
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="custom" title="Custom">
                            <Card>
                                <CardBody className="flex flex-col gap-4">
                                    <SelectableInput
                                        propName="borderStyleTop"
                                        label="Top"
                                        options={[
                                            "none",
                                            "hidden",
                                            "dotted",
                                            "dashed",
                                            "solid",
                                            "double",
                                            "groove",
                                            "ridge",
                                            "inset",
                                            "outset",
                                            "initial",
                                            "inherit",
                                        ]}
                                    />
                                    <SelectableInput
                                        propName="borderStyleLeft"
                                        label="Left"
                                        options={[
                                            "none",
                                            "hidden",
                                            "dotted",
                                            "dashed",
                                            "solid",
                                            "double",
                                            "groove",
                                            "ridge",
                                            "inset",
                                            "outset",
                                            "initial",
                                            "inherit",
                                        ]}
                                    />
                                    <SelectableInput
                                        propName="borderStyleBottom"
                                        label="Bottom"
                                        options={[
                                            "none",
                                            "hidden",
                                            "dotted",
                                            "dashed",
                                            "solid",
                                            "double",
                                            "groove",
                                            "ridge",
                                            "inset",
                                            "outset",
                                            "initial",
                                            "inherit",
                                        ]}
                                    />
                                    <SelectableInput
                                        propName="borderStyleRight"
                                        label="Right"
                                        options={[
                                            "none",
                                            "hidden",
                                            "dotted",
                                            "dashed",
                                            "solid",
                                            "double",
                                            "groove",
                                            "ridge",
                                            "inset",
                                            "outset",
                                            "initial",
                                            "inherit",
                                        ]}
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                    <p>Border Color</p>
                    <Tabs
                        aria-label="Options"
                        selectedKey={borderColorOption || "all"}
                        onSelectionChange={(val) => {
                            setProp((props: any) => {
                                return (props.borderColorOption = val);
                            }, 1000);
                        }}
                    >
                        <Tab key="all" title="All">
                            <Card>
                                <CardBody>
                                    <ColorInput
                                        propName="borderColorAll"
                                        label="All"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="custom" title="Custom">
                            <Card>
                                <CardBody className="flex flex-col gap-4">
                                    <ColorInput
                                        propName="borderColorTop"
                                        label="Top"
                                    />
                                    <ColorInput
                                        propName="borderWidthLeft"
                                        label="Left"
                                    />
                                    <ColorInput
                                        propName="borderWidthBottom"
                                        label="Bottom"
                                    />
                                    <ColorInput
                                        propName="borderWidthRight"
                                        label="Right"
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </AccordionItem>
                <AccordionItem key="7" aria-label="Effects" title="Effects">
                    <SliderInput propName="opacity" label="Opacity" />
                    <SelectableInput
                        propName="mixBlendMode"
                        label="Mix Blend Mode"
                        options={[
                            "normal",
                            "multiply",
                            "screen",
                            "overlay",
                            "darken",
                            "lighten",
                            "color-dodge",
                            "color-burn",
                            "hard-light",
                            "soft-light",
                            "difference",
                            "exclusion",
                            "hue",
                            "saturation",
                            "color",
                            "luminosity",
                        ]}
                    />
                    <SelectableInput
                        propName="cursor"
                        label="Cursor"
                        options={[
                            "auto",
                            "default",
                            "none",
                            "context-menu",
                            "help",
                            "pointer",
                            "progress",
                            "wait",
                            "cell",
                            "crosshair",
                            "text",
                            "vertical-text",
                            "alias",
                            "copy",
                            "move",
                            "no-drop",
                            "not-allowed",
                            "grab",
                            "grabbing",
                            "all-scroll",
                            "col-resize",
                            "row-resize",
                            "n-resize",
                            "e-resize",
                            "s-resize",
                            "w-resize",
                            "ne-resize",
                            "nw-resize",
                            "se-resize",
                            "sw-resize",
                            "ew-resize",
                            "ns-resize",
                            "nesw-resize",
                            "nwse-resize",
                            "zoom-in",
                            "zoom-out",
                        ]}
                    />
                </AccordionItem>
            </Accordion>
            {children}
            {selected && isEnabled && selected.isDeletable && (
                <Button
                    fullWidth
                    size="lg"
                    variant="flat"
                    color="danger"
                    className="my-2"
                    onPress={() => actions.delete(selected.id)}
                >
                    Delete Element
                </Button>
            )}
        </>
    );
}
