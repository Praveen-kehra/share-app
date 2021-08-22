
const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage.js');


const getPosts = async (req, res)=>{
    // res.send("this from posts.js file");
    try{
        const postMessages = await PostMessage.find();
        // console.log("inside post.js inside controllers file:",postMessages);
        res.status(200).json(postMessages);
    } catch(e){
        res.status(404).json(e);
    }
};

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(e){
        res.status(409).json(e);
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const {title, message, creator, selectedFile, tags} = req.body;
    // console.log("Post: ",post);
    // if(!post)
    //     return res.status(404).send(`No Post with that ${id}`)
    const p = await PostMessage.findById(_id);
    if(!p){
        return res.status(404).json(`No Post with that ${id}`);
    }
    const updatedPost = { creator, title, message, tags, selectedFile, _id: _id };
    await PostMessage.findByIdAndUpdate(_id, updatedPost, {new: true} );

    res.json(updatedPost);
    
}

const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    
    const p = await PostMessage.findById(_id);
    if(!p){
        return res.status(404).json(`No Post with that ${_id} (for delete api)`);
    }
    await PostMessage.findByIdAndRemove(_id);
    res.json({message: "Post deleted!!!"});
}

const likePost = async(req, res) => {
    const {id} = req.params;
    
    const post = await PostMessage.findById(id);
    if(!post){
        return res.status(404).json("Not found(in like api");
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount+1}, {new: true});

    res.json(updatedPost);
}

module.exports = {getPosts, createPost, updatePost, deletePost, likePost};