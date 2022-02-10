import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;
import pasteRouter from './routers/pasteRouter';
import statsRouter from './routers/statsRouter';

app.use(cors());

app.get('/', (req, res) => {
  res.json('This is my web-scraper');
});

app.use('/paste', pasteRouter);
app.use('/stats', statsRouter);

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
