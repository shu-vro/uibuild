import { useNode } from "@craftjs/core";
import React, { useCallback } from "react";
import { debounce } from "lodash";
import ColorPicker, {
    ColorPickerProps,
} from "react-best-gradient-color-picker";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { GeneralStatesType } from "./Elements/GeneralSettings";

export default function ColorInput({
    propName,
    children,
    type,
    defaultValue = "",
    overrideOnChange = false,
    onChangeFn,
    label = "Color",
    maxWidth = "100%",
    ...rest
}: Partial<ColorPickerProps> & {
    label?: string;
    children?: React.ReactNode;
    type?: GeneralStatesType["type"];
    propName: string;
    defaultValue?: string;
    overrideOnChange?: boolean;
    maxWidth?: string;
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

    const debouncedOnChange = useCallback(
        debounce((e) => {
            if (overrideOnChange) {
                return onChangeFn && onChangeFn(e);
            }
            setProp((props: any) => {
                if (!type) return (props[propName] = e);
                else return (props[type][propName] = e);
            }, 1000);
        }, 300),
        [],
    );
    const [color, setColor] = React.useState(
        defaultValue || value || "rgba(255,255,255,1)",
    );

    return (
        <>
            <div>{label}</div>
            {/* <input
                type="color"
                id="color-select"
                className="w-full h-10"
                defaultValue={defaultValue || value}
                onChange={debouncedOnChange}
                {...rest}
            /> */}
            <Popover placement={"left-start"}>
                <PopoverTrigger>
                    <Button
                        className="capitalize"
                        variant="solid"
                        fullWidth
                        style={{
                            background: color,
                            maxWidth,
                        }}
                    >
                        {color}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <ColorPicker
                        value={color}
                        hideColorTypeBtns
                        hideEyeDrop
                        onChange={(val) => {
                            setColor(val);
                            debouncedOnChange(val);
                        }}
                        {...rest}
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}
