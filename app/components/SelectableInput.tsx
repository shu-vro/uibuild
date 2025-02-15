"use client";

import { useNode } from "@craftjs/core";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import React, { useState } from "react";
import { GeneralStatesType } from "./Elements/GeneralSettings";

export default function SelectableInput({
    propName,
    type,
    options = [],
    children,
    overrideOnChange = false,
    defaultValue = "",
    onChangeFn,
    ...rest
}: Partial<SelectProps> & {
    propName: string;
    type?: GeneralStatesType["type"];
    options?: string[];
    overrideOnChange?: boolean;
    defaultValue?: string;
    onChangeFn?: (value: any) => void;
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: type
            ? node.data.props[node.data.props.type][propName]
            : node.data.props[propName],
    }));

    const [overriddenValue, setOverriddenValue] = useState(defaultValue);
    return (
        <Select
            className="max-w-xs"
            labelPlacement="outside"
            placeholder="Select an option"
            disallowEmptySelection
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
                    if (!type) return (props[propName] = e.target.value);
                    else return (props[type][propName] = e.target.value);
                });
            }}
        >
            {options.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
            ))}
        </Select>
    );
}
