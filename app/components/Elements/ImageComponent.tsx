import { useNode } from "@craftjs/core";
import React, { useState, useEffect, useCallback } from "react";
import ContentEditable from "react-contenteditable";
import {
    generalStatesDefault,
    GeneralSettings,
    generalStyles,
    GeneralStatesType,
    StyledComponent,
    generalPropsDefault,
} from "./GeneralSettings";
import { Resizer } from "../Resizer";
import { debounce } from "lodash";
import { Accordion, AccordionItem, Image, Input } from "@heroui/react";
import TextInput from "../input-components/TextInput";
import SelectableInput from "../input-components/SelectableInput";
import ImageInput from "../input-components/ImageInput";
import SwitchInput from "../input-components/SwitchInput";

type ImageProps = {
    src?: string;
    alt?: string;
    objectFit?: React.CSSProperties["objectFit"];

    isBlurred?: boolean;
    isZoomed?: boolean;
    removeWrapper?: boolean;
    disableSkeleton?: boolean;
    loading?: "lazy" | "eager";
} & GeneralStatesType;

export function ImageComponent({
    src,
    alt,
    objectFit,
    isBlurred,
    isZoomed,
    removeWrapper,
    disableSkeleton,
    loading,
    ...props
}: ImageProps) {
    const {
        selected,
        actions: { setProp },
        rest,
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
        rest: state.data.props,
    }));

    return (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                style={{
                    width: rest[rest.type].width,
                    height: rest[rest.type].height,
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    style={{
                        ...generalStyles({
                            type: props.type || "normal",
                            normal: props.normal || {},
                            hover: props.hover || {},
                            focus: props.focus || {},
                            active: props.active || {},
                        }),
                        objectFit,
                    }}
                    // className="!absolute"
                    classNames={{
                        blurredImg: "!absolute",
                    }}
                    isBlurred={isBlurred}
                    isZoomed={isZoomed}
                    disableSkeleton={disableSkeleton}
                    removeWrapper={removeWrapper}
                    loading={loading}
                />
            </Resizer>
        </>
    );
}

export const ImageDefaultProps: ImageProps & GeneralStatesType = {
    src: "https://fakeimg.pl/600x400",
    alt: "Placeholder",
    objectFit: "cover",
    isBlurred: false,
    isZoomed: false,
    removeWrapper: false,
    disableSkeleton: false,
    loading: "lazy",

    ...generalStatesDefault,
    normal: {
        ...generalPropsDefault,
        fontSize: "2rem",
        fontWeight: "bold",
        overflowAll: "hidden",
    },
};

function ImageSettings() {
    const {
        actions: { setProp },
        loading,
    } = useNode((node) => ({
        loading: node.data.props.loading,
    }));
    return (
        <GeneralSettings>
            <Accordion
                defaultSelectedKeys={["1", "2"]}
                selectionMode="multiple"
                variant="splitted"
                className="px-0"
                itemClasses={{
                    content: "flex flex-col gap-4 m-0",
                }}
            >
                <AccordionItem key="1" aria-label="Image" title="Image">
                    <ImageInput propName="src" />
                    <TextInput propName="alt" label="Alt Text" />
                    <SelectableInput
                        propName="objectFit"
                        label="Object Fit"
                        options={[
                            "contain",
                            "cover",
                            "fill",
                            "none",
                            "scale-down",
                        ]}
                    />
                </AccordionItem>
                <AccordionItem
                    key="2"
                    aria-label="Additional Props"
                    title="Additional Props"
                >
                    <SwitchInput label="Zoom on Hover" propName="isZoomed" />
                    <SwitchInput
                        label="Remove Wrapper"
                        propName="removeWrapper"
                    />
                    <SwitchInput
                        label="Disable Skeleton"
                        propName="disableSkeleton"
                    />
                    <SwitchInput label="Blur on Hover" propName="isBlurred" />
                    <SwitchInput
                        label="Lazy Loading"
                        propName="loading"
                        overrideOnChange
                        defaultValue={loading === "lazy"}
                        changeFn={(val) => {
                            setProp((props: any) => {
                                props.loading = val ? "lazy" : "eager";
                            });
                        }}
                    />
                </AccordionItem>
            </Accordion>
        </GeneralSettings>
    );
}

ImageComponent.craft = {
    name: "Image",
    props: ImageDefaultProps,
    related: {
        settings: ImageSettings,
    },
};
