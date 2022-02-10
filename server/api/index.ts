const PORT = 5000;

import express from 'express';
const app = express();
import cors from 'cors';
import { pool } from './db/config';
app.use(cors());

app.get('/', (req, res) => {
  res.json('This is my web-scraper');
});

app.get('/recent', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
