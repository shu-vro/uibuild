"use client";

import { useNode } from "@craftjs/core";
import React, { useState } from "react";
import TextInput from "./TextInput";
import { GeneralStatesType } from "../Elements/GeneralSettings";
import { Textarea } from "@heroui/react";

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
