const dbConnection = require("../config/dbConfig");
// dbConnection => mysql database connection (used to run sql quieries like select , insert)
const bcrypt = require("bcrypt");
// hashed password securely and Prevents storing plain-text passwords in the database

const { StatusCodes } = require("http-status-codes");
// Gives readable HTTP status codes forex. For OK its 200, for BAD_REQUEST  400, for Unauthorised its 401, etc.)

const jwt = require("jsonwebtoken");
//  used to create digital id card (token) for authentication

// 1. REGISTER FUNCTION
// handles new user Registration begins
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  // getting data from req.body meaning user input sent from frontend.

  //  if any feild is missing from below return error
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide all required fields ",
    });
  }

  // 1.1 email validation
  // simple email validation Checks if email looks like: user@example.com if invalid return status code 400
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid email format" });
  }

  // 1.2 password length validation
  // For security purpose Enforces minimum password standard must be at least 8 character

  if (password.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Password must be at least 8 characters" });
  }
  // Enforces minimum security standard Password must be at least 8 characters
  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users Where username = ? OR email = ?",
      [username, email]
    );
    // Prevents duplicate usernames or emails
    // If found → returns:

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: " already Users registered" });
    }

    if (password.length < 8) {
      // Standard is usually < 8
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      `INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`,
      [username, firstname, lastname, email, hashedPassword]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "User registered" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email =? ",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }

    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign(
      { username, userid },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token, username });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

async function checkUser(req, res) {
  // This expects the 'authMiddleware' to have already run and attached user info to req.user
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid });
}

module.exports = { register, login, checkUser };
