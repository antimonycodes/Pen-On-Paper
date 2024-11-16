import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  console.log(req.body);

  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = await bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }

  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ message: "Email already in use" });
  //   }
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = new User({ username, email, password: hashedPassword });
  //   await user.save();
  //   res.status(201).json({ message: "User created successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to create user" });
  // } catch (error) {
  //   console.error("Signup error:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
};
