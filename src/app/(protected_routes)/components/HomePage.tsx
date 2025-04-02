"use client";

import React, { useState } from "react";

import { Card, CardBody, CardFooter, Select, SelectItem } from "@heroui/react";
import Link from "next/link";
import HomeNavbar from "./HomeNavbar";
import CreateProject from "./CreateProject";
import { useQuery } from "@tanstack/react-query";
import { CollectionId, databases, dbId } from "@/appwriteConfig";
import { Query } from "appwrite";
import { useUser } from "@/src/contexts/UserContext";

export default function HomePage() {
    const { user } = useUser();
    const {
        data: projects,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["projects", user.$id],
        queryFn: async () => {
            console.log(user);
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
    console.log(documents);
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

    console.log(project);

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
            <CardFooter>
                <div className="grow" />
                <Select
                    className="w-[160px]"
                    size="lg"
                    startContent="Version"
                    color="secondary"
                    disallowEmptySelection
                    // defaultSelectedKeys={[project.currentVersion.toString()]}
                    selectedKeys={new Set([selectedVersion.toString()])}
                    onSelectionChange={(key) => {
                        setSelectedVersion(parseInt(key.toString()));
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
