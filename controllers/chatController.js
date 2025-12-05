import { processChatMessage } from '../services/aiService.js';

export async function handleChat(req, res) {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: "Field 'message' must be non-empty string" });
    }

    const output = await processChatMessage(message, sessionId);

    res.json({ reply: output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
