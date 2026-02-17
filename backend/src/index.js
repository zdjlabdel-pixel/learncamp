import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import bootcampRoutes from './routes/bootcampRoutes.js';
import { env } from './config/env.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'learncamp-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api', bootcampRoutes);

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`LearnCamp API listening on port ${env.port}`);
});
