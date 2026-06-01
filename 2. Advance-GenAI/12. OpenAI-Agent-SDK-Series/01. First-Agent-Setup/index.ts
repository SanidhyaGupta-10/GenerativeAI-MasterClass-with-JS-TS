// console.log("Setting-up Our First Agent with OpenAI-SDK in TypeScript");
import "dotenv/config";
import {
    OpenAIChatCompletionsModel, run, Agent, setTracingDisabled
} from '@openai/agents';
import OpenAI from "openai";

// This is will need if you are using ollama because 
setTracingDisabled(true)

const ollamaClient = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    apiKey: 'ollama', // Required by the SDK but ignored by Ollama
    dangerouslyAllowBrowser: true
});

// 2. Configure the model wrapper with the custom client
const ollamaModel = new OpenAIChatCompletionsModel(
    ollamaClient, // 1st: The OpenAI client instance
    'qwen2.5:1.5b'    // 2nd: The model name string
);

const firstAgent = new Agent({
    model: ollamaModel,
    name: "Agent",
    instructions: "You are very Helpful agent that response and resolve the user queries"
})

async function main() {
    const result = await run(firstAgent, "Which is best Rust vs Go ?  which one to choose?");
    console.log(result.finalOutput);
}

main();