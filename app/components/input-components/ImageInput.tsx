"use client";

import { useNode } from "@craftjs/core";
import React, { useState } from "react";
import TextInput from "./TextInput";
import { GeneralStatesType } from "../Elements/GeneralSettings";
import { Textarea } from "@heroui/react";

export default function ImageInput({
    propName,
    type,
    options = [],
    children,
    overrideOnChange = false,
    defaultValue = "",
    onChangeFn,
    ...rest
}: React.ComponentProps<"div"> & {
    propName: string;
    type?: GeneralStatesType["type"];
    options?: string[];
    overrideOnChange?: boolean;
    defaultValue?: string;
    onChangeFn?: (value: string) => void;
}) {
    let {
        actions: { setProp },
        value,
    } = useNode((node) => ({
        value: type
            ? node.data.props[type][propName]
            : node.data.props[propName],
    }));
    const [overriddenValue, setOverriddenValue] = useState(
        defaultValue || value || null,
    );
    return (
        <div>
            <label
                htmlFor="file-input"
                className="w-full h-20 block border-foreground border-2"
                style={{
                    background: `url(${overriddenValue}) no-repeat center center / contain`,
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
                                onChangeFn &&
                                    onChangeFn(reader.result as string);
                                return;
                            }

                            setProp((props: any) => {
                                if (type) {
                                    return (props[type][propName] =
                                        reader.result);
                                }
                                return (props[propName] = reader.result);
                            });
                        };
                        reader.readAsDataURL(file);
                    }}
                />
            </label>
            <Textarea
                value={overriddenValue}
                minRows={1}
                maxRows={3}
                label="Image URL"
                onValueChange={(val) => {
                    setOverriddenValue(val || null);

                    setProp((props: any) => {
                        if (type) {
                            return (props[type][propName] = val || null);
                        }
                        return (props[propName] = val || null);
                    });
                }}
            ></Textarea>
            {/* <TextInput propName={propName} type={type} label="Image URL" /> */}
        </div>
    );
}
