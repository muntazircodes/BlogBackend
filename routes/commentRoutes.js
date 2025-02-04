const express = require("express");
const { body, validationResult } = require("express-validator");
const commentService = require("../services/commentServices");

const router = express.Router();

router.get(
    "/getComments", 
    async (req, res) => {
    try {
        const comments = await commentService.getComments();
        return res.status(200).json({comments});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

router.post(
    "/createComment",
    [
        body("content").not().isEmpty().withMessage("Content is required"),
        body("author").not().isEmpty().withMessage("Author is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {content, author} = req.body;

        try{
            const newComment = await commentService.createComment({content, author});
            return res.status(201).json({comment: newComment});
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }
);

router.put(
    "/updateComment/:id",
    async (req, res) => {
        try{
            const comment = await commentService.updateComment(req.params.id, req.body);
            return res.status(200).json({comment});
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }
);

router.delete(
    "/deleteComment/:id",
    async (req, res) => {
        try{
            const comment = await commentService.deleteComment(req.params.id);
            return res.status(200).json({comment});
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }
);