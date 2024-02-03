import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    
    photos: {
        type: [String],
    },

    description: {
        type: String,
    },

    comments: {
        type: [String],
    },

    reacts : {
        type : [String],
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});


export const Post = mongoose.model("Post", postSchema);
