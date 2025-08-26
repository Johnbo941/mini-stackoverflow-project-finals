import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage connected");
    } catch (error: any) {
        if (error.code === 404) {
            try {
                await storage.createBucket(
                    questionAttachmentBucket,
                    questionAttachmentBucket,
                    [
                        Permission.create("users"),
                        Permission.read("any"),
                        Permission.update("users"),
                        Permission.delete("users"),
                    ],
                    false, // file security (set true if you want private by default)
                    undefined,
                    undefined,
                    ["jpg", "jpeg", "png", "gif", "webp", "pdf", "heic"] // allowed file extensions
                );
                console.log("Storage created");
                console.log("Storage connected");
            } catch (e) {
                console.error("Error creating storage:", e);
                throw e;
            }
        } else {
            console.error("Error getting storage bucket:", error);
            throw error;
        }
    }
}
