import mongoose from "mongoose";
console.log("MONGODB_URL:", process.env.MONGODB_URL);
const MONGODB_URL = process.env.MONGODB_URL;

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