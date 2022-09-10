import { createReconciler, useQuestion } from './reconciler';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    }),
);

const reconciler = createReconciler({
    models: {
        'text-davinci-002': {
            desction: 'Most capable GPT-3 model.',
            capability: 'high',
        },
        'text-ada-001': {
            desction: 'Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.',
            capability: 'low',
        },
    },
    resolve: async (prompt, config) => {
        return await openai.createCompletion({
            model: config.model,
            prompt,
        });
    },
    answer: () => {
        return await cli.prompt("> ");

    }
});

const UIComponentChatbot = reconciler.render(<ChatBot />);

const ChatBot = () => {
    const type = useQuestion('What component type do you want me to create?', {
        initialValue: [],
        options: COMPOMENT_TYPES,
    });
    const platform = useQuestion('What platform does your app use?', {
        initialValue: null,
        options: ['Web', 'Mobile', 'Desktop'],
    });
    return (
        <model capability="high" temperature="0.8">
            <bot ask="Hello! What type of UI component do you want to make?" />
            <human />
            <answer
                onDefinitive={async () => {
                    await generatorService.post({
                        type,
                        platform,
                    });
                    history.push('/result');
                }}
            />
        </model>
    );
};

// for debugging
console.log('The chatbot prompt:', UIComponentChatbot.toString());

const { componentCode } = await UIComponentChatbot.listen({ port: 3000 });
// curl -X POST -H "Content-Type: application/json" -d '{"answer":"I want to make a blue button for my React Nativ app."}' http://localhost:3000/

fs.writeFile('./component.js', componentCode, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('The component code has been saved!');
});
