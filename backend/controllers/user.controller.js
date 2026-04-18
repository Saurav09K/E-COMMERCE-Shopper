import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { clearRefreshTokenCookie,setRefreshTokenCookie } from '../utils/tokenService.js'; 
import { generateAccessToken, generateRefreshToken } from '../utils/tokenService.js';

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

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        setRefreshTokenCookie(res, refreshToken);

        // Send the Access Token and user data back in the JSON response
        return res.status(200).json({
            message: "Login successful",
            accessToken, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
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
                role: user.role,
            },
        });

    } catch (error) {
        console.log("Error registering user:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        if (user.role !== 'admin') {
            return res.json({ success: false, message: "Access Denied. Bosses only." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log("Admin login error:", error);
        res.json({ success: false, message: error.message });
    }
};





// Generate New Access Token 
const refreshToken = async (req, res) => {
    try {
        // Grab the secure cookie that cookie-parser just found for us
        const token = req.cookies.jwt_refresh; 

        if (!token) {
            return res.status(401).json({ message: "Not logged in" });
        }

        // Verify it hasn't been tampered with and hasn't expired (7 days)
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        // If valid, generate a brand new 15-minute Access Token
        const newAccessToken = generateAccessToken(decoded.id);

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        console.log("Refresh token error:", error);
        return res.status(403).json({ message: "Session expired. Please log in again." });
    }
};

//  Logout 
const logout = async (req, res) => {
    try {
        // Destroy the HttpOnly cookie
        clearRefreshTokenCookie(res);
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out" });
    }
};


export { login, register, adminlogin, refreshToken, logout };



