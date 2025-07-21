"use client";

import React, { useState } from "react";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Select,
    SelectItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
} from "@heroui/react";
import Link from "next/link";
import HomeNavbar from "./HomeNavbar";
import CreateProject from "./CreateProject";
import {
    QueryObserverResult,
    RefetchOptions,
    useQuery,
} from "@tanstack/react-query";
import { CollectionId, databases, dbId } from "@/appwriteConfig";
import { Models, Query } from "appwrite";
import { useUser } from "@/src/contexts/UserContext";
import { LuExternalLink } from "react-icons/lu";
import { RxTrash } from "react-icons/rx";
import { toast } from "sonner";

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
        refetch,
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
                        <ProjectCard
                            key={i}
                            project={project}
                            refetch={refetch}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProjectCard({
    project,
    refetch,
}: {
    project: WorkspaceDataType;
    refetch: (
        options?: RefetchOptions,
    ) => Promise<
        QueryObserverResult<Models.DocumentList<Models.Document>, Error>
    >;
}) {
    const [selectedVersion, setSelectedVersion] = useState(
        project.currentVersion,
    );
    const [openModal, setOpenModal] = useState(false);
    const [deleteValue, setDeleteValue] = useState("");

    const baseUrl = window.location.origin;
    const remoteUrl = `${baseUrl}/${project.slug}`;

    return (
        <Card isPressable as={"form"} className="min-h-80">
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
                <Button
                    onPress={() => {
                        setOpenModal(true);
                    }}
                    isIconOnly
                    color="danger"
                    variant="flat"
                >
                    <RxTrash className="text-lg" />
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
            <Modal isOpen={openModal} onOpenChange={setOpenModal}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Delete Project?
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Deletation process is <b>irreversible</b>.
                                    Are you sure you want to delete this
                                    project?
                                </p>
                                <p>
                                    Write <b>DELETE</b> in the input below to
                                    confirm:
                                </p>
                                <Input
                                    type="text"
                                    variant="bordered"
                                    className="w-full p-2"
                                    placeholder="DELETE"
                                    radius="none"
                                    value={deleteValue}
                                    onChange={(e) => {
                                        setDeleteValue(e.target.value);
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" onPress={onClose}>
                                    NO, CLOSE MODAL
                                </Button>
                                <Button
                                    color="danger"
                                    onPress={async () => {
                                        if (deleteValue === "DELETE") {
                                            try {
                                                await databases.deleteDocument(
                                                    dbId,
                                                    CollectionId.workspaceData,
                                                    project.$id,
                                                );
                                                toast.success(
                                                    "Project deleted successfully!",
                                                );
                                                await refetch();
                                                onClose();
                                            } catch (error: any) {
                                                toast.error(
                                                    "Failed to delete project: " +
                                                        error.message,
                                                );
                                            }
                                        }
                                    }}
                                >
                                    YES, DELETE MY PROJECT
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Card>
    );
}
