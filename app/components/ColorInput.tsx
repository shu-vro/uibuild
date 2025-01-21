import { useNode } from "@craftjs/core";
import React from "react";

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
    return (
        <label htmlFor="color-select">
            <div>Color</div>
            <input
                className="w-full h-10"
                type="color"
                id="color-select"
                {...rest}
                value={value}
                onChange={(e) => {
                    setProp((props: any) => {
                        return (props[propName] = e.target.value);
                    }, 1000);
                }}
            />
        </label>
    );
}
