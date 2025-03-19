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

type ContainerProps = {
    children?: React.ReactNode;
};

const ContainerNormalProps: GeneralSettingsProps = {
    ...generalPropsDefault,
    backgrounds: [],
    paddingAll: "20px",
    width: "100%",
};

export const ContainerDefaultProps = {
    type: "normal",
    normal: cloneDeep(ContainerNormalProps),
    hover: cloneDeep(ContainerNormalProps),
    focus: cloneDeep(ContainerNormalProps),
    active: cloneDeep(ContainerNormalProps),
};

export function Container({
    children,
    ...props
}: GeneralStatesType & ContainerProps) {
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    console.log(props);
    return enabled ? (
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
        </>
    ) : (
        <StyledComponent
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
