"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@heroui/react";
import ThemeButton from "./ThemeButton";
import { LiaUndoSolid, LiaRedoSolid } from "react-icons/lia";
import { BsSave } from "react-icons/bs";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import { toast } from "sonner";
import { useEffectOnce } from "@craftjs/utils";
import { set, get } from "idb-keyval";

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
        <Navbar maxWidth="full">
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">UiBuild</p>
            </NavbarBrand>
            {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent> */}
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        as={Link}
                        color="primary"
                        href="#"
                        variant="flat"
                        isIconOnly
                        onPress={async () => {
                            const json = JSON.parse(query.serialize());
                            console.log(json);
                            const saveData = lz.encodeBase64(
                                lz.compress(JSON.stringify(json)),
                            );
                            await set("craft.js", saveData);
                            toast.success("Saved!");
                        }}
                    >
                        <BsSave />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <ThemeButton />
                </NavbarItem>
                <NavbarItem>
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
                </NavbarItem>
                <NavbarItem>
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
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
