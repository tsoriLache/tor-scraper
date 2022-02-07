const PORT = 5000;
import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());

app.get('/ping',(req, res)=>{  
    console.log('p');
      
    res.json('pong')
})

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
  });