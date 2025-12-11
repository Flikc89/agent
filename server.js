import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';

import chatRoutes from './routes/chatRoutes.js';

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true, // Разрешить все домены по умолчанию, или указать конкретный через .env
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
