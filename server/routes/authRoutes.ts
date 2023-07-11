import express from 'express';
import { signup, login } from '../controllers/authController';
import { Pool } from 'pg';

// Create an instance of express.Router()
const router = express.Router();

// authRoutes function - takes in pool parameter (PostgreSQL connection pool)
const authRoutes = (pool: Pool) => {
  router.post('/signup', (req, res) => signup(req, res, pool));
  router.post('/login', (req, res) => login(req, res, pool));
  return router;
};

export default authRoutes;
