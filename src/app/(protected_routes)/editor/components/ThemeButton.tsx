"use client";

import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonProps,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { PiMoonThin } from "react-icons/pi";
import { RxSun } from "react-icons/rx";
import { PiDeviceMobileCamera } from "react-icons/pi";
import { cn } from "@/src/lib/utils";

export default function ThemeButton({ className, ...props }: ButtonProps) {
    const { theme, setTheme } = useTheme();
    const [selectedKeys, setSelectedKeys] = React.useState(
        new Set([
            typeof window !== "undefined"
                ? localStorage?.theme
                : theme || "system",
        ]),
    );

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    color="primary"
                    isIconOnly
                    variant="flat"
                    className={cn("text-xl", className)}
                    {...props}
                >
                    {theme === "light" && <RxSun />}
                    {theme === "dark" && <PiMoonThin />}
                    {theme === "system" && <PiDeviceMobileCamera />}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(e) => {
                    setSelectedKeys(new Set(e));
                    setTheme(e.currentKey as string);
                }}
            >
                <DropdownItem key="light">Light</DropdownItem>
                <DropdownItem key="dark">Dark</DropdownItem>
                <DropdownItem key="system">System Default</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
