export const getResponse = (response) => {
  return response.output[0]?.content?.[0]?.text.toString() ?? '';
};
