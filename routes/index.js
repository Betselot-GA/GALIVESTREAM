const express = require("express");
const adminRouter = require("../routes/admin")
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth"); 
// const getVideo = require('../controllers/post-controller');
const Post = require("../models/Post")

//Welcome Page
router.get("/",(req,res)=> res.render("Welcome"))

//Dashboard
router.get("/index",ensureAuthenticated,(req,res)=>{
Post.find({}, function(err, posts){
    res.render("home", {
    name:req.user.name,
    posts:posts

    });
    console.log(posts[0]);
})
});



router.get("/admin",ensureAuthenticated,(req,res)=>{
    res.render("admin")
})
router.post("/admin",ensureAuthenticated,adminRouter)

module.exports = router;