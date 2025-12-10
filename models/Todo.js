import mongoose, { mongo } from "mongoose";

const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: true },
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);