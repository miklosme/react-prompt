import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

// export async function resolve(prompt: string, config) {
//   return await openai.createCompletion({
//     model: config.model,
//     prompt,
//   });
// }

export async function resolve({ prompt: string, model }) {
  // fake resolve
  return {
    type1: 'Those who believe that AI is a threat to humanity.',
    type2: 'Those who are not grifters.',
  };
}
