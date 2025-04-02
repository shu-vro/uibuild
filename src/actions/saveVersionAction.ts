"use server";

import { revalidatePath } from "next/cache";
import { v2 } from "cloudinary";
import { randomUUID } from "crypto";

const cloudinary = v2;

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    secure: true,
});

export default async function saveVersionAction(
    file: string,
    public_id: string = randomUUID(),
) {
    try {
        // const file =
        //     "data:text/plain;base64,

        const uploadResult = await cloudinary.uploader
            .upload("data:text/plain;base64," + file, {
                use_filename: true,
                unique_filename: true,
                exif: false,
                asset_folder: "uibuild-data",
                resource_type: "raw",
                type: "upload",
                format: "txt",
                overwrite: true,
                public_id,
            })
            .catch((error) => {
                console.log(error);
            });

        return uploadResult;
    } catch (error) {
        return error;
    } finally {
        revalidatePath("/");
    }
}
