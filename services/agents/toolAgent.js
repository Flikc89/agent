import { AI_MODEL } from '../../config/models.js';
import { getUserName, getUserAge, tools } from '../../tools/userTools.js';
import { getResponse } from '../../utils/responseParser.js';
import client from '../openaiClient.js';

export async function runAgentWithTools(messages) {
  const response = await client.responses.create({
    model: AI_MODEL,
    input: messages,
    tools,
    tool_choice: 'auto',
  });

  const toolCall = response.output.find((item) => item.type === 'function_call');

  let finalOutput;

  if (!toolCall) {
    finalOutput = getResponse(response);
  } else {
    const { name, arguments: rawArgs, call_id } = toolCall;

    let toolResult = null;

    if (name) {
      const args = rawArgs ? JSON.parse(rawArgs) : {};
      switch (name) {
        case 'getUserName':
          toolResult = getUserName(args);
          break;
        case 'getUserAge':
          toolResult = getUserAge(args);
          break;
        default:
          toolResult = { error: `Unknown tool: ${name}` };
      }
    }

    messages.push(toolCall);

    messages.push({
      type: 'function_call_output',
      call_id,
      output: JSON.stringify(toolResult),
    });

    const finalResponse = await client.responses.create({
      model: AI_MODEL,
      input: messages,
    });

    finalOutput = getResponse(finalResponse);
  }

  return finalOutput;
}
