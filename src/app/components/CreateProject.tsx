import { Button, Card, CardBody, Input, Textarea } from "@heroui/react";
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { CollectionId, databases, dbId } from "@/appwriteConfig";
import { ID, Permission, Role } from "appwrite";
import { useUser } from "@/src/contexts/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateProject() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    return (
        <>
            <Card
                isPressable
                onPress={() => {
                    setIsOpen(true);
                }}
            >
                <CardBody className="justify-center items-center text-6xl bg-primary/50">
                    Create Project
                </CardBody>
            </Card>

            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                size="full"
                as={"form"}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(
                        e.currentTarget as HTMLFormElement,
                    );
                    const projectName = formData.get("projectName");
                    const projectDescription =
                        formData.get("projectDescription");

                    console.log(projectName, projectDescription);

                    try {
                        const info = await databases.createDocument(
                            dbId,
                            CollectionId.workspaceData,
                            ID.unique(),
                            {
                                name: projectName,
                                description: projectDescription,
                                belongsTo: user.$id, // Replace with actual user ID
                            },
                            [
                                Permission.read(Role.any()),
                                Permission.update(Role.user(user.$id)),
                                Permission.delete(Role.user(user.$id)),
                            ],
                        );
                        toast.success(
                            info.name + " Project created successfully",
                        );
                        router.push(
                            `/editor/${info.$id}?version=${info.currentVersion}`,
                        );
                    } catch (error) {
                        toast.error("Failed to create project");
                        console.error("Error creating project:", error);
                    }
                }}
            >
                <ModalContent className="p-8">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-3xl">
                                Create New Project
                            </ModalHeader>
                            <ModalBody className="items-center">
                                <Input
                                    label="Project Name"
                                    className="mb-4"
                                    size="lg"
                                    maxLength={100}
                                    isRequired
                                    name="projectName"
                                />
                                <Textarea
                                    label="Project Description"
                                    className="mb-4"
                                    size="lg"
                                    placeholder="Write a short description about your project"
                                    rows={4}
                                    maxLength={500}
                                    isRequired
                                    name="projectDescription"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit">
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
