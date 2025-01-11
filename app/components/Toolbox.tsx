import { useEditor, Element } from "@craftjs/core";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { RiText } from "react-icons/ri";
import { PiAppWindowBold } from "react-icons/pi";
import { Text } from "./Elements/Text";
import { Container } from "./Elements/Container";

import { Layers } from "@craftjs/layers";

function CustomButton({
    Icon,
    children,
    ...rest
}: {
    Icon: React.ElementType;
    children: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
    return (
        <Button
            className="w-full h-32 flex-col items-center justify-center"
            variant="flat"
            color="secondary"
            {...rest}
        >
            <Icon className="text-3xl" />
            <span>{children}</span>
        </Button>
    );
}

export default function Toolbox() {
    const { connectors } = useEditor();
    return (
        <div className="w-[300px] sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto shrink-0">
            <div className="max-h-[calc(50vh-4rem)] overflow-auto grid grid-cols-2 gap-3">
                <CustomButton
                    Icon={RiText}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(
                                ref,
                                <Text
                                    fontSize={15}
                                    textAlign="start"
                                    text="Hello brother"
                                />,
                            );
                        }
                    }}
                >
                    Text
                </CustomButton>
                <CustomButton
                    Icon={PiAppWindowBold}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(
                                ref,
                                <Element
                                    canvas
                                    is={Container}
                                    padding={20}
                                    background={"#aaaaaa"}
                                    data-cy="root-container"
                                    children
                                ></Element>,
                            );
                        }
                    }}
                >
                    Container
                </CustomButton>
            </div>
            <div className="max-h-[50vh] overflow-auto">
                <Layers />
            </div>
        </div>
    );
}
