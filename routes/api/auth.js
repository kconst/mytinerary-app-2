const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("../../middleware/auth")
require('dotenv').config()

// POST /api/auth - Authenticate user
router.post("/", (req, res) => {
    const { username, password } = req.body;

    //Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    //Check for existing user
    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User does not exist." });
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })

                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    country: user.country,
                                    favourites: user.favourites,
                                    userImage: user.userImage
                                }
                            })
                        }
                    )
                })
        })
})


// GET /api/auth/user - get user data
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then(user => res.json(user))
})



// SOCIAL LOGIN

router.post("/social", (req, res) => {
    const { username, email, first_name, last_name, googleId, googleImage } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                const { username, password } = req.body;
                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            token,
                            user: {
                                _id: user.id,
                                username: user.username,
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                googleId: user.googleId,
                                googleImage: user.googleImage,
                                favourites: user.favourites
                            }
                        })
                    }
                )
            }
            else {
                const newUser = new User({
                    username,
                    email,
                    first_name,
                    last_name,
                    googleId,
                    googleImage
                });
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        _id: user.id,
                                        username: user.username,
                                        email: user.email,
                                        first_name: user.first_name,
                                        last_name: user.last_name,
                                        googleId: user.googleId,
                                        googleImage: user.googleImage
                                    }
                                })
                            }
                        )
                    })
            }

        })
})

module.exports = router