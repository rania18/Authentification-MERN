const Post = require('../models/postSchema.js');


const createPost = async (req,res) => {
    try {
        const { description, title } = req.body;
        const newPost = await Post.create({ title, description, owner:req.userId });
        res.json(newPost);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


module.exports  = { createPost };