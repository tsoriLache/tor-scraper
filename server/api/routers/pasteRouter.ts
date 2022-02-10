import express from 'express';
import { pool } from '../db/config';
const router = express.Router();

router.get('/recent', (req, res) => {
  pool.query(
    'SELECT * FROM pastes order by date_utc desc limit 10',
    (err: any, data: any) => {
      if (err) console.log(err);
      else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

export default router;
