import express, { Request, Response } from 'express';
import pool from './db';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/test-db', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Database query error");
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
