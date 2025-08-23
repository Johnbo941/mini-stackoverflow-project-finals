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
    } catch (error) {
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
        } catch (error) {
            console.error("Error creating database or collections", error);
        }
    }

    return databases
}