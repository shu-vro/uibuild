import { useEditor } from "@craftjs/core";
import { useEffectOnce } from "@craftjs/utils";
import lzString from "lz-string";
import { get } from "idb-keyval";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CollectionId, databases, dbId } from "@/appwriteConfig";
import { Query } from "appwrite";

export default function ConfigComponent() {
    const params = useParams();

    const { actions } = useEditor((state, query) => ({
        enabled: state.options.enabled,
        canUndo: state.options.enabled && query.history.canUndo(),
        canRedo: state.options.enabled && query.history.canRedo(),
    }));
    const { data } = useQuery({
        queryKey: ["craftjs"],
        queryFn: async () => {
            const slug = params.slug;
            const workspace = await databases.listDocuments<WorkspaceDataType>(
                dbId,
                CollectionId.workspaceData,
                [Query.equal("slug", slug)],
            );
            // getCurrenVerion
            const currentVersion = workspace.documents[0].currentVersion;
            const versionData = workspace.documents[0].versions.find(
                (version) => version.versionNum === currentVersion,
            );
            if (!versionData) {
                throw new Error("Version not found");
            }
            const versionUrl = versionData.versionUrl;
            const fetchData = await fetch(versionUrl);
            if (!fetchData.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await fetchData.text();
            if (data) {
                const json = JSON.parse(lzString.decompressFromBase64(data));
                actions.deserialize(json);
            }
            return data;
        },
        refetchOnWindowFocus: false,
    });
    useEffectOnce(() => {
        (async () => {
            const data = await get("craft.js");
            // if (data) {
            //     const json = JSON.parse(lz.decompress(lz.decodeBase64(data)));
            //     actions.deserialize(json);
            // }
        })();
    });
    return null;
}
