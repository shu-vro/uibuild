"use client";

import { useNode } from "@craftjs/core";
import React, { useState } from "react";

export default function ImageInput({
    propName,
    options = [],
    children,
    overrideOnChange = false,
    defaultValue = "",
    onChangeFn,
    ...rest
}: React.ComponentProps<"div"> & {
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
    const [overriddenValue, setOverriddenValue] = useState(
        defaultValue || value,
    );
    return (
        <label
            htmlFor="file-input"
            className="w-full h-20 block border-foreground border-2"
            style={{
                background: `url(${overriddenValue}) no-repeat center center`,
                backgroundSize: "contain",
            }}
        >
            <input
                type="file"
                id="file-input"
                className="sr-only"
                title="Upload Image"
                onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;
                    const file = files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setOverriddenValue(reader.result as string);

                        if (overrideOnChange) {
                            onChangeFn && onChangeFn(reader.result as string);
                            return;
                        }

                        setProp((props: any) => {
                            return (props[propName] = reader.result);
                        });
                    };
                    reader.readAsDataURL(file);
                }}
            />
        </label>
    );
}
