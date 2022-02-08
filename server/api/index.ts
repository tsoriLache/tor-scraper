const PORT = 5000;

import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());

app.get('/',(req, res)=>{        
    res.json('This is my web-scraper');
})

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
  });