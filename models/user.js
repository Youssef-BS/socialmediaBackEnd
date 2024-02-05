import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
  username: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true,
      minlength: [8, "Password must be 8 characters long"]
  },
  avatar: {
      type: String,
  },
  
  listInvitations : {
    type : [String],
  },

  friends: {
      type: [String],
  },

  posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
  }]
});


export const User = mongoose.model("User", userSchema);
