const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
var fetchRouter = require("./routes/index");

const app = express();

//Passport config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").MongoURI;

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayout);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

app.use(express.static("public"));
//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const PORT = process.env.PORT || 3000;

//Router
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/livestream", fetchRouter);

app.listen(PORT, console.log(`app started running on ${PORT}`));
