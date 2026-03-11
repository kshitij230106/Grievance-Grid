
const db = require("../config/db");
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

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, hashedPassword], (err, result) => {

    if (err) {
      console.log("REGISTER ERROR:", err);
      return res.status(500).json({ error: err });
    }

    res.json({
      message: "User registered successfully"
    });

  });

};


// LOGIN USER
exports.loginUser = async (req, res) => {

  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users WHERE email = ?
  `;

  db.query(sql, [email], async (err, results) => {

    if (err) {
      console.log("REGISTER ERROR:", err);
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

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

  });

};