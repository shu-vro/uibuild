import {
    Button,
    Tab,
    Tabs,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ReactSortable } from "react-sortablejs";
import { MdDragIndicator } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNode } from "@craftjs/core";
import SizeInput from "./SizeInput";
import ColorInput from "./ColorInput";
import SelectableInput from "./SelectableInput";
import { GeneralStatesType } from "../Elements/GeneralSettings";

function renderField(fieldsAst: any[], fields: any, setFields: any) {
    return fieldsAst.map((field) => {
        switch (field.type) {
            case "size":
                return (
                    <SizeInput
                        key={field.name}
                        propName={field.name}
                        label={field.label}
                        defaultValue={fields[field.name]}
                        overrideOnChange
                        additionalUnitValues={field.additionalUnitValues || []}
                        onChangeFn={(val) => {
                            setFields((prev: any) => {
                                return { ...prev, [field.name]: val };
                            });
                        }}
                        {...field.componentProps}
                    />
                );
            case "color":
                return (
                    <ColorInput
                        key={field.name}
                        label={field.label}
                        propName={field.name}
                        overrideOnChange
                        defaultValue={fields[field.name]}
                        onChangeFn={(val) => {
                            setFields((prev: any) => {
                                return { ...prev, [field.name]: val };
                            });
                        }}
                    />
                );
            case "tabs":
                return (
                    <Tabs
                        key={field.name}
                        className="mt-6"
                        fullWidth
                        selectedKey={fields[field.name]}
                        onSelectionChange={(val) => {
                            setFields((prev: any) => {
                                return { ...prev, [field.name]: val };
                            });
                        }}
                    >
                        {field.options.map((tab) => (
                            <Tab key={tab.value} title={tab.label}></Tab>
                        ))}
                    </Tabs>
                );
            case "select":
                return (
                    <SelectableInput
                        propName=""
                        key={field.name}
                        overrideOnChange
                        options={field.options}
                        defaultValue={fields[field.name]}
                        onChangeFn={(val) => {
                            setFields((prev: any) => {
                                return { ...prev, [field.name]: val };
                            });
                        }}
                    />
                );
            default:
                return null;
        }
    });
}

function renderHandle(fields: any, fieldsAst: any[]) {
    return fieldsAst.map((field) => {
        switch (field.type) {
            case "size":
            case "select":
                return (
                    <Tooltip key={field.name} content={field.label}>
                        <div>{fields[field.name]}</div>
                    </Tooltip>
                );
            case "color":
                return (
                    <Tooltip key={field.name} content={field.label}>
                        <span
                            className="w-4 h-4"
                            style={{
                                backgroundColor: fields[field.name],
                                display: "inline-block",
                                verticalAlign: "middle",
                                borderRadius: "50%",
                                border: "1px solid #fff",
                            }}
                        ></span>
                    </Tooltip>
                );
            case "tabs":
                return (
                    <Tooltip key={field.name} content={field.label}>
                        <div key={field.name}>
                            {
                                field.options.find(
                                    (tab) => tab.value === fields[field.name],
                                )?.label
                            }
                        </div>
                    </Tooltip>
                );
            default:
                return null;
        }
    });
}

type NodeType = {
    id: number;
    fields: Record<string, any>;
};

function NodeUpdate({
    node,
    setNodes,
    defaultField,
    fieldsAst,
    title,
    type,
}: {
    node: NodeType;
    defaultField: any;
    fieldsAst: any[];
    title: string;
    type: GeneralStatesType["type"];
    setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
}) {
    const [fields, setFields] = useState(defaultField);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        setNodes((prev) =>
            prev.map((n) => {
                if (n.id === node.id) {
                    return {
                        id: node.id,
                        fields,
                    };
                }
                return n;
            }),
        );
    }, [fields, isPopoverOpen]);

    return (
        <Popover
            placement="left"
            isOpen={isPopoverOpen}
            onOpenChange={(val) => setIsPopoverOpen(val)}
        >
            <PopoverTrigger>
                <div className="text-foreground/60 px-2 py-1 bg-content3 hover:bg-content2 transition-all cursor-pointer rounded-small w-full my-2 flex items-center justify-start gap-1 overflow-x-auto">
                    <MdDragIndicator fontSize="1.25rem" className="shrink-0" />
                    <div className="flex-1 text-xs flex items-center gap-2">
                        {renderHandle(fields, fieldsAst)}
                    </div>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => {
                            setNodes((prev) =>
                                prev.filter((n) => n.id !== node.id),
                            );
                        }}
                    >
                        <RxCross2 />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="block">
                <p>{title}</p>
                {renderField(fieldsAst, fields, setFields)}
            </PopoverContent>
        </Popover>
    );
}

export default function MultipleInputs({
    title,
    type,
    defaultFields,
    fields,
    propName,
}: {
    title: string;
    type: GeneralStatesType["type"];
    defaultFields: Record<string, any>;
    propName: string;
    fields: any[];
}) {
    const {
        nodesDefault,
        props,
        // type: nodeType,
    } = useNode((node) => ({
        props: node.data.props,
        // type: node.data.props.type,
        nodesDefault: type
            ? node.data.props[type][propName] || []
            : node.data.props[propName] || [],
    }));
    const [nodes, setNodes] = useState<NodeType[]>(nodesDefault);
    const { actions } = useNode();

    useEffect(() => {
        actions.setProp((props: any) => {
            if (!type) return (props[propName] = nodes);
            else return (props[type][propName] = nodes);
        });
    }, [nodes]);

    useEffect(() => {
        if (!propName) return;
        if (!type) setNodes(props[propName] || []);
        else setNodes(props[type][propName] || []);
    }, [type]);

    return (
        <div className="my-3">
            <div className="flex flex-row justify-between">
                <div>{title}</div>
                <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    onPress={() => {
                        setNodes([
                            ...nodes,
                            {
                                id: Math.random(),
                                fields: defaultFields,
                            },
                        ]);
                    }}
                >
                    <FaPlus />
                </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
                <ReactSortable
                    list={nodes.map((x) => ({ ...x, chosen: true }))}
                    setList={setNodes}
                    dragClass=".holder"
                    animation={150}
                    group="shared"
                    className="w-full"
                >
                    {nodes.map((node) => (
                        <NodeUpdate
                            key={node.id}
                            title={title}
                            node={node}
                            setNodes={setNodes}
                            defaultField={node.fields}
                            fieldsAst={fields}
                            type={type}
                        />
                    ))}
                </ReactSortable>
            </div>
        </div>
    );
}
