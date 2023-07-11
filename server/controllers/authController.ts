import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
require('dotenv').config();

// Controller function for user signup
export const signup = async (req: Request, res: Response, pool: any) => {
  try {
    const { username, password } = req.body;
    console.log('file: authController.ts:13 | signup | password:', password);
    console.log('file: authController.ts:13 | signup | username:', username);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in database
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    // Values to be substituted in query
    const values = [username, hashedPassword];
    // Execute query using database connection pool
    await pool.query(query, values);

    // Send success response
    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup failed:', error);
    // Send error response
    res.status(500).json({ error: 'Failed to signup' });
  }
};

// Controller function for user login
export const login = async (req: Request, res: Response, pool: any) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from database
    const query = 'SELECT * FROM users WHERE username = $1';
    // Values to be substituted in query
    const values = [username];
    // Execute query using database connection pool and await the result
    const result = await pool.query(query, values);

    // Check if user exists
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Extract user object from query result
    const user = result.rows[0];

    // Compare password hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, `${process.env.SECRET_KEY}`);

    // Send token as a response
    res.json({ token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
