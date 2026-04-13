import jwt from "jsonwebtoken";

// Generate Access Token
function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    }
  );
}

// Generate Refresh Token
function generateRefreshToken(user) {
  return jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );
}

// Set Refresh Token in Cookie
export function setRefreshTokenCookie(res, refreshToken) {
  res.cookie("jwt_refresh", refreshToken, {
    httpOnly: true, // React/JavaScript cannot read this (Prevents XSS)
    secure: process.env.NODE_ENV === "production", // Must be true in production (HTTPS)
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days in milliseconds
  });
}

// Clear Refresh Token Cookie
export function clearRefreshTokenCookie(res) {
  res.cookie("jwt_refresh", "", {
    httpOnly: true,
    expires: new Date(0), // Instantly expire the cookie
  });
}

export { generateAccessToken, generateRefreshToken };