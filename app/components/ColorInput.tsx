import { useNode } from "@craftjs/core";
import React, { useCallback } from "react";
import { debounce } from "lodash";

export default function ColorInput({
    propName,
    children,
    ...rest
}: React.HTMLProps<HTMLInputElement> & {
    propName: string;
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: node.data.props[propName],
    }));

    const debouncedOnChange = useCallback(
        debounce((e) => {
            setProp((props: any) => {
                return (props[propName] = e.target.value);
            }, 1000);
        }, 300),
        [],
    );

    return (
        <label htmlFor="color-select">
            <div>Color</div>
            <input
                type="color"
                id="color-select"
                className="w-full h-10"
                defaultValue={value}
                onChange={debouncedOnChange}
                {...rest}
            />
        </label>
    );
}
