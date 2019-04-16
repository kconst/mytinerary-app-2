const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const auth = require("../../middleware/auth")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "png") {
        cb(null, true)
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})



// POST /api/users - Register new user
router.post("/", upload.single("userImage"), (req, res) => {
    const { username, email, password, first_name, last_name, country } = req.body;

    //Simple validation
    if (!username || !email || !password || !first_name || !last_name || !country) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    const userImage = req.file.path

    //Check for existing user

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exists." });

            const newUser = new User({
                username,
                email,
                password,
                first_name,
                last_name,
                country,
                userImage
            });

            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
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
                                            id: user.id,
                                            username: user.username,
                                            email: user.email,
                                            first_name: user.first_name,
                                            last_name: user.last_name,
                                            country: user.country
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
})


// UPDATE USER /api/users/:userId
router.put("/:userId", (req, res) => {
    const updatedUser = {
        username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country,
    }
    User.findOneAndUpdate({ _id: req.params.userId }, updatedUser)
        .then(user => res.json({ success: true }))
        .catch(() => res.status(404).json({ success: false }))
})

module.exports = router