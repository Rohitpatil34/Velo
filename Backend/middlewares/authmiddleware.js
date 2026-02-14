import jwt from "jsonwebtoken"
import User from "../model/Usermodel.js"
import process from "process"

const authMiddleware = async (req, res, next) => {
  try {
    let token

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user to request (exclude password)
    req.user = await User.findById(decoded.id).select("-password")

    if (!req.user) {
      return res.status(401).json({ message: "User not found" })
    }

    next()
  } catch (error) {
    console.error("Auth Middleware Error:", error)
    return res.status(401).json({ message: "Not authorized, token invalid" })
  }
}

export default authMiddleware
