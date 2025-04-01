import dotenv from "dotenv";
import {
    Databases,
    Client,
    Permission,
    Role,
    RelationshipType,
    RelationMutate,
} from "node-appwrite";
import chalk from "chalk";

dotenv.config({
    path: ["../.env.local", "./.env.local"],
});

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_SERVER_API_KEY!);

const databases = new Databases(client);

const dbId = "uibuild-db";

enum collectionId {
    workspaceData = "workspaceData",
    allVersions = "allVersions",
}

export async function initDatabase() {
    const result = await databases.create(dbId, "uibuild-db");
    return result;
}

export async function createCollection() {
    // Try creating the workspaceData collection
    try {
        await databases.createCollection(
            dbId,
            collectionId.workspaceData,
            collectionId.workspaceData,
            [
                Permission.read(Role.any()),
                Permission.write(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ],
            true,
            true,
        );
        console.log(
            chalk.green(
                `Collection "${collectionId.workspaceData}" created successfully.`,
            ),
        );
    } catch (error: any) {
        console.error(
            chalk.red(
                `Failed to create collection "${collectionId.workspaceData}": `,
            ),
            error.message,
        );
    }
    // Try creating the allVersions collection
    try {
        await databases.createCollection(
            dbId,
            collectionId.allVersions,
            collectionId.allVersions,
            [
                Permission.read(Role.any()),
                Permission.write(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ],
            true,
            true,
        );
        console.log(
            chalk.green(
                `Collection "${collectionId.allVersions}" created successfully.`,
            ),
        );
    } catch (error: any) {
        console.error(
            chalk.red(
                `Failed to create collection "${collectionId.allVersions}": `,
            ),
            error.message,
        );
    }
}

export async function createAttributes() {
    // Create "versionNum" attribute in allVersions collection
    try {
        const result = await databases.createIntegerAttribute(
            dbId,
            collectionId.allVersions,
            "versionNum",
            true, // required
            0, // minimum value
            10000, // maximum value
            undefined, // no default value for required attribute
            false, // not an array
        );
        console.log(
            chalk.green(`Attribute created successfully: ${result.key}`),
        );
    } catch (error: any) {
        console.error(
            chalk.red(`Failed to create "versionNum" attribute:`),
            error.message,
        );
    }

    // Create "versionUrl" attribute in allVersions collection
    try {
        const result = await databases.createUrlAttribute(
            dbId, // databaseId
            collectionId.allVersions, // collectionId
            "versionUrl", // key
            true, // required
            undefined, // no default value
            false, // not an array
        );
        console.log(
            chalk.green(`Attribute created successfully: ${result.key}`),
        );
    } catch (error: any) {
        console.error(
            chalk.red(`Failed to create "versionUrl" attribute:`),
            error.message,
        );
    }

    // Create "name" attribute in workspaceData collection
    try {
        const result = await databases.createStringAttribute(
            dbId,
            collectionId.workspaceData,
            "name",
            100, // maximum length
            true, // required
            undefined, // no default value provided for required attribute
            false, // not an array
            false, // not unique
        );
        console.log(
            chalk.green(`Attribute created successfully: ${result.key}`),
        );
    } catch (error: any) {
        console.error(
            chalk.red(`Failed to create "name" attribute:`),
            error.message,
        );
    }

    // Create "description" attribute in workspaceData collection
    try {
        const result = await databases.createStringAttribute(
            dbId,
            collectionId.workspaceData,
            "description",
            500, // maximum length
            true, // required
            undefined, // no default value
            false,
            false,
        );
        console.log(
            chalk.green(`Attribute created successfully: ${result.key}`),
        );
    } catch (error: any) {
        console.error(
            chalk.red(`Failed to create "description" attribute:`),
            error.message,
        );
    }

    // Create "belongsTo" attribute in workspaceData collection
    try {
        const result = await databases.createStringAttribute(
            dbId,
            collectionId.workspaceData,
            "belongsTo",
            20, // maximum length
            true, // required
            undefined, // no default value
            false,
            false,
        );
        console.log(
            chalk.green(`Attribute created successfully: ${result.key}`),
        );
    } catch (error: any) {
        console.error(
            chalk.red(`Failed to create "belongsTo" attribute:`),
            error.message,
        );
    }

    // Create "currentVersion" attribute in workspaceData collection
    try {
        const result = await databases.createIntegerAttribute(
            dbId,
            collectionId.workspaceData,
            "currentVersion",
            false, // required
            0, // minimum value
            10000, // maximum value
            0, // no default value for required attribute
            false, // not an array
        );
        console.log(
            chalk.green(`Attribute created successfully: ${result.key}`),
        );
    } catch (error: any) {
        console.error(
            chalk.red(`Failed to create "currentVersion" attribute:`),
            error.message,
        );
    }

    // Create relationship attribute for versions linking workspaceData to allVersions collection
    try {
        const result = await databases.createRelationshipAttribute(
            dbId,
            collectionId.workspaceData,
            collectionId.allVersions,
            RelationshipType.OneToMany,
            true,
            "versions",
            "allVersions",
            RelationMutate.Cascade,
        );
        console.log(
            chalk.green(
                `Relationship attribute "${result.key}" created successfully.`,
            ),
        );
    } catch (error: any) {
        console.error(
            chalk.red(`Failed to create relationship attribute "versions":`),
            error.message,
        );
    }
}
