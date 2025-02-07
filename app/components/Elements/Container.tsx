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
} from "./GeneralSettings";

type ContainerProps = {
    children?: React.ReactNode;
};

export function Container({
    children,
    // width = "100px",
    // height = "100px",
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
        </>
    );
}

export const ContainerDefaultProps = {};

Container.craft = {
    displayName: "Container",
    props: { ...generalStatesDefault },
    related: {
        settings: GeneralSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
