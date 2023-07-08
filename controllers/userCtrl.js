import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserCtrl {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await User.findOne({ email });

            if (user) return res.status(400).json({ message: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 6);

            const newUser = await new User({ name, email, password: hashedPassword });
            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

            return res.status(201).json({ user: newUser, token });
        } catch (error) {
            res.status(500).json({ message: error });
            console.log('error', error);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "User doesnt exist!" });

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return res.status(400).json({ message: "Invalid password or email" });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            return res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ message: error });
            console.log('error', error);
        }
    }
}

export default new UserCtrl();