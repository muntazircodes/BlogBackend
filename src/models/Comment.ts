import mongoose, { Schema, Document } from "mongoose";

// Define an interface for Comment model
export interface IComment extends Document {
  content: string;
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

// Define the schema
const CommentSchema: Schema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Mongoose model
export default mongoose.model<IComment>("Comment", CommentSchema);