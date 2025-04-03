import React from "react";
import { Resizer } from "../Resizer";
import {
    generalPropsDefault,
    GeneralSettings,
    GeneralSettingsProps,
    // GeneralSettings,
    // GeneralSettingsProps,
    generalStatesDefault,
    GeneralStatesType,
    generalStyles,
    StyledComponent,
} from "./GeneralSettings";
import {
    BackgroundType,
    defaultBackground,
} from "../input-components/BackgroundInput";
import { useEditor } from "@craftjs/core";
import { cloneDeep } from "lodash";
import { Accordion, AccordionItem } from "@heroui/react";
import TextInput from "../input-components/TextInput";

type ContainerProps = {
    children?: React.ReactNode;
    id?: string;
};

const ContainerNormalProps: GeneralSettingsProps = {
    ...generalPropsDefault,
    backgrounds: [],
    paddingAll: "20px",
    width: "100%",
};

export const ContainerDefaultProps = {
    id: "",
    type: "normal",
    normal: cloneDeep(ContainerNormalProps),
    hover: cloneDeep(ContainerNormalProps),
    focus: cloneDeep(ContainerNormalProps),
    active: cloneDeep(ContainerNormalProps),
};

export function Container({
    children,
    id,
    ...props
}: GeneralStatesType & ContainerProps) {
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    return enabled ? (
        <>
            <Resizer propKey={{ width: "width", height: "height" }}>
                <div
                    id={id}
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
                >
                    {children}
                </div>
            </Resizer>
        </>
    ) : (
        <StyledComponent
            id={id}
            as="div"
            $normal={props.normal || {}}
            $hover={props.hover || {}}
            $focus={props.focus || {}}
            $active={props.active || {}}
            $default={ContainerDefaultProps.normal}
        >
            {children}
        </StyledComponent>
    );
}

function ContainerSettings() {
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
                <AccordionItem key="1" aria-label="Link" title="Link">
                    <TextInput
                        propName="id"
                        label="ID"
                        placeholder="Enter ID"
                    />
                </AccordionItem>
            </Accordion>
        </GeneralSettings>
    );
}

Container.craft = {
    displayName: "Container",
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
