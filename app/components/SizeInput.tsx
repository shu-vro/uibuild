"use client";

import { useNode } from "@craftjs/core";
import { Input, InputProps, Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";

const parseSizeValue = (
    value: string = "",
    customValues: string[],
): [string, string] => {
    console.log(value);
    if (customValues.includes(value)) {
        return ["0", value];
    }
    const match = value.match(/^(\d*\.?\d+)(\D+)$/);
    if (match) {
        const numberValue = parseFloat(match[1]);
        return [numberValue.toFixed(1), match[2]];
    }
    return ["0", "rem"];
};

export default function SizeInput({
    propName,
    customValues = [],
    ...rest
}: InputProps & {
    propName: string;
    customValues?: string[];
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: node.data.props[propName],
    }));

    customValues = customValues.concat(["initial", "auto"]);
    value = parseSizeValue(value, customValues);
    const [intVal, setIntVal] = useState(value[0] || 0);
    const [unit, setUnit] = useState(value[1] || "rem");

    useEffect(() => {
        setProp((props: any) => {
            if (customValues.includes(unit)) {
                setIntVal("0");
                return (props[propName] = unit);
            }
            const newValue = `${intVal}${unit}`;
            return (props[propName] = newValue);
        });
    }, [intVal, unit]);

    return (
        <div className="flex gap-1 flex-row">
            <Input
                type="string"
                label="Padding"
                labelPlacement="outside"
                {...rest}
                value={intVal}
                onValueChange={(e) => {
                    setIntVal(e);
                }}
            />
            <Select
                className="w-24 shrink-0 mt-6"
                aria-label="Unit"
                selectedKeys={[unit]}
                onChange={(e) => {
                    setUnit(e.target.value);
                }}
            >
                <SelectItem key="initial">initial</SelectItem>
                <SelectItem key="auto">auto</SelectItem>
                <SelectItem key="px">px</SelectItem>
                <SelectItem key="rem">rem</SelectItem>
                <SelectItem key="em">em</SelectItem>
                <SelectItem key="in">in</SelectItem>
                <SelectItem key="vw">vw</SelectItem>
                <SelectItem key="vh">vh</SelectItem>
                <SelectItem key="dvh">dvh</SelectItem>
                <SelectItem key="svh">svh</SelectItem>
                <SelectItem key="lvh">lvh</SelectItem>
            </Select>
        </div>
    );
}
