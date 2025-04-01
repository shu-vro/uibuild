"use client";

import React from "react";

import { Card, CardBody, CardFooter, Select, SelectItem } from "@heroui/react";
import Link from "next/link";
import HomeNavbar from "./HomeNavbar";
import CreateProject from "./CreateProject";

export default function HomePage() {
    return (
        <div>
            <HomeNavbar />
            <div className="p-4">
                <h1 className="text-4xl font-bold my-4">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <CreateProject />
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
