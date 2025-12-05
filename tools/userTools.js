import { USER_AGE, USER_NAME } from '../config/prompts.js';

export function getUserName() {
  return USER_NAME;
}

export function getUserAge() {
  return USER_AGE;
}

export const tools = [
  {
    type: 'function',
    name: 'getUserName',
    function: {
      name: 'getUserName',
      description: 'Возвращает мое полное имя (ФИО)',
      parameters: {
        type: 'string',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    name: 'getUserAge',
    function: {
      name: 'getUserAge',
      description: 'Возвращает мой возраст',
      parameters: {
        type: 'string',
        properties: {},
      },
    },
  },
];
