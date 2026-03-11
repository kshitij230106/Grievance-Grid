-- Create database
CREATE DATABASE IF NOT EXISTS grievance_grid;

-- Use database
USE grievance_grid;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user'
);

-- Grievances table
CREATE TABLE IF NOT EXISTS grievances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);