import mongoose from "mongoose";


const postsSchema = new mongoose.Schema({
    
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


export const Posts = mongoose.model("Posts", postsSchema);
