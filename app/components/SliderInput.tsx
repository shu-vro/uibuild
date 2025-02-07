import { useNode } from "@craftjs/core";
import { Slider, SliderProps } from "@heroui/react";
import React from "react";
import { GeneralStatesType } from "./Elements/GeneralSettings";

export default function SliderInput({
    propName,
    type,
    customValues = [],
    ...rest
}: SliderProps & {
    propName: string;
    type?: GeneralStatesType["type"];
    customValues?: string[];
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: type
            ? node.data.props[type][propName]
            : node.data.props[propName],
    }));
    return (
        <Slider
            defaultValue={value}
            maxValue={1}
            minValue={0}
            step={0.05}
            onChangeEnd={(val) => {
                setProp((props: any) => {
                    if (!type) return (props[propName] = val);
                    else return (props[type][propName] = val);
                });
            }}
            {...rest}
        />
    );
}
