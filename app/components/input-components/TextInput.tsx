"use client";

import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { Input, InputProps, Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState, useCallback } from "react";
import { GeneralStatesType } from "../Elements/GeneralSettings";
import { debounce } from "lodash";

export default function TextInput({
    propName,
    type,
    overrideOnChange = false,
    defaultValue = "",
    onChangeFn,
    ...rest
}: InputProps & {
    propName: string;
    type?: GeneralStatesType["type"];
    overrideOnChange?: boolean;
    defaultValue?: string;
    onChangeFn?: (value: string) => void;
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: type
            ? node.data.props[node.data.props.type][propName]
            : node.data.props[propName],
    }));
    // value = parseSizeValue(defaultValue || value, customValues);

    const [strVal, setStrVal] = useState(value);

    useEffect(() => {
        if (overrideOnChange) return;
        setStrVal(value);
    }, [value]);

    const debouncedSetProp = useCallback(
        debounce((newValue) => {
            setProp((props: any) => {
                if (!type) return (props[propName] = newValue);
                else return (props[type][propName] = newValue);
            });
        }, 500), // Adjust the debounce delay as needed
        [setProp, type, propName],
    );

    useEffect(() => {
        if (overrideOnChange) {
            onChangeFn && onChangeFn(strVal);
        } else {
            debouncedSetProp(strVal);
        }
    }, [strVal, debouncedSetProp, overrideOnChange, onChangeFn]);

    return (
        <Input
            type="text"
            label="Label here"
            labelPlacement="outside"
            {...rest}
            classNames={{
                inputWrapper: cn("pr-0", rest?.className),
            }}
            value={strVal}
            onValueChange={(e) => {
                setStrVal(e);
            }}
        />
    );
}
