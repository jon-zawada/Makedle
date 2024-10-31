DROP DATABASE IF EXISTS makedle;

CREATE DATABASE makedle;

\c makedle;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  users (username, email, hashed_password)
VALUES
  (
    'test-user',
    'test_user@example',
    'hashed_password_example'
  );