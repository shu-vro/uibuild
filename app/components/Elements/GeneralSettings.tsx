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
    Tab,
    Tabs,
    Tooltip,
} from "@heroui/react";
import React from "react";
import SizeInput from "../input-components/SizeInput";
import SelectableInput from "../input-components/SelectableInput";
import ColorInput from "../input-components/ColorInput";
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
import SliderInput from "../input-components/SliderInput";
import MultipleInputs from "../input-components/MultipleInputs";
import BackgroundInput, {
    BackgroundType,
    generateBackgroundStyleFromImage,
} from "../input-components/BackgroundInput";
import styled, { css } from "styled-components";
import { objectDiff } from "@/lib/utils";
import _ from "lodash";

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

    transformOriginOption?: string;
    transformOriginX?: string;
    transformOriginY?: string;
    transformOriginZ?: string;
    transformOriginAll?: string;
    transformStyle?: React.CSSProperties["transformStyle"];
    perspectiveOriginOption?: string;
    perspectiveOriginAll?: string;
    perspectiveOriginX?: string;
    perspectiveOriginY?: string;
    overflowOption?: string;
    overflowX?: string;
    overflowY?: string;
    overflowAll?: string;

    boxShadowCustom?: {
        id: string;
        fields: {
            inset: string;
            x: string;
            y: string;
            blur: string;
            spread: string;
            color: string;
        };
    }[];
    textShadowCustom?: {
        id: string;
        fields: {
            x: string;
            y: string;
            blur: string;
            color: string;
        };
    }[];
    filterCustom?: {
        id: string;
        fields: {
            name: string;
            value: string;
        };
    }[];
    backdropFilterCustom?: {
        id: string;
        fields: {
            name: string;
            value: string;
        };
    }[];
    backgrounds?: BackgroundType[];

    [key: string]: any;
} & React.CSSProperties;

export type GeneralStatesType = {
    type?: "normal" | "hover" | "focus" | "active";
    normal?: GeneralSettingsProps;
    hover?: GeneralSettingsProps;
    focus?: GeneralSettingsProps;
    active?: GeneralSettingsProps;
};

export const generalPropsDefault: GeneralSettingsProps = {
    width: "auto",
    minWidth: "auto",
    maxWidth: "auto",
    height: "auto",
    minHeight: "auto",
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
    paddingAll: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
    marginOption: "all",
    marginAll: "0px",
    marginLeft: "0px",
    marginRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
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
    borderRadiusAll: "0px",
    borderRadiusTopLeft: "0px",
    borderRadiusTopRight: "0px",
    borderRadiusBottomRight: "0px",
    borderRadiusBottomLeft: "0px",

    borderWidthOption: "all",
    borderWidthAll: "0px",
    borderWidthLeft: "0px",
    borderWidthRight: "0px",
    borderWidthTop: "0px",
    borderWidthBottom: "0px",

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
    backfaceVisibility: "visible",
    overflowOption: "all",
    overflowX: "visible",
    overflowY: "visible",
    overflowAll: "visible",
    transformOriginOption: "all",
    transformOriginX: "50%",
    transformOriginY: "50%",
    transformOriginZ: "0",
    transformOriginAll: "50%",
    transformStyle: "flat",
    perspective: "none",
    perspectiveOriginOption: "all",
    perspectiveOriginAll: "50%",
    perspectiveOriginX: "50%",
    perspectiveOriginY: "50%",
    boxShadowCustom: [],
    textShadowCustom: [],
    //@ts-ignore
    backgrounds: [] as BackgroundType[],
    filterCustom: [],
    backdropFilterCustom: [],
    transitionCustom: [],
    backgroundBlendMode: "normal",
};

export const generalStatesDefault: GeneralStatesType = {
    type: "normal",
    normal: generalPropsDefault,
    hover: generalPropsDefault,
    focus: generalPropsDefault,
    active: generalPropsDefault,
};

export const StyledComponent = styled.div<{
    normal: GeneralSettingsProps;
    hover: GeneralSettingsProps;
    focus: GeneralSettingsProps;
    active: GeneralSettingsProps;
}>`
    ${(props: Omit<GeneralStatesType, "type">) =>
        css({
            ...generalStyles({
                type: "normal",
                normal: props.normal,
                hover: props.hover,
                focus: props.focus,
                active: props.active,
            }),
        })}
    &:hover {
        ${(props: Omit<GeneralStatesType, "type">) =>
            css({
                ...generalStyles({
                    type: "hover",
                    normal: props.normal,
                    hover: props.hover,
                    focus: props.focus,
                    active: props.active,
                }),
            })}
    }
    &:focus {
        ${(props: Omit<GeneralStatesType, "type">) =>
            css({
                ...generalStyles({
                    type: "focus",
                    normal: props.normal,
                    hover: props.hover,
                    focus: props.focus,
                    active: props.active,
                }),
            })}
    }
    &:active {
        ${(props: Omit<GeneralStatesType, "type">) =>
            css({
                ...generalStyles({
                    type: "active",
                    normal: props.normal,
                    hover: props.hover,
                    focus: props.focus,
                    active: props.active,
                }),
            })}
    }
`;

export function generalStyles({
    type,
    normal,
    hover,
    focus,
    active,
}: Required<GeneralStatesType>): React.CSSProperties {
    let selected: GeneralSettingsProps = normal;
    switch (type) {
        case "hover":
            selected = hover;
            break;
        case "focus":
            selected = focus;
            break;
        case "active":
            selected = active;
            break;
    }
    // let selected = normal;
    return {
        display: selected.display,
        flex: `${selected.flexGrow} ${selected.flexShrink} ${selected.flexBasis}`,
        width: selected.width,
        maxWidth: selected.maxWidth,
        minWidth: selected.minWidth,
        height: selected.height,
        maxHeight: selected.maxHeight,
        minHeight: selected.minHeight,
        position: selected.position,
        top: selected.top,
        left: selected.left,
        right: selected.right,
        bottom: selected.bottom,
        // font: `${selected.textStyle} normal ${selected.fontWeight} ${selected.fontSize}/${selected.fontLineHeight} ${selected.fontName}`,
        fontFamily: selected.fontName,
        fontSize: selected.fontSize,
        fontWeight: selected.fontWeight,
        lineHeight: selected.fontLineHeight,
        fontStyle: selected.textStyle,
        color: selected.fontColor,
        textAlign: selected.textAlign,
        verticalAlign: selected.fontVerticalAlign,
        textTransform: selected.textTransform,
        direction: selected.textDirection,
        wordBreak: selected.textBreaking,
        textDecoration: selected.textDecoration,
        letterSpacing: selected.fontSpacing,
        flexWrap: selected.flexWrap,
        opacity: selected.opacity,
        mixBlendMode: selected.mixBlendMode,
        cursor: selected.cursor,
        backfaceVisibility: selected.backfaceVisibility,
        justifyContent: selected.justifyContent,
        alignItems: selected.alignItems,
        flexDirection: selected.flexDirection,
        borderRadius:
            selected.borderRadiusOption === "all"
                ? selected.borderRadiusAll
                : `${selected.borderRadiusTopLeft} ${selected.borderRadiusTopRight} ${selected.borderRadiusBottomRight} ${selected.borderRadiusBottomLeft}`,
        borderWidth:
            selected.borderWidthOption === "all"
                ? selected.borderWidthAll
                : `${selected.borderWidthTop} ${selected.borderWidthRight} ${selected.borderWidthBottom} ${selected.borderWidthLeft}`,
        borderStyle:
            selected.borderStyleOption === "all"
                ? selected.borderStyleAll
                : `${selected.borderStyleTop} ${selected.borderStyleRight} ${selected.borderStyleBottom} ${selected.borderStyleLeft}`,
        borderColor:
            selected.borderColorOption === "all"
                ? selected.borderColorAll
                : `${selected.borderColorTop} ${selected.borderColorRight} ${selected.borderColorBottom} ${selected.borderColorLeft}`,
        padding:
            selected.paddingOption === "all"
                ? selected.paddingAll
                : `${selected.paddingTop} ${selected.paddingRight} ${selected.paddingBottom} ${selected.paddingLeft}`,
        margin:
            selected.marginOption === "all"
                ? selected.marginAll
                : `${selected.marginTop} ${selected.marginRight} ${selected.marginBottom} ${selected.marginLeft}`,
        gap:
            selected.gapOption === "all"
                ? selected.gapAll
                : `${selected.gapRow} ${selected.gapColumn}`,
        overflow:
            selected.overflowOption === "all"
                ? selected.overflowAll
                : `${selected.overflowX} ${selected.overflowY}`,
        transformOrigin:
            selected.transformOriginOption === "all"
                ? selected.transformOriginAll
                : `${selected.transformOriginX} ${selected.transformOriginY} ${!selected.transformOriginZ?.match(/^0/) ? selected.transformOriginZ : ""}`,
        perspectiveOrigin:
            selected.perspectiveOriginOption === "all"
                ? selected.perspectiveOriginAll
                : `${selected.perspectiveOriginX} ${selected.perspectiveOriginY}`,
        boxShadow: selected.boxShadowCustom
            ?.map(({ fields }) => {
                return (
                    `${fields.inset === "inset" ? "inset" : ""} ${fields.x} ${fields.y} ${fields.blur} ${fields.spread} ${fields.color}` ||
                    ("" as React.CSSProperties["boxShadow"])
                );
            })
            .join(","),
        textShadow: selected.textShadowCustom
            ?.map(({ fields }) => {
                return (
                    `${fields.x} ${fields.y} ${fields.blur} ${fields.color}` ||
                    ("" as React.CSSProperties["textShadow"])
                );
            })
            .join(","),
        background: selected.backgrounds
            ?.map(({ fields }) => {
                let text;
                if (fields.type === "color") {
                    text = fields.color.color;
                } else if (fields.type === "gradient") {
                    text = fields.gradient.gradient;
                } else {
                    text = generateBackgroundStyleFromImage(fields.image);
                }
                return text;
            })
            .join(","),

        filter: selected.filterCustom
            ?.map(({ fields }) => {
                return `${fields.name}(${fields.value})`;
            })
            .join(" "),
        backdropFilter: selected.backdropFilterCustom
            ?.map(({ fields }) => {
                return `${fields.name}(${fields.value})`;
            })
            .join(" "),
        transition: selected.transitionCustom
            ?.map(({ fields }) => {
                return `${fields.property} ${fields.duration} ${fields.delay} ${fields.timingFunction}`;
            })
            .join(","),

        // ...selected,
    };
}

export function getState(
    type: NonNullable<GeneralStatesType["type"]>,
    rest: Record<string, GeneralSettingsProps>,
) {
    return rest[type!];
}

export function GeneralSettings({ children }: { children?: React.ReactNode }) {
    const {
        actions: { setProp },
        type,
        rest,
    } = useNode((node) => ({
        text: node.data.props.text,
        type: node.data.props.type as NonNullable<GeneralStatesType["type"]>,
        rest: {
            normal: node.data.props.normal,
            active: node.data.props.active,
            focus: node.data.props.focus,
            hover: node.data.props.hover,
        } as Record<GeneralStatesType["type"], GeneralSettingsProps>,
    }));

    let currState = getState(type, rest);

    const {
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
        fontLineHeight,
        fontSpacing,
        fontVerticalAlign,
        borderWidthOption,
        borderStyleOption,
        borderRadiusOption,
        borderColorOption,
        overflowOption,
        transformOriginOption,
        transformStyle,
        perspectiveOriginOption,
    } = currState;

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
            <SelectableInput
                propName="type"
                className="my-4"
                labelPlacement="inside"
                options={["normal", "hover", "focus", "active"]}
                overrideOnChange
                onChangeFn={(val: GeneralStatesType["type"]) => {
                    let selectedState = _.cloneDeep(getState(val, rest));
                    let d_minus_h = objectDiff(
                        generalPropsDefault,
                        selectedState,
                    );
                    d_minus_h = {
                        ..._.cloneDeep(generalPropsDefault),
                        ..._.cloneDeep(d_minus_h),
                    };
                    for (let key in d_minus_h) {
                        if (_.isEqual(d_minus_h[key], selectedState[key])) {
                            // console.log(key)
                            console.log(
                                key,
                                selectedState[key],
                                rest.normal[key],
                                Object.isFrozen(selectedState[key]),
                            );
                            selectedState[key] = rest.normal[key];
                        }
                    }
                    // console.log(objectDiff(generalPropsDefault, selectedState));
                    setProp((props: any) => {
                        props.type = val;
                        props[val] = selectedState;
                    }, 1000);
                }}
            />
            <Tabs aria-label="General Settings" fullWidth color="primary">
                <Tab key="2" title="Styles">
                    <Accordion
                        keepContentMounted
                        selectionMode="multiple"
                        variant="splitted"
                        className="px-0 mt-2"
                        itemClasses={{
                            content: "flex flex-col gap-4 m-0",
                        }}
                    >
                        <AccordionItem
                            key="1"
                            aria-label="Layout"
                            title="Layout"
                        >
                            <SelectableInput
                                type={type}
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
                                                setProp((props) => {
                                                    return (props[
                                                        props.type
                                                    ].flexDirection = val);
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
                                                    return (props[
                                                        props.type
                                                    ].justifyContent = val);
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
                                                    return (props[
                                                        props.type
                                                    ].alignItems = val);
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
                                            type={type}
                                            label="Flex Wrap"
                                            propName="flexWrap"
                                            options={[
                                                "nowrap",
                                                "wrap",
                                                "wrap-reverse",
                                            ]}
                                        />
                                        <div>
                                            <p>Gap</p>
                                            <Tabs
                                                aria-label="Options"
                                                selectedKey={gapOption}
                                                onSelectionChange={(val) => {
                                                    setProp((props: any) => {
                                                        return (props[
                                                            props.type
                                                        ].gapOption = val);
                                                    }, 1000);
                                                }}
                                            >
                                                <Tab key="all" title="All">
                                                    <Card>
                                                        <CardBody>
                                                            <SizeInput
                                                                type={type}
                                                                propName="gapAll"
                                                                label="All"
                                                            />
                                                        </CardBody>
                                                    </Card>
                                                </Tab>
                                                <Tab
                                                    key="custom"
                                                    title="Custom"
                                                >
                                                    <Card>
                                                        <CardBody className="flex flex-col gap-4">
                                                            <SizeInput
                                                                type={type}
                                                                propName="gapRow"
                                                                label="Row"
                                                            />
                                                            <SizeInput
                                                                type={type}
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
                                    value={flexGrow as unknown as string}
                                    onChange={(e) => {
                                        setProp(
                                            (props: any) =>
                                                (props[props.type].flexGrow =
                                                    e.target.value),
                                            1000,
                                        );
                                    }}
                                />
                                <Input
                                    type="number"
                                    label="Shrink"
                                    value={flexShrink as unknown as string}
                                    onChange={(e) => {
                                        setProp(
                                            (props: any) =>
                                                (props[props.type].flexShrink =
                                                    e.target.value),
                                            1000,
                                        );
                                    }}
                                />
                                <SelectableInput
                                    type={type}
                                    label="Flex basis"
                                    propName="flexBasis"
                                    options={["auto", "inherit"]}
                                />
                            </div>
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Size" title="Size">
                            <SizeInput
                                type={type}
                                propName="width"
                                label="Width"
                                customValues={[
                                    "min-content",
                                    "max-content",
                                    "fit-content",
                                    "stretch",
                                ]}
                            />
                            <SizeInput
                                type={type}
                                propName="minWidth"
                                label="Min Width"
                                customValues={[
                                    "min-content",
                                    "max-content",
                                    "fit-content",
                                    "stretch",
                                ]}
                            />
                            <SizeInput
                                type={type}
                                propName="maxWidth"
                                label="Max Width"
                                customValues={[
                                    "min-content",
                                    "max-content",
                                    "fit-content",
                                    "stretch",
                                ]}
                            />
                            <SizeInput
                                type={type}
                                propName="height"
                                label="Height"
                                customValues={[
                                    "min-content",
                                    "max-content",
                                    "fit-content",
                                    "stretch",
                                ]}
                            />
                            <SizeInput
                                type={type}
                                propName="minHeight"
                                label="Min Height"
                                customValues={[
                                    "min-content",
                                    "max-content",
                                    "fit-content",
                                    "stretch",
                                ]}
                            />
                            <SizeInput
                                type={type}
                                propName="maxHeight"
                                label="Max Height"
                                customValues={[
                                    "min-content",
                                    "max-content",
                                    "fit-content",
                                    "stretch",
                                ]}
                            />
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Space" title="Space">
                            <div>
                                <p>Padding</p>
                                <Tabs
                                    aria-label="Options"
                                    selectedKey={paddingOption || "all"}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props[
                                                props.type
                                            ].paddingOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title="All">
                                        <Card>
                                            <CardBody>
                                                <SizeInput
                                                    type={type}
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
                                                    type={type}
                                                    propName="paddingTop"
                                                    label="Padding Top"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="paddingLeft"
                                                    label="Padding Left"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="paddingBottom"
                                                    label="Padding Bottom"
                                                />
                                                <SizeInput
                                                    type={type}
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
                                            return (props[
                                                props.type
                                            ].marginOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title="All">
                                        <Card>
                                            <CardBody>
                                                <SizeInput
                                                    type={type}
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
                                                    type={type}
                                                    propName="marginTop"
                                                    label="Margin Top"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="marginLeft"
                                                    label="Margin Left"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="marginBottom"
                                                    label="Margin Bottom"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="marginRight"
                                                    label="Margin Right"
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="4"
                            aria-label="Position"
                            title="Position"
                        >
                            <SelectableInput
                                type={type}
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
                                    <SizeInput
                                        type={type}
                                        propName="top"
                                        label="Top"
                                    />
                                    <SizeInput
                                        type={type}
                                        propName="left"
                                        label="Left"
                                    />
                                    <SizeInput
                                        type={type}
                                        propName="bottom"
                                        label="Bottom"
                                    />
                                    <SizeInput
                                        type={type}
                                        propName="right"
                                        label="Right"
                                    />
                                </>
                            ) : null}
                        </AccordionItem>
                        <AccordionItem
                            key="5"
                            aria-label="Typography"
                            title="Typography"
                        >
                            <SelectableInput
                                type={type}
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
                            <ColorInput
                                type={type}
                                propName="fontColor"
                                label="Font Color"
                            />
                            <SizeInput
                                type={type}
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
                                            (props[props.type].textAlign =
                                                value.target.value),
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
                                            (props[
                                                props.type
                                            ].fontVerticalAlign =
                                                value.target.value),
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
                                type={type}
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
                                type={type}
                                propName="fontLineHeight"
                                value={fontLineHeight}
                                label="Line Height"
                                customValues={["normal"]}
                            />
                            <SizeInput
                                type={type}
                                value={fontSpacing}
                                propName="fontSpacing"
                                label="Text Spacing"
                            />
                            <SelectableInput
                                type={type}
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
                                type={type}
                                propName="textDirection"
                                label="Text Direction"
                                options={["ltr", "rtl"]}
                            />
                            <SelectableInput
                                type={type}
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
                                type={type}
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
                                type={type}
                                propName="textStyle"
                                label="Text Style"
                                options={["normal", "italic", "oblique"]}
                            />
                        </AccordionItem>
                        <AccordionItem
                            key="6"
                            aria-label="Border"
                            title="Border"
                        >
                            <div>
                                <p>Border Radius</p>
                                <Tabs
                                    aria-label="Options"
                                    selectedKey={borderRadiusOption || "all"}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props[
                                                props.type
                                            ].borderRadiusOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title="All">
                                        <Card>
                                            <CardBody>
                                                <SizeInput
                                                    type={type}
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
                                                    type={type}
                                                    propName="borderWidthTopLeft"
                                                    label="Top Left"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="borderWidthTopRight"
                                                    label="Top Right"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="borderWidthBottomLeft"
                                                    label="Bottom Left"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="borderWidthBottomRight"
                                                    label="Bottom Right"
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
                            <div>
                                <p>Border Width</p>
                                <Tabs
                                    aria-label="Options"
                                    selectedKey={borderWidthOption || "all"}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props[
                                                props.type
                                            ].borderWidthOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title="All">
                                        <Card>
                                            <CardBody>
                                                <SizeInput
                                                    type={type}
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
                                                    type={type}
                                                    propName="borderWidthTop"
                                                    label="Top"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="borderWidthLeft"
                                                    label="Left"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="borderWidthBottom"
                                                    label="Bottom"
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="borderWidthRight"
                                                    label="Right"
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
                            <div>
                                <p>Border Style</p>
                                <Tabs
                                    aria-label="Options"
                                    selectedKey={borderStyleOption || "all"}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props[
                                                props.type
                                            ].borderStyleOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title="All">
                                        <Card>
                                            <CardBody>
                                                <SelectableInput
                                                    type={type}
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
                                                    type={type}
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
                                                    type={type}
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
                                                    type={type}
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
                                                    type={type}
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
                            </div>
                            <div>
                                <p>Border Color</p>
                                <Tabs
                                    aria-label="Options"
                                    selectedKey={borderColorOption || "all"}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props[
                                                props.type
                                            ].borderColorOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title="All">
                                        <Card>
                                            <CardBody>
                                                <ColorInput
                                                    type={type}
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
                                                    type={type}
                                                    propName="borderColorTop"
                                                    label="Top"
                                                />
                                                <ColorInput
                                                    type={type}
                                                    propName="borderWidthLeft"
                                                    label="Left"
                                                />
                                                <ColorInput
                                                    type={type}
                                                    propName="borderWidthBottom"
                                                    label="Bottom"
                                                />
                                                <ColorInput
                                                    type={type}
                                                    propName="borderWidthRight"
                                                    label="Right"
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="7"
                            aria-label="Background"
                            title="Background"
                        >
                            <BackgroundInput />
                            <SelectableInput
                                type={type}
                                propName="backgroundBlendMode"
                                label="Background Blend Mode"
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
                        </AccordionItem>
                        <AccordionItem
                            key="8"
                            aria-label="Effects"
                            title="Effects"
                        >
                            <SliderInput
                                type={type}
                                propName="opacity"
                                label="Opacity"
                            />
                            <SelectableInput
                                type={type}
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
                                type={type}
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
                            <SelectableInput
                                type={type}
                                propName="backfaceVisibility"
                                label="Backface Visibility"
                                options={["visible", "hidden"]}
                            />
                            <div>
                                <p>Overflow</p>
                                <Tabs
                                    aria-label="overflowOption"
                                    selectedKey={overflowOption}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props[
                                                props.type
                                            ].overflowOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title={"All"}>
                                        <Card>
                                            <CardBody>
                                                <SelectableInput
                                                    type={type}
                                                    propName="overflowAll"
                                                    label="All"
                                                    options={[
                                                        "visible",
                                                        "hidden",
                                                    ]}
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="custom" title={"Custom"}>
                                        <Card>
                                            <CardBody>
                                                <SelectableInput
                                                    type={type}
                                                    propName="overflowX"
                                                    label="X"
                                                    options={[
                                                        "visible",
                                                        "hidden",
                                                    ]}
                                                />
                                                <SelectableInput
                                                    type={type}
                                                    propName="overflowY"
                                                    label="Y"
                                                    options={[
                                                        "visible",
                                                        "hidden",
                                                    ]}
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
                            <div>
                                <p>Transform Origin</p>
                                <Tabs
                                    aria-label="transformOriginOption"
                                    selectedKey={transformOriginOption}
                                    onSelectionChange={(val) => {
                                        setProp((props: any) => {
                                            return (props[
                                                props.type
                                            ].transformOriginOption = val);
                                        }, 1000);
                                    }}
                                >
                                    <Tab key="all" title={"All"}>
                                        <Card>
                                            <CardBody>
                                                <SizeInput
                                                    type={type}
                                                    propName="transformOriginAll"
                                                    label="All"
                                                    customValues={[
                                                        "left",
                                                        "right",
                                                        "top",
                                                        "bottom",
                                                        "center",
                                                    ]}
                                                    clearDefaultValues
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="custom" title={"Custom"}>
                                        <Card>
                                            <CardBody>
                                                <SizeInput
                                                    type={type}
                                                    propName="transformOriginX"
                                                    label="X"
                                                    customValues={[
                                                        "left",
                                                        "center",
                                                        "right",
                                                    ]}
                                                    clearDefaultValues
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="transformOriginY"
                                                    label="Y"
                                                    customValues={[
                                                        "top",
                                                        "center",
                                                        "bottom",
                                                    ]}
                                                    clearDefaultValues
                                                />
                                                <SizeInput
                                                    type={type}
                                                    propName="transformOriginZ"
                                                    label="Z"
                                                    clearDefaultValues
                                                />
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>
                            <div>
                                <h2 className="text-xl">Children Transform</h2>
                                <div className="flex flex-row gap-4">
                                    <SizeInput
                                        type={type}
                                        propName="perspective"
                                        label="Perspective"
                                        clearDefaultValues
                                        customValues={["none"]}
                                    />
                                    <Tabs
                                        className="mt-6"
                                        selectedKey={transformStyle}
                                        onSelectionChange={(val) => {
                                            setProp((props: any) => {
                                                return (props[
                                                    props.type
                                                ].transformStyle = val);
                                            }, 1000);
                                        }}
                                    >
                                        <Tab key="flat" title={"2d"}></Tab>
                                        <Tab
                                            key="preserve-3d"
                                            title={"3d"}
                                        ></Tab>
                                    </Tabs>
                                </div>
                                <div>
                                    <p>Perspective Origin</p>
                                    <Tabs
                                        selectedKey={perspectiveOriginOption}
                                        onSelectionChange={(val) => {
                                            setProp((props: any) => {
                                                return (props[
                                                    type
                                                ].perspectiveOriginOption =
                                                    val);
                                            }, 1000);
                                        }}
                                    >
                                        <Tab key="all" title={"All"}>
                                            <Card>
                                                <CardBody>
                                                    <SizeInput
                                                        type={type}
                                                        propName="perspectiveOriginAll"
                                                        label="All"
                                                        clearDefaultValues
                                                        customValues={[
                                                            "initial",
                                                            "inherit",
                                                            "Left",
                                                            "Right",
                                                            "Top",
                                                            "Bottom",
                                                            "Center",
                                                        ]}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Tab>
                                        <Tab key="custom" title={"Custom"}>
                                            <Card>
                                                <CardBody>
                                                    <SizeInput
                                                        type={type}
                                                        propName="perspectiveOriginX"
                                                        label="X"
                                                        clearDefaultValues
                                                        customValues={[
                                                            "initial",
                                                            "inherit",
                                                            "Left",
                                                            "Right",
                                                            "Top",
                                                            "Bottom",
                                                            "Center",
                                                        ]}
                                                    />
                                                    <SizeInput
                                                        type={type}
                                                        propName="perspectiveOriginY"
                                                        label="Y"
                                                        clearDefaultValues
                                                        customValues={[
                                                            "initial",
                                                            "inherit",
                                                            "Left",
                                                            "Right",
                                                            "Top",
                                                            "Bottom",
                                                            "Center",
                                                        ]}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <MultipleInputs
                                    title="Box Shadow"
                                    propName="boxShadowCustom"
                                    type={type}
                                    defaultFields={{
                                        x: "0px",
                                        y: "0px",
                                        blur: "0px",
                                        spread: "0px",
                                        color: "#000000",
                                        inset: "outset",
                                    }}
                                    fields={[
                                        {
                                            name: "inset",
                                            label: "Inset",
                                            options: [
                                                {
                                                    label: "Inset",
                                                    value: "inset",
                                                },
                                                {
                                                    label: "Outset",
                                                    value: "outset", // doesn't exist
                                                },
                                            ],
                                            type: "tabs",
                                        },
                                        { name: "x", label: "X", type: "size" },
                                        {
                                            name: "y",
                                            label: "Y",
                                            type: "size",
                                        },
                                        {
                                            name: "blur",
                                            label: "Blur",
                                            type: "size",
                                        },
                                        {
                                            name: "spread",
                                            label: "Spread",
                                            type: "size",
                                        },
                                        {
                                            name: "color",
                                            label: "Color",
                                            type: "color",
                                        },
                                    ]}
                                />
                                <MultipleInputs
                                    title="Text Shadow"
                                    type={type}
                                    propName="textShadowCustom"
                                    defaultFields={{
                                        x: "0px",
                                        y: "0px",
                                        blur: "0px",
                                        color: "#000000",
                                    }}
                                    fields={[
                                        { name: "x", label: "X", type: "size" },
                                        {
                                            name: "y",
                                            label: "Y",
                                            type: "size",
                                        },
                                        {
                                            name: "blur",
                                            label: "Blur",
                                            type: "size",
                                        },
                                        {
                                            name: "color",
                                            label: "Color",
                                            type: "color",
                                        },
                                    ]}
                                />
                                <MultipleInputs
                                    type={type}
                                    title="Filter"
                                    propName="filterCustom"
                                    defaultFields={{
                                        name: "blur",
                                        value: "0px",
                                    }}
                                    fields={[
                                        {
                                            name: "name",
                                            label: "Name",
                                            type: "select",
                                            options: [
                                                "blur",
                                                "brightness",
                                                "contrast",
                                                "drop-shadow",
                                                "grayscale",
                                                "hue-rotate",
                                                "invert",
                                                "opacity",
                                                "saturate",
                                                "sepia",
                                            ],
                                        },
                                        {
                                            name: "value",
                                            label: "Value",
                                            type: "size",
                                            additionalUnitValues: [
                                                " ",
                                                "deg",
                                                "rad",
                                            ],
                                        },
                                    ]}
                                />
                                <MultipleInputs
                                    type={type}
                                    title="Backdrop Filter"
                                    propName="backdropFilterCustom"
                                    defaultFields={{
                                        name: "blur",
                                        value: "0px",
                                    }}
                                    fields={[
                                        {
                                            name: "name",
                                            label: "Name",
                                            type: "select",
                                            options: [
                                                "blur",
                                                "brightness",
                                                "contrast",
                                                "drop-shadow",
                                                "grayscale",
                                                "hue-rotate",
                                                "invert",
                                                "opacity",
                                                "saturate",
                                                "sepia",
                                            ],
                                        },
                                        {
                                            name: "value",
                                            label: "Value",
                                            type: "size",
                                            additionalUnitValues: [
                                                " ",
                                                "deg",
                                                "rad",
                                            ],
                                        },
                                    ]}
                                />
                                <MultipleInputs
                                    type={type}
                                    title="Transition"
                                    propName="transitionCustom"
                                    defaultFields={{
                                        property: "all",
                                        duration: "0s",
                                        timingFunction: "ease",
                                        delay: "0s",
                                    }}
                                    fields={[
                                        {
                                            name: "property",
                                            label: "Property",
                                            type: "select",
                                            options: [
                                                "all",
                                                "background-color",
                                                "border-color",
                                                "color",
                                                "height",
                                                "width",
                                                "transform",
                                                "opacity",
                                                "visibility",
                                                "border-radius",
                                                "border-width",
                                                "border-style",
                                                "border",
                                                "box-shadow",
                                                "text-shadow",
                                                "filter",
                                                "backdrop-filter",
                                                "perspective",
                                            ],
                                        },
                                        {
                                            name: "duration",
                                            label: "Duration",
                                            type: "size",
                                            additionalUnitValues: ["s", "ms"],
                                        },
                                        {
                                            name: "timingFunction",
                                            label: "Timing Function",
                                            type: "select",
                                            options: [
                                                "ease",
                                                "linear",
                                                "ease-in",
                                                "ease-out",
                                                "ease-in-out",
                                                "cubic-bezier(0.47, 0, 0.745, 0.715)",
                                                "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
                                                "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
                                                "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
                                                "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
                                                "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
                                                "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
                                                "cubic-bezier(0.36, 0, 0.66, -0.56)",
                                                "cubic-bezier(0.39, 0.575, 0.565, 1)",
                                                "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                                "cubic-bezier(0.215, 0.61, 0.355, 1)",
                                                "cubic-bezier(0.165, 0.84, 0.44, 1)",
                                                "cubic-bezier(0.23, 1, 0.32, 1)",
                                                "cubic-bezier(0.19, 1, 0.22, 1)",
                                                "cubic-bezier(0.075, 0.82, 0.165, 1)",
                                                "cubic-bezier(0.34, 1.56, 0.64, 1)",
                                                "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
                                                "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
                                                "cubic-bezier(0.645, 0.045, 0.355, 1)",
                                                "cubic-bezier(0.77, 0, 0.175, 1)",
                                                "cubic-bezier(0.86, 0, 0.07, 1)",
                                                "cubic-bezier(1, 0, 0, 1)",
                                                "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
                                                "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
                                                "cubic-bezier(0.68, 1.55, 0.265, 1)",
                                                "cubic-bezier(0.87, -0.41, 0.19, 1.44)",
                                            ],
                                        },
                                        {
                                            name: "delay",
                                            label: "Delay",
                                            type: "size",
                                            additionalUnitValues: ["s", "ms"],
                                        },
                                    ]}
                                />
                            </div>
                        </AccordionItem>
                    </Accordion>
                </Tab>
                <Tab key="1" title="Properties">
                    {children}
                </Tab>
            </Tabs>
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
