import express from 'express';
import { pool } from '../db/config';
const router = express.Router();

router.get('/', (req, res) => {
  res.json('stats');
});

export default router;
