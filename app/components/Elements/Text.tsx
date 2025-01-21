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
import SelectableInput from "../SelectableInput";

type TextAlign = "left" | "center" | "right";

type Position = "relative" | "absolute" | "fixed" | "sticky" | "static";

type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";

type Direction = "ltr" | "rtl";

type WordBreak = "normal" | "break-all" | "keep-all" | "break-word";

interface TextProps {
    text?: string;
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

    fontName?: string;
    fontColor?: string;
    fontSize?: string;
    textAlign?: TextAlign;
    fontWeight?: string;
    fontLineHeight?: string;
    fontSpacing?: string;
    fontVerticalAlign?: string;
    textBreaking?: WordBreak;
    textDirection?: Direction;
    textDecoration?: string;
    textStyle?: string;
    [key: string]: any;
}

export function Text({
    text,
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
        fontColor,
        fontLineHeight,
        fontSpacing,
        fontVerticalAlign,
    } = useNode((node) => ({
        text: node.data.props.text,
        width: node.data.props.width,
        maxWidth: node.data.props.maxWidth,
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
                        label="Position"
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
                            "Times New Roman",
                            "Courier New",
                        ]}
                    />
                    {/* <SelectableInput
                        label="Font Color"
                        propName="fontColor"
                        options={["black", "white", "red", "green", "blue"]}
                    /> */}
                    <label htmlFor="color-select">
                        <div>Color</div>
                        <input
                            className="w-full h-10"
                            type="color"
                            id="color-select"
                            value={fontColor}
                            onChange={(e) => {
                                setProp((props: any) => {
                                    return (props.fontColor = e.target.value);
                                }, 1000);
                            }}
                        />
                    </label>
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
            </Accordion>
        </>
    );
};

export const TextDefaultProps = {
    text: "Hi",
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
    fontName: "MontSerrat",
    fontColor: "white",
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
};

Text.craft = {
    props: TextDefaultProps,
    related: {
        settings: TextSettings,
    },
};
