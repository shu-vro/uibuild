import { useEditor, Element } from "@craftjs/core";
import { Button } from "@heroui/react";
import { RiText } from "react-icons/ri";
import { BsBox } from "react-icons/bs";
import { Text } from "./Elements/Text";
import { Container } from "./Elements/Container";

import { Layers } from "@craftjs/layers";
import { Heading } from "./Elements/Heading";
import { LuHeading } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { HiOutlineLink } from "react-icons/hi2";
import { LinkComponent } from "./Elements/Link";
import { ImageComponent } from "./Elements/ImageComponent";
import { ButtonComponent } from "./Elements/ButtonComponent";
import { PiCursorClick } from "react-icons/pi";
import { ThemeButtonComponent } from "./Elements/ThemeButtonComponent";
import { CgDarkMode } from "react-icons/cg";

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
            className="w-full h-32 flex-col items-center justify-center will-change-transform"
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
                    Icon={HiOutlineLink}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(ref, <LinkComponent />);
                        }
                    }}
                >
                    Link
                </CustomButton>
                <CustomButton
                    Icon={BsBox}
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
                <CustomButton
                    Icon={PiCursorClick}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(ref, <ButtonComponent />);
                        }
                    }}
                >
                    Button
                </CustomButton>
                <CustomButton
                    Icon={CgDarkMode}
                    ref={(ref) => {
                        if (ref) {
                            connectors.create(ref, <ThemeButtonComponent />);
                        }
                    }}
                >
                    Theme Button
                </CustomButton>
            </div>
            <div className="max-h-[50vh] overflow-auto">
                <Layers />
            </div>
        </div>
    );
}
