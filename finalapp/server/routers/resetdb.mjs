import express from 'express';
import fs from 'fs/promises';

export const resetdbRoutes = (db) => {
  const newsRouter = express.Router();
  
  newsRouter.get('/', async (req, res) => {
    try {
      const seedText = await fs.readFile('seed.json', { encoding: 'utf-8'});
      const seed = JSON.parse(seedText);
      db.data = seed;
      db.write();
      res.json({ message: 'ok!' });
    }
    catch(err) {
      res.json({ message: err.message });
    }
  });

  return newsRouter;
}
