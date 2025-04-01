import { Account, Client, Databases } from "appwrite";
const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

const account = new Account(client);
const databases = new Databases(client);
const dbId = "uibuild-db";

enum CollectionId {
    workspaceData = "workspaceData",
    allVersions = "allVersions",
}

export { client, account, databases, dbId, CollectionId };
