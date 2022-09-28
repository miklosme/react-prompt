import React from 'react';
import * as ReactPrompt from '../../src/reconciler';
import * as OpenAI from '../_resolvers/openai';
import { style } from 'bun-style';
import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import inquirer from 'inquirer';
import { useQuery } from '@tanstack/react-query';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });

const articleWriter = ReactPrompt.createReconciler({
  models: {
    'text-davinci-002': {
      description: 'Most capable GPT-3 model.',
      capability: 'high',
    },
    'text-ada-001': {
      description: 'Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.',
      capability: 'low',
    },
  },
  resolve: OpenAI.resolve,
});

const Model = ({ config }) => {
  const task = useQueryTask(config);
  const glossary = useQueryGlossary(config);
  const examples = useQueryExamples(config);
  const ideas = useQueryIdeas(config);
  return (
    <model capability="high" temperature={0.8}>
      <instruction label="Task">{task}</instruction>
      <list label="Glossary">{glossary}</list>
      <examples>{examples}</examples>
      <list label="Fragments">{ideas}</list>
      <output label="Article" />
    </model>
  );
};

const config = await getConfig();

await articleWriter.render(<Model config={config} />);

console.log('The article prompt:', articleWriter.toString());

const { title, article } = await articleWriter.send();

console.log('Title:', style(title, ['green']));
console.log('Article:', article);

// =======
// utils.js
// =======

async function getConfig() {
  const configQuestions = [
    {
      type: 'list',
      name: 'question',
      message: 'Which question?',
      choices: [
        'What do you make?',
        'Previous batch',
        'How far?',
        'How long?',
        'Competitors?',
        'Monetization?',
        'Why this idea?',
        'Other idea',
        'Surprising',
      ].map((x) => ({ name: x, value: x })),
    },
    {
      type: 'list',
      name: 'status',
      message: 'Which status?',
      choices: ['1️⃣-Final', '2️⃣-Rewrite', '3️⃣-Experimental'].map((x) => ({ name: x, value: x })),
    },
    {
      type: 'list',
      name: 'model',
      message: 'Which model to use?',
      choices: [
        { name: 'text-davinci-002: Most capable GPT-3 model.', value: 'text-davinci-002' },
        {
          name: 'text-curie-001: Very capable, but faster and lower cost than Davinci.',
          value: 'text-curie-001',
        },
        {
          name: 'text-babbage-001: Capable of straightforward tasks, very fast, and lower cost.',
          value: 'text-babbage-001',
        },
        {
          name: 'text-ada-001: Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.',
          value: 'text-ada-001',
        },
      ],
    },
  ];

  return await inquirer.prompt(configQuestions);
}
