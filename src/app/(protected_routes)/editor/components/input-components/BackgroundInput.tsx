import { Button, Tab, Tabs, Tooltip } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { ReactSortable } from "react-sortablejs";
import { MdDragIndicator } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNode } from "@craftjs/core";
import ColorInput from "./ColorInput";
import SizeInput from "./SizeInput";
import SelectableInput from "./SelectableInput";
import ImageInput from "./ImageInput";

type BackgroundPosition = {
    type: "all" | "custom";
    all: string;
    left: string;
    top: string;
};

type BackgroundSize = {
    type: "all" | "custom";
    all: string;
    left: string;
    top: string;
};

type BackgroundImage = {
    url: string;
    position: BackgroundPosition;
    size: BackgroundSize;
    attachment: "scroll" | "fixed";
    repeat:
        | "repeat"
        | "repeat-x"
        | "repeat-y"
        | "no-repeat"
        | "initial"
        | "inherit";
    origin: "padding-box" | "border-box" | "content-box";
};

type BackgroundGradient = {
    gradient: string;
};

type BackgroundFields = {
    type: "color" | "gradient" | "image";
    color: {
        color: string;
    };
    image: BackgroundImage;
    gradient: BackgroundGradient;
};

export type BackgroundType = {
    id: number;
    fields: BackgroundFields;
};

export function generateBackgroundStyleFromImage(
    background: BackgroundImage,
): string {
    const position =
        background.position.type === "all"
            ? background.position.all
            : `${background.position.left} ${background.position.top}`;

    const size =
        background.size.type === "all"
            ? background.size.all
            : `${background.size.left} ${background.size.top}`;

    return `${background.url ? `url(${background.url})` : ""} ${position}/${size} ${background.repeat} ${background.origin} ${background.attachment}`.trim();
}

function BackgroundTile({
    node,
    setNodes,
    defaultField,
    title,
}: {
    node: BackgroundType;
    defaultField: BackgroundFields;
    title: string;
    setNodes: React.Dispatch<React.SetStateAction<BackgroundType[]>>;
}) {
    const [fields, setFields] = useState<BackgroundFields>(defaultField);
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
    }, [fields]);

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
                        {fields.type}
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
                <Tabs
                    className="mt-6"
                    fullWidth
                    selectedKey={fields.type}
                    onSelectionChange={(val) => {
                        setFields((prev: any) => {
                            return { ...prev, type: val };
                        });
                    }}
                >
                    <Tab key="color" title="Color">
                        <ColorInput
                            propName="abcd"
                            overrideOnChange
                            onChangeFn={(val) => {
                                setFields((prev: any) => {
                                    return {
                                        ...prev,
                                        color: { color: val },
                                    };
                                });
                            }}
                            defaultValue={fields.color.color}
                        />
                    </Tab>
                    <Tab key="gradient" title="Gradient">
                        <ColorInput
                            propName="abcd"
                            overrideOnChange
                            onChangeFn={(val) => {
                                setFields((prev: any) => {
                                    return {
                                        ...prev,
                                        gradient: { gradient: val },
                                    };
                                });
                            }}
                            defaultValue={fields.gradient.gradient}
                            maxWidth="230px"
                        />
                    </Tab>
                    <Tab key="image" title="Image">
                        <p className="text-xl">Url</p>
                        <ImageInput
                            propName=""
                            overrideOnChange
                            defaultValue={fields.image.url}
                            onChangeFn={(val) => {
                                setFields((prev: any) => {
                                    return {
                                        ...prev,
                                        image: {
                                            ...prev.image,
                                            url: val,
                                        },
                                    };
                                });
                            }}
                        />
                        <div>
                            <p className="text-xl">Position</p>
                            <Tabs
                                selectedKey={fields.image.position.type}
                                onSelectionChange={(val) => {
                                    setFields((prev: any) => {
                                        return {
                                            ...prev,
                                            image: {
                                                ...prev.image,
                                                position: {
                                                    ...prev.image.position,
                                                    type: val,
                                                },
                                            },
                                        };
                                    });
                                }}
                            >
                                <Tab key="all" title="All">
                                    <SizeInput
                                        propName=""
                                        overrideOnChange
                                        defaultValue={fields.image.position.all}
                                        label="All"
                                        clearDefaultValues
                                        customValues={[
                                            "center",
                                            "top",
                                            "bottom",
                                            "left",
                                            "right",
                                        ]}
                                        onChangeFn={(val) => {
                                            setFields((prev: any) => {
                                                return {
                                                    ...prev,
                                                    image: {
                                                        ...prev.image,
                                                        position: {
                                                            ...prev.image
                                                                .position,
                                                            all: val,
                                                        },
                                                    },
                                                };
                                            });
                                        }}
                                    />
                                </Tab>
                                <Tab key="custom" title="Custom">
                                    <SizeInput
                                        propName=""
                                        overrideOnChange
                                        defaultValue={
                                            fields.image.position.left
                                        }
                                        clearDefaultValues
                                        customValues={[
                                            "center",
                                            "top",
                                            "bottom",
                                            "left",
                                            "right",
                                        ]}
                                        label="Left"
                                        onChangeFn={(val) => {
                                            setFields((prev: any) => {
                                                return {
                                                    ...prev,
                                                    image: {
                                                        ...prev.image,
                                                        position: {
                                                            ...prev.image
                                                                .position,
                                                            left: val,
                                                        },
                                                    },
                                                };
                                            });
                                        }}
                                    />
                                    <SizeInput
                                        propName=""
                                        overrideOnChange
                                        clearDefaultValues
                                        customValues={[
                                            "center",
                                            "top",
                                            "bottom",
                                            "left",
                                            "right",
                                        ]}
                                        defaultValue={fields.image.position.top}
                                        label="Top"
                                        onChangeFn={(val) => {
                                            setFields((prev: any) => {
                                                return {
                                                    ...prev,
                                                    image: {
                                                        ...prev.image,
                                                        position: {
                                                            ...prev.image
                                                                .position,
                                                            top: val,
                                                        },
                                                    },
                                                };
                                            });
                                        }}
                                    />
                                </Tab>
                            </Tabs>
                        </div>
                        <div>
                            <p className="text-xl">Size</p>
                            <Tabs
                                selectedKey={fields.image.size.type}
                                onSelectionChange={(val) => {
                                    setFields((prev: any) => {
                                        return {
                                            ...prev,
                                            image: {
                                                ...prev.image,
                                                size: {
                                                    ...prev.image.size,
                                                    type: val,
                                                },
                                            },
                                        };
                                    });
                                }}
                            >
                                <Tab key="all" title="All">
                                    <SizeInput
                                        propName=""
                                        overrideOnChange
                                        defaultValue={fields.image.size.all}
                                        label="All"
                                        customValues={[
                                            "auto",
                                            "cover",
                                            "contain",
                                        ]}
                                        clearDefaultValues
                                        onChangeFn={(val) => {
                                            setFields((prev: any) => {
                                                return {
                                                    ...prev,
                                                    image: {
                                                        ...prev.image,
                                                        size: {
                                                            ...prev.image.size,
                                                            all: val,
                                                        },
                                                    },
                                                };
                                            });
                                        }}
                                    />
                                </Tab>
                                <Tab key="custom" title="Custom">
                                    <SizeInput
                                        propName=""
                                        overrideOnChange
                                        defaultValue={fields.image.size.left}
                                        label="Left"
                                        customValues={[
                                            "auto",
                                            "cover",
                                            "contain",
                                        ]}
                                        clearDefaultValues
                                        onChangeFn={(val) => {
                                            setFields((prev: any) => {
                                                return {
                                                    ...prev,
                                                    image: {
                                                        ...prev.image,
                                                        size: {
                                                            ...prev.image.size,
                                                            left: val,
                                                        },
                                                    },
                                                };
                                            });
                                        }}
                                    />
                                    <SizeInput
                                        propName=""
                                        overrideOnChange
                                        defaultValue={fields.image.size.top}
                                        label="Top"
                                        customValues={[
                                            "auto",
                                            "cover",
                                            "contain",
                                        ]}
                                        clearDefaultValues
                                        onChangeFn={(val) => {
                                            setFields((prev: any) => {
                                                return {
                                                    ...prev,
                                                    image: {
                                                        ...prev.image,
                                                        size: {
                                                            ...prev.image.size,
                                                            top: val,
                                                        },
                                                    },
                                                };
                                            });
                                        }}
                                    />
                                </Tab>
                            </Tabs>
                        </div>
                        <SelectableInput
                            label="Attachment"
                            propName=""
                            overrideOnChange
                            options={["scroll", "fixed"]}
                            defaultValue={fields.image.attachment}
                            onChangeFn={(val) => {
                                setFields((prev: any) => {
                                    return {
                                        ...prev,
                                        image: {
                                            ...prev.image,
                                            attachment: val,
                                        },
                                    };
                                });
                            }}
                        />
                        <SelectableInput
                            label="Repeat"
                            propName=""
                            overrideOnChange
                            options={[
                                "repeat",
                                "repeat-x",
                                "repeat-y",
                                "no-repeat",
                                "initial",
                                "inherit",
                            ]}
                            defaultValue={fields.image.repeat}
                            onChangeFn={(val) => {
                                setFields((prev: any) => {
                                    return {
                                        ...prev,
                                        image: {
                                            ...prev.image,
                                            repeat: val,
                                        },
                                    };
                                });
                            }}
                        />
                        <SelectableInput
                            label="Origin"
                            propName=""
                            overrideOnChange
                            options={[
                                "padding-box",
                                "border-box",
                                "content-box",
                            ]}
                            defaultValue={fields.image.origin}
                            onChangeFn={(val) => {
                                setFields((prev: any) => {
                                    return {
                                        ...prev,
                                        image: {
                                            ...prev.image,
                                            origin: val,
                                        },
                                    };
                                });
                            }}
                        />
                    </Tab>
                </Tabs>
            </PopoverContent>
        </Popover>
    );
}

export const defaultBackground: BackgroundType = {
    id: Math.random(),
    fields: {
        type: "color", // Gradient, Image
        color: {
            color: "rgb(255, 0, 0)",
        },
        image: {
            url: "",
            position: {
                type: "all", // custom
                all: "center",
                left: "center",
                top: "center",
            },
            size: {
                type: "all", // custom
                all: "auto",
                left: "auto",
                top: "auto",
            },
            attachment: "scroll", // fixed
            repeat: "repeat", // repeat-x | repeat-y | no-repeat | initial | inherit
            origin: "padding-box", // border-box | content-box
        },
        gradient: {
            gradient:
                "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)",
        },
    },
};

export default function BackgroundInput() {
    const { nodesDefault } = useNode((node) => ({
        nodesDefault: node.data.props[node.data.props.type].backgrounds,
    }));
    const [nodes, setNodes] = useState<BackgroundType[]>(nodesDefault);
    const { actions } = useNode((node) => ({}));

    useEffect(() => {
        actions.setProp((props: any) => {
            return (props[props.type].backgrounds = nodes);
        });
    }, [nodes]);
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div>Background</div>
                <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    onPress={() => {
                        setNodes([
                            ...nodes,
                            { ...defaultBackground, id: Math.random() },
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
                        <BackgroundTile
                            key={node.id}
                            node={node}
                            setNodes={setNodes}
                            defaultField={node.fields}
                            title="Background"
                        />
                    ))}
                </ReactSortable>
            </div>
        </div>
    );
}
