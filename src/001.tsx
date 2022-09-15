import React from 'react';
import ReactPrompt from './reconciler';
import * as OpenAI from './resolvers/openai';
import { style } from 'bun-style';

const prompt = ReactPrompt.createReconciler({
  models: {
    'text-davinci-002': {
      description: 'Most capable GPT-3 model.',
      capability: 'high',
    },
    'text-ada-001': {
      description:
        'Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.',
      capability: 'low',
    },
  },
  resolve: OpenAI.resolve,
});

prompt.render(
  <model capability="high" temperature={0.8}>
    <question>There are two types of AI researchers.</question>
    <template>
      1. <answer name="type1" />
      2. <answer name="type2" />
    </template>
  </model>,
);

console.log('The prompt:', prompt.toString());

const { type1, type2 } = await prompt.send<{ type1: string, type2: string }>();

console.log('The two types of AI researchers:');
console.log('1.', style(type1, ['green']));
console.log('2.', style(type2, ['green']));
