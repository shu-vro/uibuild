import React, { useState, useMemo } from "react";
import { debounce } from "lodash";
import { Button, Card, CardBody, Input, Textarea } from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { CollectionId, databases, dbId } from "@/appwriteConfig";
import { ID, Permission, Query, Role } from "appwrite";
import { useUser } from "@/src/contexts/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Generate slug: convert spaces to dashes, remove special characters.
function generateSlug(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function CreateProject() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [slugDescription, setSlugDescription] = useState(
        "This will be the slug of your project",
    );
    const [slugValid, setSlugValid] = useState<true | string>(true);

    // Create a debounced function only once using useMemo.
    const debouncedCheckSlug = useMemo(
        () =>
            debounce(async (value: string) => {
                const list = await databases.listDocuments(
                    dbId,
                    CollectionId.workspaceData,
                    [Query.equal("slug", value)],
                );
                console.log(list);
                if (list.total > 0) {
                    setSlugDescription("This slug is already taken");
                    setSlugValid("This slug is already taken");
                } else {
                    setSlugDescription(
                        "Your slug will be: " + generateSlug(value),
                    );
                    setSlugValid(true);
                }
            }, 500),
        [],
    );

    const handleValueChange = (val: string) => {
        setSlug(val);
        // Show immediate feedback for slug
        setSlugDescription("Your slug will be: " + generateSlug(val));
        // Call the debounced function with the current value
        debouncedCheckSlug(val);
    };

    function handleSubmit(): React.FormEventHandler<HTMLElement> {
        return async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const projectName = formData.get("projectName");
            const projectSlug = formData.get("projectSlug");
            const generatedSlug = generateSlug(projectSlug as string);
            const projectDescription = formData.get("projectDescription");

            console.log(projectName, projectDescription);

            try {
                // Check if the project slug is already taken is handled by debounce above.
                const info = await databases.createDocument(
                    dbId,
                    CollectionId.workspaceData,
                    ID.unique(),
                    {
                        name: projectName,
                        slug: generatedSlug,
                        description: projectDescription,
                        belongsTo: user.$id, // Replace with actual user ID
                    },
                    [
                        Permission.read(Role.any()),
                        Permission.update(Role.user(user.$id)),
                        Permission.delete(Role.user(user.$id)),
                    ],
                );
                toast.success(info.name + " Project created successfully");
                router.push(
                    `/editor/${info.slug}?version=${info.currentVersion}&workspaceId=${info.$id}`,
                );
            } catch (error) {
                toast.error("Failed to create project");
                console.error("Error creating project:", error);
            }
        };
    }

    return (
        <>
            <Card
                isPressable
                onPress={() => {
                    setIsOpen(true);
                }}
                className="min-h-80"
            >
                <CardBody className="justify-center items-center text-center text-6xl bg-primary/50">
                    Create Project
                </CardBody>
            </Card>

            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                size="full"
                as={"form"}
                onSubmit={handleSubmit()}
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
                                <Input
                                    label="Project Unique Id"
                                    className="mb-4"
                                    size="lg"
                                    maxLength={100}
                                    isRequired
                                    name="projectSlug"
                                    description={slugDescription}
                                    value={slug}
                                    validate={(val) => slugValid}
                                    onValueChange={(val) => {
                                        handleValueChange(val);
                                    }}
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
                                    Create Project
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
