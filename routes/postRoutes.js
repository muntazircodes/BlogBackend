const express = require("express");
const {body, validationResult} = require("express-validator");
const postService = require("../services/postServices");

const router = express.Router();

router.get("/getPosts", async(req, res)=>{
    try{
        const posts = await postService.getPosts();
        return res.status(200).json({posts});
    }catch(error){
        return res.status(500).json({error: error.message});
    }

});

router.post(
    "/createPost",
[
    body("title").not().isEmpty().withMessage("Title is required"),
    body("content").not().isEmpty().withMessage("Content is required"),
    body("author").not().isEmpty().withMessage("Author is required"),

],
async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {title, content} = req.body;

    try{
        const newPost = await postService.createPost({title, content});
        return res.status(201).json({post: newPost});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

