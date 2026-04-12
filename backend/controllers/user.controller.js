import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'



const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" } 
    );
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const normalizedEmail = email.toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = createToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        const normalizedEmail = email.toLowerCase();

        const exist = await User.findOne({ email: normalizedEmail });

        if (exist) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: "Enter invalid email"
            });
        }

        if (password.length<8) {
             return res.status(400).json({
             message: "Password must be strong",
             });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email:normalizedEmail,
            password: hashPassword 
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log("Error registering user:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// Admin Login
const adminlogin = async (req, res) => {

}


export { login,
         register,
         adminlogin
}