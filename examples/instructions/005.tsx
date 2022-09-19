import { createReconciler } from "./reconciler";
import { Configuration, OpenAIApi } from "openai";

const Game = () => (
  <compose>
    <input type="text" name="story" />
    <model name="text-davinci-002">
      <task>Summarize the key elements of the story</task>
    </model>
    <model name="code-davinci-002">
      <task>Generate dungeon based on these elements</task>
      <result name="dungeon" />
    </model>
    <model name="text-davinci-002">
      <task>Write the enemy dialog</task>
      <result name="dialog" />
    </model>
  </compose>
);

const reconciler = createReconciler().render(<Game />);

const { dungeon, dialog } = await reconciler.send();

// an <input /> can be rendered by multiple components, language model decides which one the use, user can change it, and that data gets saved for model fine-tuning

// all LLM generated content will have input to express positive/negative feedback
// positive feedback is a bookmark feature for example
// negative feedback is a re-run feature maybe?

// complications: chatbot models also generate optional complications, which special components to render alongside with the normal text output
// eg. a chatbot model might generate a "did you mean" component, which is a list of options to choose from
// or a color picker component to choose from a list of colors when the question is "what color do you like to use?"