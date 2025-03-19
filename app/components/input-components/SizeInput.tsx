"use client";

import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { Input, InputProps, Select, SelectItem } from "@heroui/react";
import React, { useEffect, useMemo, useState } from "react";
import { GeneralStatesType } from "../Elements/GeneralSettings";
import { debounce } from "lodash";

const parseSizeValue = (
    value: string = "",
    customValues: string[],
): [string, string] => {
    if (customValues.includes(value)) {
        return ["0", value];
    }
    const match = value.match(/^(\d*\.?\d+)(\D+)$/);
    if (match) {
        const numberValue = match[1];
        return [numberValue, match[2]];
    }
    return ["0", "%"];
};

export default function SizeInput({
    propName,
    type,
    customValues = [],
    additionalUnitValues = [],
    clearDefaultValues = false,
    clearAllUnits = false,
    overrideOnChange = false,
    defaultValue = "",
    onChangeFn,
    ...rest
}: InputProps & {
    propName: string;
    type?: GeneralStatesType["type"];
    customValues?: string[];
    additionalUnitValues?: string[];
    overrideOnChange?: boolean;
    clearAllUnits?: boolean;
    clearDefaultValues?: boolean;
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

    if (overrideOnChange) {
        clearDefaultValues = true;
    }

    if (!clearDefaultValues) {
        customValues = customValues.concat(["initial", "auto"]);
    }
    // value = parseSizeValue(defaultValue || value, customValues);
    const [intVal, setIntVal] = useState(
        parseSizeValue(defaultValue || value, customValues)[0] || "0",
    );
    const [unit, setUnit] = useState(
        parseSizeValue(defaultValue || value, customValues)[1] || "rem",
    );

    useEffect(() => {
        if (overrideOnChange) return;
        const [numberValue, unitValue] = parseSizeValue(value, customValues);
        setIntVal(numberValue);
        setUnit(unitValue);
    }, [value]);

    const debouncedChangeVal = useMemo(
        () =>
            debounce((newIntVal: string, newUnit: string) => {
                if (overrideOnChange) {
                    if (customValues.includes(newUnit)) {
                        setIntVal("0");
                        return onChangeFn && onChangeFn(newUnit);
                    }
                    onChangeFn && onChangeFn(`${newIntVal}${newUnit}`);
                } else {
                    let newVal = "";
                    if (customValues.includes(newUnit)) {
                        setIntVal("0");
                        newVal = newUnit;
                    } else {
                        newVal = `${newIntVal}${newUnit}`;
                    }
                    if (newVal === value) return;
                    if (!type) {
                        setProp((props: any) => (props[propName] = newVal));
                    } else {
                        setProp(
                            (props: any) => (props[type][propName] = newVal),
                        );
                    }
                }
            }, 500),
        [
            overrideOnChange,
            customValues,
            type,
            propName,
            value,
            setProp,
            onChangeFn,
        ],
    );

    useEffect(() => {
        debouncedChangeVal(intVal, unit);
        return () => {
            // Cancel pending calls on unmount or re-render
            debouncedChangeVal.cancel();
        };
    }, [intVal, unit]);

    return (
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
                    disallowEmptySelection
                    onChange={(e) => {
                        setUnit(e.target.value);
                    }}
                >
                    <>
                        {customValues.map((option) => (
                            <SelectItem key={option}>{option}</SelectItem>
                        ))}
                    </>
                    <>
                        {additionalUnitValues.map((option) => (
                            <SelectItem key={option}>
                                {option === " " ? "--no unit--" : option}
                            </SelectItem>
                        ))}
                    </>

                    {!clearAllUnits && (
                        <>
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
                        </>
                    )}
                </Select>
            }
        />
    );
}
