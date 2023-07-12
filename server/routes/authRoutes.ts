import express from 'express';
import { signup, login, logout } from '../controllers/authController';
import { Pool } from 'pg';

// Create an instance of express.Router()
const router = express.Router();

// authRoutes function - takes in pool parameter (PostgreSQL connection pool)
  router.post('/signup', signup, (req, res) => res.status(200).json({}));
  router.post('/login', login, (req, res) => res.status(200).json({}));
  router.post('/logout', logout,  (req, res) => res.status(200).json({}));

export default router;
