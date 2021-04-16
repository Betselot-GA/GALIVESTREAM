const express = require("express");
const router = express.Router();
const passport = require("passport");

//User model
const Post = require("../models/Post");

router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

//Register Handle
router.post("/admin", (req, res) => {
  const { title, presentedBy, description, video, resource } = req.body;
  let errors = [];

  // Ckeck required fields
  if (!title || !presentedBy || !description || !video || !resource) {
    errors.push({ msg: "Please fill all fields" });
  }

  const newPost = new Post({
    title:req.body.title,
    presentedBy:req.body.presentedBy,
    description:req.body.description,
    video:req.body.videoFile,
    resource:req.body.resourceFile,
  });
console.log("data saved successfully");
console.log(req.body);
  newPost.save()
  .then(user =>{
    req.flash("data saved successfully");

})
.catch(err => console.log(err));
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
