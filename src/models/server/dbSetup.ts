import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";


export default async function getOrcreateDB(){
    try {
        await databases.get(db)
        console.log("Database connection")
    } catch (error: any) {
        if (error.code === 404) {
            try {
                await databases.create(db, db)
                console.log("Database created")
                // creating collections
                await Promise.all([
                    createQuestionCollection(),
                    createAnswerCollection(),
                    createVoteCollection(),
                    createCommentCollection()
                ]);
                console.log("Collection created")
                console.log("Database connected")
            } catch (e) {
                console.error("Error creating database or collections", e);
                throw e;
            }
        } else {
            console.error("Error getting database:", error);
            throw error;
        }
    }

    return databases
}