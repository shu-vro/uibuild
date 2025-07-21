"use client";

import React, { useState } from "react";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Select,
    SelectItem,
} from "@heroui/react";
import Link from "next/link";
import HomeNavbar from "./HomeNavbar";
import CreateProject from "./CreateProject";
import { useQuery } from "@tanstack/react-query";
import { CollectionId, databases, dbId } from "@/appwriteConfig";
import { Query } from "appwrite";
import { useUser } from "@/src/contexts/UserContext";
import { LuExternalLink } from "react-icons/lu";

export default function HomePage() {
    const { user, isLoading: userLoading } = useUser();

    // If user is null - show nothing or redirect immediately
    if (!user && !userLoading) {
        return <div>Redirecting...</div>;
    }
    const {
        data: projects,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["projects", user.$id],
        queryFn: async () => {
            return databases.listDocuments(dbId, CollectionId.workspaceData, [
                Query.equal("belongsTo", user.$id),
                Query.orderAsc("$updatedAt"),
            ]);
        },
        refetchOnWindowFocus: false,
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading projects: {error.message}</div>;
    const documents = projects.documents as WorkspaceDataType[];
    return (
        <div>
            <HomeNavbar />
            <div className="p-4">
                <h1 className="text-4xl font-bold my-4">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <CreateProject />
                    {documents.map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: WorkspaceDataType }) {
    const [selectedVersion, setSelectedVersion] = useState(
        project.currentVersion,
    );

    const baseUrl = window.location.origin;
    const remoteUrl = `${baseUrl}/${project.slug}`;

    return (
        <Card isPressable as={"span"} className="min-h-80">
            <CardBody className="relative isolate p-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold my-3">
                        <Link
                            href={`/editor/${project.slug}?version=${selectedVersion}&workspaceId=${project.$id}`}
                        >
                            {project.name}
                            <span className="absolute inset-0"></span>
                        </Link>
                    </h1>
                    <p className="italic text-gray-500 line-clamp-4">
                        {project.description}
                    </p>
                </div>
            </CardBody>
            <CardFooter className="max-lg:flex-col max-lg:items-end gap-2 @container">
                {/* <Link
                    href={remoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-400 dark:bg-slate-700 px-2 py-1 rounded-sm truncate @lg:bg-red"
                >
                    <LuExternalLink />
                </Link> */}
                <Button
                    as={Link}
                    href={remoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    isIconOnly
                    color="success"
                    variant="flat"
                >
                    <LuExternalLink />
                </Button>
                <div className="grow" />
                <Select
                    className="w-[140px] shrink-0"
                    size="lg"
                    startContent="Version"
                    color="secondary"
                    disallowEmptySelection
                    selectedKeys={new Set([selectedVersion.toString()])}
                    onSelectionChange={(key) => {
                        setSelectedVersion(parseInt(key.currentKey));
                        databases.updateDocument(
                            dbId,
                            CollectionId.workspaceData,
                            project.$id,
                            {
                                currentVersion: parseInt(key.currentKey),
                            },
                        );
                    }}
                >
                    {project.versions.map((version) => (
                        <SelectItem
                            key={version.versionNum.toString()}
                            textValue={version.versionNum.toString()}
                        >
                            {version.versionNum}
                        </SelectItem>
                    ))}
                </Select>
            </CardFooter>
        </Card>
    );
}
