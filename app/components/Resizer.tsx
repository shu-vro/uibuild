import { useNode, useEditor } from "@craftjs/core";
import { Resizable, ResizableProps } from "re-resizable";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { styled } from "styled-components";

import {
    isPercentage,
    pxToPercent,
    percentToPx,
    getElementDimensions,
} from "@/lib/numToMeasurements";
import { cn } from "@/lib/utils";

const Indicators = styled.div<{ $bound?: "row" | "column" }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    span {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 100%;
        display: block;
        box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.25);
        z-index: 99999;
        pointer-events: none;
        border: 2px solid #36a9e0;
        &:nth-child(1) {
            ${(props) =>
                props.$bound
                    ? props.$bound === "row"
                        ? `
                left: 50%;
                top: -5px;
                transform:translateX(-50%);
              `
                        : `
              top: 50%;
              left: -5px;
              transform:translateY(-50%);
            `
                    : `
              left: -5px;
              top:-5px;
            `}
        }
        &:nth-child(2) {
            right: -5px;
            top: -5px;
            display: ${(props) => (props.$bound ? "none" : "block")};
        }
        &:nth-child(3) {
            ${(props) =>
                props.$bound
                    ? props.$bound === "row"
                        ? `
                left: 50%;
                bottom: -5px;
                transform:translateX(-50%);
              `
                        : `
                bottom: 50%;
                left: -5px;
                transform:translateY(-50%);
              `
                    : `
              left: -5px;
              bottom:-5px;
            `}
        }
        &:nth-child(4) {
            bottom: -5px;
            right: -5px;
            display: ${(props) => (props.$bound ? "none" : "block")};
        }
    }
`;

export const Resizer = ({
    propKey,
    children,
    ...props
}: {
    propKey: { width: string; height: string };
    onClick?: () => void;
} & ResizableProps) => {
    const {
        id,
        actions: { setProp },
        connectors: { connect },
        fillSpace,
        nodeWidth,
        nodeHeight,
        parent,
        active,
        type,
        inNodeContext,
        hovered,
    } = useNode((node) => ({
        parent: node.data.parent,
        active: node.events.selected,
        hovered: node.events.hovered,
        type: node.data.props.type,
        nodeWidth: node.data.props[node.data.props.type][propKey.width],
        nodeHeight: node.data.props[node.data.props.type][propKey.height],
        fillSpace: node.data.props.fillSpace,
    }));

    const { isRootNode, parentDirection } = useEditor((state, query) => {
        return {
            parentDirection:
                parent &&
                state.nodes[parent] &&
                state.nodes[parent].data.props.flexDirection,
            isRootNode: query.node(id).isRoot(),
        };
    });

    const resizable = useRef<Resizable>(null);
    const isResizing = useRef<Boolean>(false);
    const editingDimensions = useRef<any>(null);
    const nodeDimensions = useRef({ width: nodeWidth, height: nodeHeight });

    /**
     * Using an internal value to ensure the width/height set in the node is converted to px
     * because for some reason the <re-resizable /> library does not work well with percentages.
     */
    const [internalDimensions, setInternalDimensions] = useState({
        width: nodeWidth,
        height: nodeHeight,
    });

    const updateInternalDimensionsInPx = useCallback(() => {
        const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;

        const width = percentToPx(
            nodeWidth,
            resizable.current && resizable.current.resizable
                ? getElementDimensions(
                      resizable.current.resizable.parentElement!,
                  ).width
                : 0,
        );
        const height = percentToPx(
            nodeHeight,
            resizable.current && resizable.current.resizable
                ? getElementDimensions(
                      resizable.current.resizable.parentElement!,
                  ).height
                : 0,
        );

        setInternalDimensions({
            width,
            height,
        });
    }, []);

    const updateInternalDimensionsWithOriginal = useCallback(() => {
        const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;
        setInternalDimensions({
            width: nodeWidth,
            height: nodeHeight,
        });
    }, []);

    const getUpdatedDimensions = (width, height) => {
        if (!resizable.current) return;
        const dom = resizable.current.resizable;
        if (!dom) return;

        const currentWidth = parseInt(editingDimensions.current.width),
            currentHeight = parseInt(editingDimensions.current.height);

        return {
            width: currentWidth + parseInt(width),
            height: currentHeight + parseInt(height),
        };
    };

    useEffect(() => {
        setInternalDimensions({
            width: nodeWidth,
            height: nodeHeight,
        });
    }, [nodeWidth, nodeHeight]);

    // useEffect(() => {
    //     const listener = debounce(updateInternalDimensionsWithOriginal, 1);
    //     window.addEventListener("resize", listener);

    //     return () => {
    //         window.removeEventListener("resize", listener);
    //     };
    // }, [updateInternalDimensionsWithOriginal]);

    return (
        <Resizable
            enable={[
                "top",
                "left",
                "bottom",
                "right",
                "topLeft",
                "topRight",
                "bottomLeft",
                "bottomRight",
            ].reduce((acc: any, key) => {
                acc[key] = active && inNodeContext;
                return acc;
            }, {})}
            className={cn([
                {
                    flex: true,
                },
            ])}
            ref={(ref) => {
                if (ref) {
                    resizable.current = ref;
                    connect(resizable.current.resizable!);
                }
            }}
            size={internalDimensions}
            onResizeStart={(e) => {
                updateInternalDimensionsInPx();
                e.preventDefault();
                e.stopPropagation();
                const dom = resizable.current!.resizable;
                if (!dom) return;
                editingDimensions.current = {
                    width: dom.getBoundingClientRect().width,
                    height: dom.getBoundingClientRect().height,
                };
                isResizing.current = true;
            }}
            onResize={(_, __, ___, d) => {
                const dom = resizable.current!.resizable;
                let { width, height }: any = getUpdatedDimensions(
                    d.width,
                    d.height,
                );
                if (!dom?.parentElement) return;
                if (isPercentage(nodeWidth))
                    width =
                        pxToPercent(
                            width,
                            getElementDimensions(dom.parentElement).width,
                        ) + "%";
                else width = `${width}px`;
                if (isPercentage(nodeHeight))
                    height =
                        pxToPercent(
                            height,
                            getElementDimensions(dom.parentElement).height,
                        ) + "%";
                else height = `${height}px`;
                if (
                    isPercentage(width) &&
                    dom.parentElement.style.width === "auto"
                ) {
                    width = editingDimensions.current.width + d.width + "px";
                }
                if (
                    isPercentage(height) &&
                    dom.parentElement.style.height === "auto"
                ) {
                    height = editingDimensions.current.height + d.height + "px";
                }
                nodeDimensions.current = {
                    width,
                    height,
                };
            }}
            onResizeStop={(e) => {
                isResizing.current = false;

                setProp((prop: any) => {
                    prop[type][propKey.width] = nodeDimensions.current.width;
                    prop[type][propKey.height] = nodeDimensions.current.height;
                }, 1000);
                updateInternalDimensionsWithOriginal();
            }}
            handleClasses={{
                left: cn(
                    "z-[9999999]",
                    hovered && "border-l border-dashed border-blue-500",
                ),
                right: cn(
                    "z-[9999999]",
                    hovered && "border-r border-dashed border-blue-500",
                ),
                top: cn(
                    "z-[9999999]",
                    hovered && "border-t border-dashed border-blue-500",
                ),
                bottom: cn(
                    "z-[9999999]",
                    hovered && "border-b border-dashed border-blue-500",
                ),
            }}
            {...props}
        >
            {children}
            {active && (
                <Indicators
                    $bound={fillSpace === "yes" ? parentDirection : false}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </Indicators>
            )}
        </Resizable>
    );
};
