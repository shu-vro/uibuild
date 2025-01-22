"use client";

import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { Input, InputProps, Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";

const parseSizeValue = (
    value: string = "",
    customValues: string[],
): [string, string] => {
    if (customValues.includes(value)) {
        return ["0", value];
    }
    const match = value.match(/^(\d*\.?\d+)(\D+)$/);
    if (match) {
        const numberValue = parseFloat(match[1]);
        return [numberValue.toFixed(1), match[2]];
    }
    return ["0", "%"];
};

export default function SizeInput({
    propName,
    customValues = [],
    clearDefaultValues = false,
    ...rest
}: InputProps & {
    propName: string;
    customValues?: string[];
    clearDefaultValues?: boolean;
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: node.data.props[propName],
    }));

    if (!clearDefaultValues) {
        customValues = customValues.concat(["initial", "auto"]);
    }
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
                type="number"
                label="Padding"
                labelPlacement="outside"
                {...rest}
                classNames={{
                    inputWrapper: cn("pr-0", rest?.className),
                }}
                value={intVal}
                onValueChange={(e) => {
                    setIntVal(e);
                }}
                endContent={
                    <Select
                        className="p-0 m-0"
                        aria-label="Unit"
                        selectedKeys={[unit]}
                        onChange={(e) => {
                            setUnit(e.target.value);
                        }}
                    >
                        <>
                            {customValues.map((option) => (
                                <SelectItem key={option}>{option}</SelectItem>
                            ))}
                        </>

                        <SelectItem key="%">%</SelectItem>
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
                }
            />
        </div>
    );
}
