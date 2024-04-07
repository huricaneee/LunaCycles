if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const Period = require('./models/Period');
const mongoose = require("mongoose");
const cors = require("cors")

initializePassport(passport, async (email) => {
    return User.findOne({email: email});
});

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connection established successfully"))
    .catch((error) => console.error("Failed to connect MongoDB:", error.message));

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.get('/', checkAuthenticated, function (req, res) {
    res.json({user: req.user});
});

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
});

app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: "http://localhost:3000", // URL of the React application
        failureRedirect: "/login",
        failureFlash: true,
    })
);

app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        res.redirect("/login");
    } catch {
        res.redirect("/register");
    }
});

app.post('/period', (req, res) => {
    const {user, startDate, endDate} = req.body;

    console.log('startDate :', startDate, 'endDate:', endDate);

    const period = new Period({
        user,
        startDate,
        endDate,
    });

    period.save()
        .then(() => res.status(200).json({message: 'Period data received and stored.'}))
        .catch((err) => res.status(500).json({message: `Error storing period data: ${err.message}`}));
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            // handle error case
        }
        res.redirect("/login");
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});