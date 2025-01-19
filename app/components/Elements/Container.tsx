import { useNode } from "@craftjs/core";
import { Input, Slider } from "@nextui-org/react";
import React from "react";
import { Resizer } from "../Resizer";

type ContainerProps = {
    background: string;
    padding: number;
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
};

export function Container({
    background,
    padding,
    children,
    width = "100px",
    height = "100px",
    ...props
}: ContainerProps) {
    const {
        connectors: { connect },
    } = useNode();
    return (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                style={{
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    background,
                    // color: `rgba(${Object.values(color)})`,
                    padding: `${padding}px`,
                    // margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
                    // boxShadow:
                    //     shadow === 0
                    //         ? "none"
                    //         : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
                    // borderRadius: `${radius}px`,
                    // flex: fillSpace === "yes" ? 1 : "unset",
                }}
            >
                {children}
            </Resizer>
        </>
    );
}

export const ContainerSettings = () => {
    const {
        background,
        padding,
        width,
        height,
        actions: { setProp },
    } = useNode((node) => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
        width: node.data.props.width,
        height: node.data.props.height,
    }));

    return (
        <div>
            <div>
                <Input
                    label="Width"
                    value={width}
                    onValueChange={(e) => {
                        setProp((props) => (props.width = e), 500);
                    }}
                />
                <Input
                    label="Height"
                    value={height}
                    onValueChange={(e) => {
                        setProp((props) => (props.height = e), 500);
                    }}
                />
            </div>
            <div>
                <label htmlFor="choose-color">Background</label>
                <input
                    id="choose-color"
                    type="color"
                    value={background}
                    onChange={(e) => {
                        setProp(
                            (props) => (props.background = e.target.value),
                            500,
                        );
                    }}
                />
            </div>
            <Slider
                defaultValue={padding}
                label="Padding"
                onChange={(value) =>
                    setProp((props) => (props.padding = value), 500)
                }
            />
        </div>
    );
};

export const ContainerDefaultProps = {
    background: "#ffffff",
    padding: 3,
    width: "100%",
    height: "auto",
};

Container.craft = {
    displayName: "Container",
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
