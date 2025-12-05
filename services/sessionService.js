const sessions = {};

export function getSessionHistory(sessionId) {
  if (!sessions[sessionId]) {
    sessions[sessionId] = [];
  }
  return sessions[sessionId];
}

export function addToSession(sessionId, userMessage, assistantMessage) {
  const history = getSessionHistory(sessionId);
  history.push({ role: 'user', content: userMessage });
  history.push({ role: 'assistant', content: assistantMessage });
}
