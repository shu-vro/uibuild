import { Models } from "appwrite";

declare global {
    interface AllVersionsType extends Models.Document {
        versionNum: number;
        versionUrl: string;
        public_id: string;
        workspace: WorkspaceDataType;
    }

    interface WorkspaceDataType extends Models.Document {
        name: string;
        description: string;
        belongsTo: string;
        currentVersion: number;
        versions: AllVersionsType[];
    }
}

export {};
