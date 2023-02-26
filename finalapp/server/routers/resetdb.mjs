import express from 'express';
import fs from 'fs/promises';

export const resetdbRoutes = (db) => {
  const newsRouter = express.Router();
  
  newsRouter.get('/', async (req, res) => {
    try {
      const data = await fs.readFile('seed.json', { encoding: 'utf8' });
      await fs.writeFile('testdb.json', data);
      // fs.copyFile()
      res.json({ message: 'ok!' });
    }
    catch(err) {
      res.json({ message: err.message });
    }
  });

  return newsRouter;
}
