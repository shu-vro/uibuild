import { useNode } from "@craftjs/core";
import { Select, SelectItem, Slider } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";

interface TextProps {
    text: string;
    fontSize: number;
    textAlign: string;
    [key: string]: any;
}

export function Text({ text, fontSize, textAlign, ...props }) {
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
                width: "100%",
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
                html={text}
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
                style={{ fontSize: `${fontSize}px`, textAlign }}
            />
        </div>
    );
}

const TextSettings = () => {
    const {
        actions: { setProp },
        fontSize,
        textAlign,
    } = useNode((node) => ({
        text: node.data.props.text,
        fontSize: node.data.props.fontSize,
        textAlign: node.data.props.textAlign,
    }));

    return (
        <>
            <Slider
                value={fontSize || 7}
                label="Font size"
                step={7}
                minValue={1}
                maxValue={50}
                onChange={(value) => {
                    setProp((props: any) => (props.fontSize = value), 1000);
                }}
            />
            <Select
                className="max-w-xs"
                label="text align"
                value={textAlign}
                onChange={(value) => {
                    console.log(value.target.value);
                    setProp(
                        (props: any) => (props.textAlign = value.target.value),
                        1000,
                    );
                }}
            >
                <SelectItem key="left" value="left">
                    Left
                </SelectItem>
                <SelectItem key="center" value="center">
                    Center
                </SelectItem>
                <SelectItem key="right" value="right">
                    Right
                </SelectItem>
            </Select>
        </>
    );
};

export const TextDefaultProps = {
    text: "Hi",
    fontSize: 20,
    textAlign: "left",
};

Text.craft = {
    props: TextDefaultProps,
    related: {
        settings: TextSettings,
    },
};
