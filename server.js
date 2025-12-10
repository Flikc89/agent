import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';

import chatRoutes from './routes/chatRoutes.js';

const app = express();
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
