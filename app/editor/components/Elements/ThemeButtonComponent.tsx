import React, { useEffect, useRef } from "react";
import { GeneralStatesType } from "./GeneralSettings";
import { useEditor, useNode } from "@craftjs/core";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { PiMoonThin } from "react-icons/pi";
import { RxSun } from "react-icons/rx";
import { PiDeviceMobileCamera } from "react-icons/pi";
import SelectableInput from "../input-components/SelectableInput";
import SwitchInput from "../input-components/SwitchInput";
import ThemeButton from "../ThemeButton";
import { cn } from "@/lib/utils";
import { useEffectOnce } from "@craftjs/utils";

type ContainerProps = {
    defaultOption?: "light" | "dark" | "system";
    staticTheme?: boolean;
    hideButton?: boolean;

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
};

const containerProps: ContainerProps = {
    defaultOption: "light",
    staticTheme: false,
    hideButton: false,
    variant: "solid",
    color: "primary",
};

export function ThemeButtonComponent({
    staticTheme,
    defaultOption,
    hideButton,
    variant,
    color,
    ...props
}: ContainerProps) {
    const element = useRef<HTMLDivElement | null>(null);
    const { theme, setTheme } = useTheme();

    const {
        id,
        hovered,
        connectors: { connect },
    } = useNode((node) => ({
        parent: node.data.parent,
        active: node.events.selected,
        hovered: node.events.hovered,
        type: node.data.props.type,
        fillSpace: node.data.props.fillSpace,
    }));

    const { enabled, actions } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    useEffect(() => {
        if (enabled) {
            setTheme(defaultOption);
        }
    }, [defaultOption]);

    useEffect(() => {
        if (staticTheme) {
            setTheme(defaultOption);
        }
    }, [staticTheme]);

    return enabled ? (
        <div
            ref={(ref) => {
                if (ref) {
                    element.current = ref;
                    connect(element.current);
                }
            }}
        >
            <Button
                color={color}
                isIconOnly
                variant={variant}
                className={cn("text-xl", hideButton && "!sr-only")}
                onPress={() => {
                    if (hovered) {
                        actions.selectNode(id);
                    }
                }}
            >
                {theme === "light" && <RxSun />}
                {theme === "dark" && <PiMoonThin />}
                {theme === "system" && <PiDeviceMobileCamera />}
            </Button>
        </div>
    ) : (
        <ThemeButton className={cn(hideButton && "!sr-only")} />
    );
}

function ThemeButtonSettings() {
    const {
        actions: { setProp },
    } = useNode(() => ({}));
    const { actions, selected, isEnabled } = useEditor((state, query) => {
        const currentNodeId = query.getEvent("selected").last();
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings:
                    state.nodes[currentNodeId].related &&
                    state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable(),
            };
        }

        return {
            selected,
            isEnabled: state.options.enabled,
        };
    });
    return (
        <>
            <Accordion
                selectionMode="multiple"
                variant="splitted"
                className="px-0"
                itemClasses={{
                    content: "flex flex-col gap-4 m-0",
                }}
                defaultSelectedKeys={["1"]}
            >
                <AccordionItem title="General" key="1">
                    <SelectableInput
                        label="Default Theme"
                        propName="defaultOption"
                        options={["light", "dark", "system"]}
                    />
                    <SwitchInput
                        propName="staticTheme"
                        label="Static Theme"
                        overrideOnChange
                        changeFn={(val) => {
                            console.log(val);
                            setProp((props) => {
                                props.staticTheme = val;
                                props.hideButton = val;
                            }, 1000);
                        }}
                    />
                    <SwitchInput propName="hideButton" label="Hide Button" />
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
                </AccordionItem>
            </Accordion>

            {selected && isEnabled && selected.isDeletable && (
                <Button
                    fullWidth
                    size="lg"
                    variant="flat"
                    color="danger"
                    className="my-2"
                    onPress={() => actions.delete(selected.id)}
                >
                    Delete Element
                </Button>
            )}
        </>
    );
}

ThemeButtonComponent.craft = {
    displayName: "Theme Button",
    props: containerProps,
    related: {
        settings: ThemeButtonSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
