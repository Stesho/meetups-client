import express from 'express';
import fs from 'fs/promises';

export const resetdbRoutes = (db) => {
  const newsRouter = express.Router();
  
  newsRouter.get('/', async (req, res) => {
    try {
      await fs.copyFile('seed.json', 'db.json');
      res.json({ message: 'ok!' });
    }
    catch(err) {
      res.json({ message: err.message });
    }
  });

  return newsRouter;
}
