import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authToken = (req, res, next) => {
  let token = req.header("Authorization")?.split(" ")[1];
  if (!token) 
    return res.status(401).send({ success: false, message: "Invalid token" });

  // Replace ACCESS_TOKEN with your actual JWT secret key
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err)
      return res.status(403).send({ success: false, message: "Invalid token" });

    // Use res.status(200) to send a success response and include the user data
    res.status(200).send({ success: true, message: "Token is valid", user });

    // Call next() here to continue request processing
    next();
  });
};
