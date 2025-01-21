"use client";

import { useNode } from "@craftjs/core";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import React from "react";

export default function SelectableInput({
    propName,
    options = [],
    children,
    ...rest
}: Partial<SelectProps> & {
    propName: string;
    options?: string[];
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: node.data.props[propName],
    }));
    return (
        <Select
            className="max-w-xs"
            labelPlacement="outside"
            placeholder="Select an option"
            {...rest}
            label={rest.label || "field"}
            aria-label={String(rest.label) || "field"}
            selectedKeys={[value]}
            onChange={(e) => {
                setProp((props: any) => {
                    return (props[propName] = e.target.value);
                });
            }}
        >
            {options.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
            ))}
        </Select>
    );
}
