import express from 'express';
import { Paste } from '../db/Model';

const router = express.Router();

router.get('/recent', async (req, res) => {
  try {
    const recentPastes = await Paste.findAll({
      limit: 20,
    });
    res.json(recentPastes);
  } catch (err) {
    console.log(err);
  }
});

export default router;
