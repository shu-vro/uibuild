import { useEditor, useNode } from "@craftjs/core";
import React, { useCallback } from "react";
import {
    generalStatesDefault,
    GeneralSettings,
    generalStyles,
    GeneralStatesType,
    generalPropsDefault,
} from "./GeneralSettings";
import { Resizer } from "../Resizer";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import TextInput from "../input-components/TextInput";
// New imports for extra settings inputs
import SelectableInput from "../input-components/SelectableInput";
import SwitchInput from "../input-components/SwitchInput";

type ButtonProps = {
    text?: string;
    variant?:
        | "solid"
        | "bordered"
        | "light"
        | "flat"
        | "faded"
        | "shadow"
        | "ghost";
    color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger";
    spinnerPlacement?: "start" | "end";
    isIconOnly?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    disableRipple?: boolean;
    disableAnimation?: boolean;
} & GeneralStatesType;

export function ButtonComponent({
    text,
    variant,
    color,
    spinnerPlacement,
    isIconOnly,
    isDisabled,
    isLoading,
    disableRipple,
    disableAnimation,
    ...props
}: ButtonProps) {
    const {
        hovered,
        id,
        actions: { setProp },
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
        hovered: state.events.hovered,
        id: state.id,
    }));

    const { actions } = useEditor();

    return (
        <>
            <Resizer propKey={{ width: "width", height: "height" }}>
                <Button
                    onPress={() => {
                        if (hovered) {
                            actions.selectNode(id);
                        }
                    }}
                    style={{
                        ...generalStyles({
                            type: props.type || "normal",
                            normal: props.normal || {},
                            hover: props.hover || {},
                            focus: props.focus || {},
                            active: props.active || {},
                        }),
                        width: "100%",
                        height: "100%",
                    }}
                    variant={variant}
                    color={color}
                    spinnerPlacement={spinnerPlacement}
                    isIconOnly={isIconOnly}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    disableRipple={disableRipple}
                    disableAnimation={disableAnimation}
                >
                    {text}
                </Button>
            </Resizer>
        </>
    );
}

function ButtonSettings() {
    return (
        <GeneralSettings>
            <Accordion
                defaultSelectedKeys={["1"]}
                selectionMode="multiple"
                variant="splitted"
                className="px-0"
                itemClasses={{
                    content: "flex flex-col gap-4 m-0",
                }}
            >
                <AccordionItem key="1" aria-label="Button" title="Button Props">
                    <TextInput propName="text" label="Button Text" />
                    <SelectableInput
                        propName="variant"
                        label="Button Variant"
                        options={[
                            "solid",
                            "bordered",
                            "light",
                            "flat",
                            "faded",
                            "shadow",
                            "ghost",
                        ]}
                    />
                    <SelectableInput
                        propName="color"
                        label="Button Color"
                        options={[
                            "default",
                            "primary",
                            "secondary",
                            "success",
                            "warning",
                            "danger",
                        ]}
                    />
                    <SelectableInput
                        propName="spinnerPlacement"
                        label="Spinner Placement"
                        options={["start", "end"]}
                    />
                    <SwitchInput propName="isIconOnly" label="Icon Only" />
                    <SwitchInput propName="isDisabled" label="Disabled" />
                    <SwitchInput propName="isLoading" label="Loading" />
                    <SwitchInput
                        propName="disableRipple"
                        label="Disable Ripple"
                    />
                    <SwitchInput
                        propName="disableAnimation"
                        label="Disable Animation"
                    />
                </AccordionItem>
            </Accordion>
        </GeneralSettings>
    );
}

export const ButtonDefaultProps = {
    text: "Edit Me From Sidebar",
    variant: "solid",
    color: "default",
    spinner: "",
    spinnerPlacement: "start",
    isIconOnly: false,
    isDisabled: false,
    isLoading: false,
    disableRipple: false,
    disableAnimation: false,
    ...generalStatesDefault,
    normal: {
        ...generalPropsDefault,
        paddingAll: "1rem",
        borderRadiusAll: "0.5rem",
        textAlign: "center",
        overflowAll: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
} as ButtonProps;

ButtonComponent.craft = {
    displayName: "Button",
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings,
    },
};
