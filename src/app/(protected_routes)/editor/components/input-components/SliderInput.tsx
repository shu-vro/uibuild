import { useNode } from "@craftjs/core";
import { Slider, SliderProps } from "@heroui/react";
import React, { useCallback, useEffect, useState } from "react";
import { GeneralStatesType } from "../Elements/GeneralSettings";
import { debounce } from "lodash";

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
        props,
    } = useNode((node) => ({
        props: node.data.props,
        value: type
            ? node.data.props[type][propName]
            : node.data.props[propName],
    }));
    const [val, setVal] = useState(value);

    const handleValueChange = useCallback(
        debounce((val: number | number[]) => {
            setProp((props: any) => {
                if (!type) return (props[propName] = val);
                else return (props[type][propName] = val);
            });
        }, 300),
        [type, propName],
    );

    useEffect(() => {
        if (!propName) return;
        if (!type) setVal(props[propName] || value);
        else setVal(props[type][propName] || value);
    }, [type]);

    return (
        <Slider
            value={val}
            maxValue={1}
            minValue={0}
            step={0.01}
            onChange={(val) => {
                setVal(val);
                handleValueChange(val);
            }}
            {...rest}
        />
    );
}
