import jwt from "jsonwebtoken";
import process from "process";

const authOptional = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
  } catch (err) {
    // ignore invalid token, continue as guest
  }

  next();
};

export default authOptional;
