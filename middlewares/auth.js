import jwt from "jsonwebtoken";
import config from "config";

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    req.user = jwt.verify(token, config.get("MOVIEDLY_JWTPRIVATEKEY"));
    next();
  } catch (e) {
    return res.stat(400).send("Invalid token.");
  }
}

export default auth;
