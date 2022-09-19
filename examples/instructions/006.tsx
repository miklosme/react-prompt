import { createReconciler } from "./reconciler";
import { Configuration, OpenAIApi } from "openai";

const DocumentTransformer = () => (
  <model name="text-davinci-002">
    <instructions>
      <task>Write a document summarizing the key elements of the story</task>
      <task>Create an illustration to all the key elements of the story</task>
      <task>
        Create a new presentation deck based on the story, every slide is an
        image with descriptive text
      </task>
    </instructions>
  </model>
);

const reconciler = createReconciler().render(<DocumentTransformer />);

const { dungeon, dialog } = await reconciler.send();
