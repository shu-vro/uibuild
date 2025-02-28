import { useNode } from "@craftjs/core";
import { Switch, SwitchProps } from "@heroui/react";
import React, { useState } from "react";

type Props = {
    label: string;
    propName?: string;
    type?: string;
    defaultValue?: boolean;
    overrideOnChange?: boolean;
    changeFn?: (value: any) => void;
} & SwitchProps;

export default function SwitchInput({
    label,
    propName,
    type,
    defaultValue,
    overrideOnChange = false,
    changeFn,
}: Props) {
    const {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        props: node.data.props,
        value: type
            ? node.data.props[type][propName]
            : node.data.props[propName],
    }));

    const [tempVal, setTempVal] = useState(
        typeof defaultValue === "boolean" ? defaultValue : value,
    );
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="grow">{label}</div>
            <Switch
                isSelected={Boolean(tempVal)}
                onValueChange={(val) => {
                    setTempVal(val);
                    if (overrideOnChange) {
                        changeFn(val);
                        return;
                    }
                    setProp((props: any) => {
                        if (!type) return (props[propName] = val);
                        else return (props[type][propName] = val);
                    });
                }}
            />
        </div>
    );
}
