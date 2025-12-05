import { EDITOR_PROMPT, MASTER_PROMPT } from '../config/prompts.js';

import { runSimpleAgent } from './agents/simpleAgent.js';
import { runAgentWithTools } from './agents/toolAgent.js';
import { getSessionHistory, addToSession } from './sessionService.js';

export async function processChatMessage(message, sessionId) {
  const history = getSessionHistory(sessionId);

  const messages = [
    {
      role: 'system',
      content: `${MASTER_PROMPT}\n\n${EDITOR_PROMPT}`,
    },
    ...history,
    {
      role: 'user',
      content: message,
    },
  ];

  const draft = await runAgentWithTools(messages);

  addToSession(sessionId, message, draft);

  const output = await runSimpleAgent(
    EDITOR_PROMPT,
    history,
    `Вот черновик:\n\n${draft}\n\nПерепиши его`,
  );

  return output;
}
