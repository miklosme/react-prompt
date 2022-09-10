import { createReconciler } from './reconciler';
// import { Client } from '@notionhq/client';
import { Configuration, OpenAIApi } from 'openai';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    }),
);

const queryClient = new QueryClient();

function useTasks() {
    return useQuery(['tasks'], async () => {
        const result = await notion.databases.retrieve({
            database_id: DB.KANBAN,
        });

        return result.description.map(x => x.plain_text).join('');
    });
}

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
});

const articleWriter = reconciler.render(<App />);

const App = () => {
    const tasks = useTasks();

    return (
        <>
            <model capability="high" temperature="0.8">
                <task>
                    Write me a very well-written article using the following fragments. Try to be concise, and remove
                    parts that don't add much. You can add any amount of new words, but don't change the meaning.
                    Fragments can be merged to one if they are overlapping each other. Feel free to rearrange the
                    fragments if necessary.
                </task>
                <inputs>
                    {tasks.map(task => (
                        <input>{task}</input>
                    ))}
                </inputs>
                <answer name="article" />
            </model>
            <model capability="low" temperature="0.8">
                <task>Write an article title.</task>
                <inputs fromAnswer="article" />
                <answer name="title" />
            </model>
        </>
    );
};

console.log('The article prompt:', articleWriter.toString());

const { title, article } = await articleWriter.send();

console.log('The full article:', title, article);
