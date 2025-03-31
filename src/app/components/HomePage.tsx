"use client";

import React from "react";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Card,
    CardBody,
    Tooltip,
    CardFooter,
    Select,
    SelectItem,
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
import { useRouter } from "next/navigation";

export default function HomePage() {
    const { user, logOut } = useUser();
    const router = useRouter();
    return (
        <div>
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
                                <DropdownItem
                                    key="profile"
                                    className="h-14 gap-2"
                                >
                                    <p className="font-semibold">
                                        Signed in as
                                    </p>
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
                                        router.push("/auth/login");
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
            <div className="p-4">
                <h1 className="text-4xl font-bold my-4">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(10)
                        .fill(1)
                        .map((_, i) => (
                            <ProjectCard key={i} />
                        ))}
                </div>
            </div>
        </div>
    );
}

function ProjectCard() {
    return (
        <Card isPressable as={"span"}>
            <CardBody className="relative isolate p-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold my-3">
                        <Link href="/editor">
                            My First Website
                            <span className="absolute inset-0"></span>
                        </Link>
                    </h1>
                    <p className="italic text-gray-500 line-clamp-3">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatem, expedita perspiciatis quos omnis
                        aliquam ullam soluta, alias necessitatibus, maxime a
                        quae iusto officia! Quod enim dignissimos voluptas
                        possimus dolorum dolores.
                    </p>
                </div>
            </CardBody>
            <CardFooter>
                <div className="grow" />
                <Select
                    className="w-[160px]"
                    size="lg"
                    startContent="Version"
                    color="secondary"
                    disallowEmptySelection
                    defaultSelectedKeys={["10"]}
                >
                    {Array(10)
                        .fill(1)
                        .map((_, i) => (
                            <SelectItem
                                key={`${10 - i}`}
                            >{`${10 - i}`}</SelectItem>
                        ))}
                </Select>
            </CardFooter>
        </Card>
    );
}
