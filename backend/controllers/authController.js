const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Temporary users array (until database is added)
let users = [
{
id: 1,
name: "Admin",
email: "test@gmail.com",
password: "$2b$10$QqjK7F2Yq1mV2vL0k9nH8uPqP1GkXz1eYz7pT4dX3a5yJmFvE0x6C" 
}
];

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      role: "user"
    };

    users.push(newUser);

    res.json({
      message: "User registered successfully",
      user: { name, email }
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};


// LOGIN USER
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};