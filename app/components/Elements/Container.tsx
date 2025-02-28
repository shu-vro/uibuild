import React from "react";
import { Resizer } from "../Resizer";
import {
    generalPropsDefault,
    GeneralSettings,
    // GeneralSettings,
    // GeneralSettingsProps,
    generalStatesDefault,
    GeneralStatesType,
    generalStyles,
    StyledComponent,
} from "./GeneralSettings";

type ContainerProps = {
    children?: React.ReactNode;
};

export function Container({
    children,
    ...props
}: GeneralStatesType & ContainerProps) {
    return (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                style={{
                    ...generalStyles({
                        type: props.type || "normal",
                        normal: props.normal || {},
                        hover: props.hover || {},
                        focus: props.focus || {},
                        active: props.active || {},
                    }),
                }}
            >
                {children}
            </Resizer>
            {/* <StyledComponent
                as={Resizer}
                propKey={{
                    width: "width",
                    height: "height",
                }}
                normal={props.normal || {}}
                hover={props.hover || {}}
                focus={props.focus || {}}
                active={props.active || {}}
            /> */}
        </>
    );
}

export const ContainerDefaultProps = {};

Container.craft = {
    displayName: "Container",
    props: {
        ...generalStatesDefault,
        normal: { ...generalPropsDefault, paddingAll: "20px" },
    },
    related: {
        settings: GeneralSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
