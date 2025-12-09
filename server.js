import 'dotenv/config';
import express from 'express';

import chatRoutes from './routes/chatRoutes.js';

const app = express();
app.use(express.json());
app.use('/chat', chatRoutes);

app.listen(4000, () => {
  console.log('Server started on http://localhost:3000');
});
