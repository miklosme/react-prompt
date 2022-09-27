import inquirer from 'inquirer';
// import { promises as fs } from 'fs';
import path from 'path';
import { globby } from 'globby';

const paths = await globby(['examples/**/*.{ts,tsx,js,jsx}', '!**/_*/**']); // exclude folders with _ prefix

const options = paths
  .map((p) => ({
    value: p,
    name: path.basename(p),
    dir: path.dirname(p).replace(/^examples\//, ''),
  }))
  .reduce((acc, { value, name, dir }) => {
    if (!acc[dir]) {
      acc[dir] = [];
    }
    acc[dir].push({ value, name });
    return acc;
  }, {});

const prompt = inquirer.createPromptModule({ output: process.stderr });
// const prompt = inquirer.prompt;

prompt([
    {
      type: 'list',
      name: 'example',
      message: 'Which example do you want to run?',
      choices: Object.entries(options).flatMap(([dir, choices]) => [new inquirer.Separator(dir), ...choices]),
    },
  ])
  .then((answers) => {
    console.log(answers.example);
    process.exit(0);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }

    throw error;
  });
