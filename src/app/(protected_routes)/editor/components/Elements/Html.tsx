import React, { useCallback, useEffect } from "react";
import { Resizer } from "../Resizer";
import {
    generalPropsDefault,
    GeneralSettings,
    GeneralSettingsProps,
    GeneralStatesType,
    generalStyles,
    StyledComponent,
} from "./GeneralSettings";
import { useEditor, useNode } from "@craftjs/core";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import { Accordion, AccordionItem, Textarea } from "@heroui/react";
import TextInput from "../input-components/TextInput";
import { useWorkspaceInfo } from "@/src/contexts/WorkspaceInfoProvider";

const HtmlNormalProps: GeneralSettingsProps = {
    ...generalPropsDefault,
    backgrounds: [],
    paddingAll: "20px",
    width: "100%",
};

export const HtmlDefaultProps = {
    id: "",
    type: "normal",

    title: "Please Edit Me",
    description: "Please Edit Me",

    normal: cloneDeep(HtmlNormalProps),
    hover: cloneDeep(HtmlNormalProps),
    focus: cloneDeep(HtmlNormalProps),
    active: cloneDeep(HtmlNormalProps),
};

export function Html({
    children,
    ...props
}: GeneralStatesType & typeof HtmlNormalProps) {
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    const { workspace } = useWorkspaceInfo();

    useEffect(() => {
        if (!enabled) {
            document.head.querySelector("title")!.textContent =
                props.title || workspace.name || "Default Title";
            const metaDescription = document.head.querySelector(
                'meta[name="description"]',
            );
            if (metaDescription) {
                metaDescription.setAttribute(
                    "content",
                    props.description ||
                        workspace.description ||
                        "Default Description",
                );
            }
        }
    }, [enabled, workspace?.name, workspace?.description]);

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
            $default={HtmlDefaultProps.normal}
        >
            {children}
        </StyledComponent>
    );
}

function HtmlSettings() {
    const {
        props,
        actions: { setProp },
    } = useNode((node) => ({
        props: node.data.props,
    }));

    const { workspace } = useWorkspaceInfo();

    const debouncedSetDescription = useCallback(
        debounce((val: string | null) => {
            setProp((props: any) => {
                return (props.description = val || null);
            });
        }, 1000),
        [setProp],
    );
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
                <AccordionItem key="1" aria-label="Link" title="Html">
                    <TextInput propName="title" label="Title" />
                    <Textarea
                        label="Description"
                        rows={5}
                        className="w-full"
                        defaultValue={
                            props.description || workspace.description || ""
                        }
                        onValueChange={(val) => {
                            debouncedSetDescription(val);
                        }}
                    />
                </AccordionItem>
            </Accordion>
        </GeneralSettings>
    );
}

Html.craft = {
    displayName: "Html",
    props: HtmlDefaultProps,
    related: {
        settings: HtmlSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
