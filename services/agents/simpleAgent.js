import { AI_MODEL } from '../../config/models.js';
import { getResponse } from '../../utils/responseParser.js';
import client from '../openaiClient.js';

export async function runSimpleAgent(systemPrompt, history, userMessage, model = AI_MODEL) {
  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
    ...history,
    {
      role: 'user',
      content: userMessage,
    },
  ];

  const response = await client.responses.create({
    model,
    input: messages,
  });

  return getResponse(response);
}
