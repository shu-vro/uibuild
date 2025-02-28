import { useEditor, Element } from "@craftjs/core";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { RiText } from "react-icons/ri";
import { PiAppWindowBold } from "react-icons/pi";
import { Text } from "./Elements/Text";
import { Container } from "./Elements/Container";

import { Layers } from "@craftjs/layers";
import {
    BackgroundType,
    defaultBackground,
} from "./input-components/BackgroundInput";
import { generalPropsDefault } from "./Elements/GeneralSettings";
import { Heading } from "./Elements/Heading";
import { LuHeading } from "react-icons/lu";
import { IoLinkOutline, IoImageOutline } from "react-icons/io5";
import { LinkComponent } from "./Elements/Link";
import { ImageComponent } from "./Elements/ImageComponent";

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
                            connectors.create(ref, <Text />);
                        }
                    }}
                >
                    Text
                </CustomButton>
                <CustomButton
                    Icon={LuHeading}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(ref, <Heading />);
                        }
                    }}
                >
                    Heading
                </CustomButton>
                <CustomButton
                    Icon={IoLinkOutline}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(ref, <LinkComponent />);
                        }
                    }}
                >
                    Link
                </CustomButton>
                <CustomButton
                    Icon={PiAppWindowBold}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(
                                ref,
                                <Element canvas is={Container} />,
                            );
                        }
                    }}
                >
                    Container
                </CustomButton>

                <CustomButton
                    Icon={IoImageOutline}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(ref, <ImageComponent />);
                        }
                    }}
                >
                    Image
                </CustomButton>
            </div>
            <div className="max-h-[50vh] overflow-auto">
                <Layers />
            </div>
        </div>
    );
}
