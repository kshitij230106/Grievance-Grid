const db = require("../config/db");

// Create grievance
exports.createGrievance = (req, res) => {

  const { title, description, location } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({
      message: "Title, description and location required"
    });
  }

  const sql = `
    INSERT INTO grievances 
    (user_id, title, description, location, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    req.user.id,
    title,
    description,
    location,
    "pending",
    new Date()
  ];

  db.query(sql, values, (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Grievance submitted successfully",
      grievanceId: result.insertId
    });

  });

};

// Get logged-in user's grievances
exports.getMyGrievances = (req, res) => {

  const sql = `
    SELECT * FROM grievances
    WHERE user_id = ?
  `;

  db.query(sql, [req.user.id], (err, results) => {

    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json(results);

  });

};

// Admin: Get all grievances
exports.getAllGrievances = (req, res) => {

  const sql = `SELECT * FROM grievances`;

  db.query(sql, (err, results) => {

    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json(results);

  });

};