"use client";

import { useNode } from "@craftjs/core";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import React, { useState } from "react";

export default function SelectableInput({
    propName,
    options = [],
    children,
    overrideOnChange = false,
    defaultValue = "",
    onChangeFn,
    ...rest
}: Partial<SelectProps> & {
    propName: string;
    options?: string[];
    overrideOnChange?: boolean;
    defaultValue?: string;
    onChangeFn?: (value: string) => void;
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: node.data.props[propName],
    }));
    const [overriddenValue, setOverriddenValue] = useState(defaultValue);
    return (
        <Select
            className="max-w-xs"
            labelPlacement="outside"
            placeholder="Select an option"
            {...rest}
            label={rest.label || "field"}
            aria-label={String(rest.label) || "field"}
            selectedKeys={[overriddenValue || value]}
            onChange={(e) => {
                if (overrideOnChange) {
                    onChangeFn && onChangeFn(e.target.value);
                    setOverriddenValue(e.target.value);
                    return;
                }
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
