const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Invalid input" });
        }

        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(411).json({ message: "Email already taken" });
        }

        const user = await User.create(req.body);
        const userId = user._id;

        await Account.create({ userId, balance: 1 + Math.random() * 10000 });

        const token = jwt.sign({ userId }, JWT_SECRET);
        res.json({ message: "User created successfully", token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.post("/signin", async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Invalid input" });
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            res.json({ token });
        } else {
            res.status(411).json({ message: "Error while logging in" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        const { success } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Invalid input" });
        }

        await User.updateOne({ _id: req.userId }, req.body);
        res.json({ message: "Updated successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } },
            ],
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            })),
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
