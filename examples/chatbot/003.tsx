import { createReconciler } from './reconciler';
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
            description: 'Most capable GPT-3 model.',
            capability: 'high',
        },
        'text-ada-001': {
            description: 'Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.',
            capability: 'low',
        },
    },
    resolve: async (prompt, config) => {
        return await openai.createCompletion({
            model: config.model,
            prompt,
        });
    },
});

const UIComponentChatbot = reconciler.render(<ChatBot />);

const ChatBot = () => {
    const [types, setTypes] = useState([]);
    const [platform, setPlatform] = useState(null);
    return (
        <model capability="high" temperature="0.8">
            <bot>
                <ask>Hello! What type of UI component do you want to make?</ask>
                <question>What platform do you want to use?</question>
                <question>What kind of UI component do you want to make?</question>
                <final>Perfect! I will create a UI component for you, give me a sec...</final>
            </bot>
            <human>
                <category>type</category>
                {COMPOMENT_TYPES.map(type => (
                    <option>{type}</option>
                ))}

                <category>platform</category>
                <option>Web</option>
                <option>Mobile</option>
                <option>Desktop</option>

                <category>color</categroy>
                <option>primary</option>
                <option>secondary</option>
            </human>
            <answer
                onEntityFound={({ category, entity }) => {
                    if (category === 'type') {
                        setTypes(types => [...types, entity]);
                    } else if (category === 'platform') {
                        setPlatform(entity);
                    }
                }}
                onDefinitive="send"
            />
        </model>
    );
};

// for debugging
console.log('The chatbot prompt:', UIComponentChatbot.toString());

const { componentCode } = await UIComponentChatbot.listen({ port: 3000});
// curl -X POST -H "Content-Type: application/json" -d '{"answer":"I want to make a blue button for my React Nativ app."}' http://localhost:3000/

fs.writeFile('./component.js', componentCode, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('The component code has been saved!');
});
