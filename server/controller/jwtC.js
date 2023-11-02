import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authToken = (req, res, next) => {
  let token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).send({ success: false, message: "Invalid token" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err)
      return res.status(403).send({ success: false, message: "Invalid token" });

    res.status(200).send({ success: true, message: "Token is valid", user });

    next();
  });
};
