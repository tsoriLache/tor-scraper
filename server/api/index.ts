import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;
import pasteRouter from './routers/pasteRouter';
import statsRouter from './routers/statsRouter';
import keywordsRouter from './routers/keywordsRouter';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('This is my web-scraper');
});

app.use('/paste', pasteRouter);
app.use('/stats', statsRouter);
app.use('/kw', keywordsRouter);

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
