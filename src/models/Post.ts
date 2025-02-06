import mongoose, { Schema, Document } from "mongoose";

// Define the Post interface
export interface IPost extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    createdAt?: Date;
}

// Define the Mongoose Schema
const PostSchema = new Schema<IPost>({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

// Export the Post model
const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
