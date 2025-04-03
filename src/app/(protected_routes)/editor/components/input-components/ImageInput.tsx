"use client";

import { useNode } from "@craftjs/core";
import React, { useCallback, useState } from "react";
import TextInput from "./TextInput";
import { GeneralStatesType } from "../Elements/GeneralSettings";
import { Textarea } from "@heroui/react";
import debounce from "lodash/debounce";

interface ImageUploadParams {
    e: React.ChangeEvent<HTMLInputElement>;
    setImageFile: (file: string) => void;
    imageEl?: HTMLElement | null;
    DIM?: number;
}

const onImageUpload = ({
    e,
    setImageFile,
    imageEl,
    DIM = 1200,
}: ImageUploadParams) => {
    const canvas = document.createElement("canvas");
    const c = canvas.getContext("2d")!;
    canvas.width = DIM;
    canvas.height = DIM;
    let file = e.target.files![0];
    if (!file) return console.log("no file");
    let fr = new FileReader();
    fr.onload = (e) => {
        let du = e.target!.result as string;
        let im = document.createElement("img");
        im.src = du;
        im.onload = () => {
            if (imageEl) {
                imageEl.style.backgroundImage = `url(${du})`;
            }
            c.clearRect(0, 0, DIM, DIM);
            let big = Math.max(im.width, im.height);
            let propotion = DIM < big ? DIM / big : 1;
            let w = im.width * propotion,
                h = im.height * propotion;
            canvas.width = w;
            canvas.height = h;
            c.drawImage(im, 0, 0, w, h);
            let dataURL = canvas.toDataURL("image/webp");
            // const newFile = dataURLtoFile(dataURL, file.type);
            setImageFile(dataURL);
            canvas.remove();
        };
    };
    fr.readAsDataURL(file);
};

function sanitizeImageUrl(url: string | null): string | null {
    // Allow empty/null values
    if (!url) return null;

    // Allow valid data URLs (e.g. base64 images)
    const dataUrlRegex = /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i;
    if (dataUrlRegex.test(url)) return url;

    // Try to interpret as a normal URL
    try {
        const parsed = new URL(url);
        // Only allow http and https protocols.
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return parsed.toString();
        }
    } catch (e) {
        // not a valid URL
    }
    return null;
}

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
        defaultValue || value || "",
    );

    const debouncedSetProp = useCallback(
        debounce((val: string | null) => {
            setProp((props: any) => {
                if (type) {
                    return (props[type][propName] = val || null);
                }
                return (props[propName] = val || null);
            });
        }, 1000),
        [setProp],
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
                    accept="image/*"
                    onChange={(e) => {
                        if (!e.target.files) return;
                        onImageUpload({
                            e,
                            setImageFile: (file) => {
                                setOverriddenValue(file);
                                if (overrideOnChange) {
                                    onChangeFn && onChangeFn(file);
                                    return;
                                }
                                setProp((props: any) => {
                                    if (type) {
                                        return (props[type][propName] = file);
                                    }
                                    return (props[propName] = file);
                                });
                            },
                            DIM: 1000,
                        });
                    }}
                />
            </label>
            <Textarea
                value={overriddenValue}
                minRows={1}
                maxRows={3}
                label="Image URL"
                onValueChange={(val) => {
                    const sanitizedValue = sanitizeImageUrl(val);
                    console.log(sanitizedValue);
                    setOverriddenValue(sanitizedValue || null);

                    debouncedSetProp(sanitizedValue || null);
                }}
            ></Textarea>
            {/* <TextInput propName={propName} type={type} label="Image URL" /> */}
        </div>
    );
}
