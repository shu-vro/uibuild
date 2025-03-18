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
                        width: "100%",
                        height: "100%",
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

export const ContainerDefaultProps = {
    ...generalStatesDefault,
    normal: {
        ...generalPropsDefault,
        backgrounds: [defaultBackground as BackgroundType],
        paddingAll: "20px",
        width: "100%",
    },
};

Container.craft = {
    displayName: "Container",
    props: ContainerDefaultProps,
    related: {
        settings: GeneralSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
