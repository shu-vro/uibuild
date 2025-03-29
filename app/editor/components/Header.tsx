"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    ButtonGroup,
    Tooltip,
} from "@heroui/react";
import ThemeButton from "./ThemeButton";
import { LiaUndoSolid, LiaRedoSolid } from "react-icons/lia";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import { toast } from "sonner";
import { useEffectOnce } from "@craftjs/utils";
import { set, get } from "idb-keyval";
import { GoEye } from "react-icons/go";
import { useDeviceWidth } from "@/contexts/DeviceWidthContext";
import { IoSaveOutline } from "react-icons/io5";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function Header() {
    const { setMode } = useDeviceWidth();
    const { actions, query, enabled, canUndo, canRedo } = useEditor(
        (state, query) => ({
            enabled: state.options.enabled,
            canUndo: state.options.enabled && query.history.canUndo(),
            canRedo: state.options.enabled && query.history.canRedo(),
        }),
    );
    useEffectOnce(() => {
        (async () => {
            const data = await get("craft.js");
            if (data) {
                const json = JSON.parse(lz.decompress(lz.decodeBase64(data)));
                actions.deserialize(json);
                toast.success("Loaded previous state");
            }
        })();
    });
    return (
        <Navbar
            maxWidth="full"
            className={`transition-height ease-in-out duration-300 ${
                !enabled ? "h-0 overflow-hidden pointer-events-none" : "h-16"
            }`}
        >
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">UiBuild</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <ButtonGroup variant="light">
                        <Button
                            onPress={() => {
                                setMode("full");
                            }}
                        >
                            Full
                        </Button>
                        <Button
                            onPress={() => {
                                setMode("laptop");
                            }}
                        >
                            Laptop
                        </Button>
                        <Button
                            onPress={() => {
                                setMode("tablet");
                            }}
                        >
                            Tab
                        </Button>
                        <Button
                            onPress={() => {
                                setMode("mobile");
                            }}
                        >
                            Mobile
                        </Button>
                    </ButtonGroup>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Tooltip content="Save" color="primary" showArrow>
                        <Button
                            as={Link}
                            color="primary"
                            href="#"
                            variant="flat"
                            isIconOnly
                            onPress={async () => {
                                const json = JSON.parse(query.serialize());
                                const saveData = lz.encodeBase64(
                                    lz.compress(JSON.stringify(json)),
                                );
                                await set("craft.js", saveData);
                                console.log(json, saveData);
                                toast.success("Saved!");
                            }}
                        >
                            <IoSaveOutline />
                        </Button>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Tooltip content="Preview" color="primary" showArrow>
                        <Button
                            as={Link}
                            color={"primary"}
                            href="#"
                            variant="flat"
                            isIconOnly
                            onPress={() =>
                                actions.setOptions(
                                    (options) => (options.enabled = !enabled),
                                )
                            }
                        >
                            <GoEye />
                        </Button>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Tooltip content="Theme" color="primary" showArrow>
                        <ThemeButton />
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Tooltip content="Undo" color="primary" showArrow>
                        <Button
                            as={Link}
                            color={canUndo ? "primary" : "default"}
                            href="#"
                            variant="flat"
                            isIconOnly
                            disabled={!enabled || !canUndo}
                            onPress={() => actions.history.undo()}
                        >
                            <LiaUndoSolid />
                        </Button>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Tooltip content="Redo" color="primary" showArrow>
                        <Button
                            as={Link}
                            color={canRedo ? "primary" : "default"}
                            href="#"
                            variant="flat"
                            isIconOnly
                            disabled={!enabled || !canRedo}
                            onPress={() => actions.history.redo()}
                        >
                            <LiaRedoSolid />
                        </Button>
                    </Tooltip>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
