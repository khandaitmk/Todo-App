import mongoose from "mongoose";
import { Schema } from "mongoose";
const sessionSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*60*24*7
    }
});

export default mongoose.model.Session || mongoose.model("Session",sessionSchema);