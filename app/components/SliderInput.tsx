import { useNode } from "@craftjs/core";
import { Slider, SliderProps } from "@heroui/react";
import React from "react";

export default function SliderInput({
    propName,
    customValues = [],
    ...rest
}: SliderProps & {
    propName: string;
    customValues?: string[];
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: node.data.props[propName],
    }));
    return (
        <Slider
            defaultValue={value}
            maxValue={1}
            minValue={0}
            step={0.05}
            onChangeEnd={(val) => {
                setProp((props: any) => {
                    return (props[propName] = val);
                });
            }}
            {...rest}
        />
    );
}
