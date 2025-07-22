import React, { useMemo } from "react";
import { Resizer } from "../Resizer";
import {
    generalPropsDefault,
    GeneralSettings,
    GeneralSettingsProps,
    GeneralStatesType,
    generalStyles,
    StyledComponent,
} from "./GeneralSettings";
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

    const computedStyles = useMemo(
        () =>
            generalStyles({
                type: props.type || "normal",
                normal: props.normal || {},
                hover: props.hover || {},
                focus: props.focus || {},
                active: props.active || {},
            }),
        [props],
    );

    return enabled ? (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                style={{
                    // should inherit margin
                    margin: computedStyles.margin,
                }}
            >
                <div
                    id={id}
                    style={{
                        ...computedStyles,
                        width: "100%",
                        height: "100%",
                        margin: "0 !important",
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
                <AccordionItem key="1" aria-label="Link" title="Container">
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
