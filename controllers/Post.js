import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

//add post to user list
export const addPost = async (req, res) => {
    const { description } = req.body;

    try {
        const userId = req.params.id; 
        const post = new Post({
            description,
            user: userId, 
        });

        const savedPost = await post.save();
        await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });
        res.status(201).json(savedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get all posts just an user
export const getPostUser = async (req , res)=>{
    
    const userId = req.params.id;
    try{    

        const user = await User.findByIdAndUpdate(userId).populate('posts');
        if(!user)
        res.status(404).json({message: "User not found"});

        const userPosts = user.posts ; 
        res.status(200).json({user , userPosts});

    }catch(error){
        res.status(500).json({ message: error.message });
    }
} ;

//delete user posts
export const deletePost = async (req , res)=>{
    const userId = req.params.id;
    const postId = req.params.postId;

    try {
    const post = await Post.findById(postId);
    if(!post) 
      res.status(404).json({message: "Post not found"});

    await User.findByIdAndUpdate(userId , {$pull : {posts: postId}});
    await Post.findByIdAndDelete(postId);
    res.status(200).json({message:"Post deleted successfully"});

    }catch(error){
        res.status(500).json({ message: error.message });
    }
} ;


//edit post for an user
export const editPost = async (req , res)=>{
    const {description} = req.body ; 
    const postId = req.params.postId;
    const userId = req.params.id;

    try{
    
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    
    if(!post)
    res.status(404).json({message: "Post not found"});
    if(!user)
    res.status(404).json({message: "User not found"});

    if(!user.posts.includes(postId.toString()))
        res.status(404).json({message : "user don't have this post"});

    const postUpdated = await Post.findByIdAndUpdate(postId, 
        {description} ,
        {new : true}
    );

    res.status(200).json(postUpdated);

    }catch(error){
        res.status(500).json({message:error.message});
    }
} ; 


export const getAllPostsByHisUser = async (req, res) => {
    try {
        const usersWithPosts = [] ;
        const users = await User.find();

        for (const user of users) {
            const populatedUser = await User.findById(user._id).populate("posts");
            const { username, posts } = populatedUser;
            usersWithPosts.push({ username, posts });
        }
        res.status(200).json(usersWithPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};