"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { CollectionId, databases, dbId } from "@/appwriteConfig";
import { ID, Models, Permission, Query, Role } from "appwrite";
import Loading from "../app/(protected_routes)/loading";
import { toast } from "sonner";
import lz from "lzutf8";
import saveVersionAction from "../actions/saveVersionAction";
import { UploadApiResponse } from "cloudinary";

type WorkspaceInfoProviderProps = {
    workspace: WorkspaceDataType;
    save(data: string): Promise<any>;
    saveVersion(data: string): Promise<any>;
    loadVersion(version: string): Promise<any>;
};

const Context = createContext({} as WorkspaceInfoProviderProps);

export const useWorkspaceInfo = () => {
    return useContext(Context);
};

export default function WorkspaceInfoProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const searchParams = useSearchParams();
    const { user } = useUser();

    const {
        data: workspace,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<Models.DocumentList<WorkspaceDataType>>({
        queryKey: [
            "workspace",
            params.slug,
            user?.$id,
            searchParams.get("workspaceId"),
        ],
        queryFn: async () => {
            return databases.listDocuments(dbId, CollectionId.workspaceData, [
                Query.and([
                    Query.equal("belongsTo", [user?.$id]),
                    Query.equal("$id", [
                        searchParams.get("workspaceId") as string,
                    ]),
                    Query.equal("slug", [params.slug as string]),
                ]),
            ]);
        },
        throwOnError(error, query) {
            toast.error(error.message);
            return false;
        },
    });

    const createVersionDoc = async (
        currentVersion: number,
        versionUrl: string,
        publicId: string,
    ) => {
        if (!workspace?.documents?.[0]) {
            throw new Error("No workspace found");
        }
        return await databases.createDocument<AllVersionsType>(
            dbId,
            CollectionId.allVersions,
            ID.unique(),
            {
                versionNum: currentVersion + 1,
                versionUrl: versionUrl,
                public_id: publicId,
                workspace: workspace.documents[0].$id,
            },
            [
                Permission.read(Role.any()),
                Permission.write(Role.user(user.$id)),
                Permission.delete(Role.user(user.$id)),
            ],
        );
    };

    async function handleNoVersionAndNoFile(
        document: WorkspaceDataType,
        prepareData: string,
    ) {
        // No current version and no file present – create a new version document
        const uploadResult = (await saveVersionAction(
            prepareData,
        )) as UploadApiResponse;
        console.log("file uploaded");
        const versionData = await createVersionDoc(
            -1, // becomes 0
            uploadResult.secure_url,
            uploadResult.public_id,
        );
        await databases.updateDocument<WorkspaceDataType>(
            dbId,
            CollectionId.workspaceData,
            document.$id,
            {
                // name: document.name,
                // description: document.description,
                // belongsTo: document.belongsTo,
                currentVersion: versionData.versionNum,
            },
        );
        toast.success("Version created: " + versionData.versionNum);
    }

    async function handleExistingVersion(
        document: WorkspaceDataType,
        prepareData: string,
        searchParams: URLSearchParams,
    ) {
        // There are existing versions – update the file for the selected version
        const targetVersion = parseInt(searchParams.get("version") ?? "");
        const selectedVersion = document.versions.find(
            (version) => version.versionNum === targetVersion,
        );
        if (!selectedVersion) {
            return toast.error("No version found");
        }
        const uploadResult = (await saveVersionAction(
            prepareData,
            selectedVersion.public_id,
        )) as UploadApiResponse;
        return uploadResult;
    }

    const save = async (data: string) => {
        if (!workspace?.documents?.[0])
            return toast.error("No workspace found");

        const document = workspace.documents[0];
        const prepareData =
            "data:text/plain;base64," + lz.encodeBase64(lz.compress(data));

        try {
            if (document.currentVersion === 0) {
                if (document.versions.length === 0) {
                    await handleNoVersionAndNoFile(document, prepareData);
                } else {
                    await handleExistingVersion(
                        document,
                        prepareData,
                        searchParams,
                    );
                }
            } else {
                // Already have a current version; update the existing file/version.
                await handleExistingVersion(
                    document,
                    prepareData,
                    searchParams,
                );
            }
            await refetch();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.info("info saving version:", error);
                toast.error("Error saving version: " + error.message);
            } else {
                console.info("An unknown error occurred", error);
            }
        }
    };

    const saveVersion = async (data: string) => {
        if (!workspace?.documents?.[0])
            return toast.error("No workspace found");

        const document = workspace.documents[0];

        const prepareData =
            "data:text/plain;base64," + lz.encodeBase64(lz.compress(data));

        try {
            const uploadResult = (await saveVersionAction(
                prepareData,
            )) as UploadApiResponse;
            console.log("file uploaded");

            const versionDoc = await createVersionDoc(
                document.currentVersion,
                uploadResult.secure_url,
                uploadResult.public_id,
            );

            await databases.updateDocument<WorkspaceDataType>(
                dbId,
                CollectionId.workspaceData,
                document.$id,
                {
                    currentVersion: versionDoc.versionNum,
                },
            );
            await refetch();
        } catch (error) {
            if (error instanceof Error) {
                console.info("Error saving version:", error);
                toast.error("Error saving version: " + error.message);
            } else {
                console.info("An unknown error occurred", error);
            }
        }
    };

    const loadVersion = async (version: string) => {
        if (!workspace?.documents?.[0]) {
            throw new Error("No workspace found");
        }
        const document = workspace.documents[0];
        const targetVersion = parseInt(version);
        const selectedVersion = document.versions.find(
            (version) => version.versionNum === targetVersion,
        );
        if (!selectedVersion) {
            return toast.error("No version found");
        }
        const file = await fetch(selectedVersion.versionUrl);
        const fileData = await file.text();
        const decompressedData = lz.decompress(lz.decodeBase64(fileData));
        return decompressedData;
    };

    if (isLoading) return <Loading />;
    if (isError) {
        console.info("Error fetching workspace data:", error);
        return <div>Error fetching workspace data</div>;
    }

    if (!workspace.documents.length) return <div>No workspace found</div>;

    return (
        <Context.Provider
            value={{
                workspace: workspace.documents[0],
                save,
                saveVersion,
                loadVersion,
            }}
        >
            {children}
        </Context.Provider>
    );
}
