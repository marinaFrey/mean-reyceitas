require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const recipes = require('./routes/recipes');
const app = express();
const cors = require('cors');
const passport = require("passport");


require("./config/google");
require("./config/passport");
require("./config/google");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());

const flash = require("express-flash");
const session = require("express-session");

app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use('/api/recipes', recipes);
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.get(
  "/auth/google", cors(),
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


app.get(
  "/auth/google/callback", cors(),
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  })
);
const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
  };
  
  app.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile.ejs", { user: req.user });
  });

  app.get("/auth/logout", (req, res) => {
    req.flash("success", "Successfully logged out");
    req.session.destroy(function () {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
db = 'mongodb://db:27017/reyceitas-mean'
mongoose.connect(
    db,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log(error);
    });

app.listen(9000, () => console.log('Server listening on port 9000'));