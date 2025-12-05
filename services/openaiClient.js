import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

export default client;
