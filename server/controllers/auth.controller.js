import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
export const signin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log("Signup Request Body:", req.body);

    // Check if either username/email and password are provided
    if ((!username && !email) || !password) {
      return next(
        errorHandler(400, "Please provide email/username and password")
      );
    }

    // Create query based on provided credentials
    const query = {};
    if (email) {
      query.email = email.toLowerCase();
    }
    if (username) {
      query.username = username.toLowerCase();
    }

    // Find user with either username or email
    const validUser = await User.findOne({
      $or: [
        { email: email?.toLowerCase() },
        { username: username?.toLowerCase() },
      ],
    });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
    }

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Remove password from response
    const { password: pass, ...userWithoutPassword } = validUser._doc;

    // Send response
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(userWithoutPassword);
  } catch (error) {
    console.error("Signin error:", error);
    return next(error);
  }
};
// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password || password === "" || password === "") {
//     // return res.status(400).json({ message: "Email and password are required" });
//     next(errorHandler(400, "All fields are required"));
//   }
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) {
//       next(errorHandler(404, "User not found"));
//     }
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) {
//       next(errorHandler(404, "Invalid Password"));
//     }
//     const token = jwt.sign({ id: validUser._id }, process.env, JWT_SECRET);
//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(validUser);
//   } catch (error) {
//     next(error);
//   }
// };

//

// export const signin = async (req, res, next) => {
//   const { username, email, password } = req.body;

//   // Check if either username or email is provided along with password
//   if ((!username && !email) || !password || password === "") {
//     return next(
//       errorHandler(400, "Please provide email/username and password")
//     );
//   }

//   try {
//     // Find user by either email or username depending on what was provided
//     const validUser = await User.findOne(
//       username
//         ? { username: username.toLowerCase() }
//         : { email: email.toLowerCase() }
//     );

//     if (!validUser) {
//       return next(errorHandler(404, "User not found"));
//     }

//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) {
//       return next(errorHandler(401, "Invalid password"));
//     }

//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

//     // Remove password from response
//     const { password: pass, ...userWithoutPassword } = validUser._doc;

//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(userWithoutPassword);
//   } catch (error) {
//     return next(error);
//   }
// };
