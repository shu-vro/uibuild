import { useNode } from "@craftjs/core";
import React from "react";
import {
    generalStatesDefault,
    GeneralSettings,
    generalStyles,
    GeneralStatesType,
    StyledComponent,
    generalPropsDefault,
} from "./GeneralSettings";
import { Resizer } from "../Resizer";
import {
    Accordion,
    AccordionItem,
    Image,
    Input,
    Tab,
    Tabs,
} from "@heroui/react";
import TextInput from "../input-components/TextInput";
import SelectableInput from "../input-components/SelectableInput";
import ImageInput from "../input-components/ImageInput";
import SwitchInput from "../input-components/SwitchInput";
import SizeInput from "../input-components/SizeInput";

type ImageProps = {
    src?: string;
    alt?: string;
    objectFit?: React.CSSProperties["objectFit"];
    objectPositionOption?: "all" | "custom";
    objectPositionAll?: string;
    objectPositionX?: string;
    objectPositionY?: string;

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
    objectPositionAll,
    objectPositionX,
    objectPositionY,
    objectPositionOption,
    ...props
}: ImageProps) {
    console.log(
        objectPositionAll,
        objectPositionX,
        objectPositionY,
        objectPositionOption,
    );

    return (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                style={{
                    // width: rest[rest.type].width,
                    // height: rest[rest.type].height,

                    width: "100%",
                    height: "100%",
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
                        objectPosition:
                            objectPositionOption === "all"
                                ? objectPositionAll
                                : `${objectPositionX} ${objectPositionY}`,

                        width: "100%",
                        height: "100%",
                    }}
                    // className="!absolute"
                    classNames={{
                        blurredImg: "!absolute",
                        wrapper: "!max-w-full w-full",
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
    objectPositionOption: "all",
    objectPositionAll: "center",
    objectPositionX: "center",
    objectPositionY: "center",
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
        objectPositionOption,
        type,
    } = useNode((node) => ({
        loading: node.data.props.loading,
        type: node.data.props.type,
        objectPositionOption: node.data.props.objectPosition,
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

                    <p>Object Position</p>
                    <Tabs
                        selectedKey={objectPositionOption}
                        onSelectionChange={(val) => {
                            setProp((props: any) => {
                                return (props.objectPositionOption = val);
                            }, 1000);
                        }}
                    >
                        <Tab title="All" key="all">
                            <SizeInput
                                propName="objectPositionAll"
                                customValues={[
                                    "top",
                                    "bottom",
                                    "left",
                                    "right",
                                    "center",
                                ]}
                                clearDefaultValues
                                label="All"
                            />
                        </Tab>
                        <Tab title="Custom" key="custom">
                            <SizeInput
                                propName="objectPositionX"
                                customValues={[
                                    "top",
                                    "bottom",
                                    "left",
                                    "right",
                                    "center",
                                ]}
                                clearDefaultValues
                                label="X"
                            />
                            <SizeInput
                                propName="objectPositionY"
                                customValues={[
                                    "top",
                                    "bottom",
                                    "left",
                                    "right",
                                    "center",
                                ]}
                                clearDefaultValues
                                label="Y"
                            />
                        </Tab>
                    </Tabs>
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
