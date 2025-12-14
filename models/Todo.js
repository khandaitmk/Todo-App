import mongoose from "mongoose";
import { Schema } from "mongoose";

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: true },
  userId: {
    type:Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model.Todo || mongoose.model("Todo", TodoSchema);
