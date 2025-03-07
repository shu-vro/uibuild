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
import {
    BackgroundType,
    defaultBackground,
} from "../input-components/BackgroundInput";

type ContainerProps = {
    children?: React.ReactNode;
};

export function Container({
    children,
    ...props
}: GeneralStatesType & ContainerProps) {
    return (
        <>
            <Resizer propKey={{ width: "width", height: "height" }}>
                <div
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
                </div>
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
        normal: {
            ...generalPropsDefault,
            backgrounds: [defaultBackground as BackgroundType],
            paddingAll: "20px",
            width: "100%",
        },
    },
    related: {
        settings: GeneralSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
