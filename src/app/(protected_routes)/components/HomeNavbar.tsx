"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Tooltip,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { Logo } from "../editor/components/Header";
import Link from "next/link";
import ThemeButton from "../editor/components/ThemeButton";
import { useUser } from "@/src/contexts/UserContext";
import { firstLetterCollect } from "@/src/lib/utils";

export default function HomeNavbar() {
    const { user, logOut } = useUser();
    return (
        <Navbar maxWidth="full">
            <NavbarBrand as={Link} href="/" className="flex items-center">
                <Logo />
                <p className="font-bold text-inherit ml-2">UiBuild</p>
            </NavbarBrand>

            <NavbarContent justify="end">
                {user ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                size="sm"
                                as="button"
                                name={firstLetterCollect(user.name)}
                                showFallback
                                classNames={{
                                    // base: "bg-red-500",
                                    name: "font-bold text-xl",
                                }}
                                className="transition-transform"
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{user.name}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                My Settings
                            </DropdownItem>
                            <DropdownItem key="team_settings">
                                Team Settings
                            </DropdownItem>
                            <DropdownItem key="analytics">
                                Analytics
                            </DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">
                                Configurations
                            </DropdownItem>
                            <DropdownItem key="help_and_feedback">
                                Help & Feedback
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                onPress={async () => {
                                    await logOut();
                                }}
                            >
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/auth/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="primary"
                                href="/auth/signup"
                                variant="flat"
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
                <NavbarItem>
                    <Tooltip content="Theme" color="primary" showArrow>
                        <ThemeButton />
                    </Tooltip>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
