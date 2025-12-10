import mongoose from "mongoose";
const MONGODB_URL = "mongodb://127.0.0.1:27017/todo-app";

if(!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined ");
}

export const connectDB = async () => {
    try{
        const ab = await mongoose.connect(MONGODB_URL);
        // console.log("connected to DB ",ab);
    } catch(error) {
        console.log("error in connecting to DB :", error);
    }
};