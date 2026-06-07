import { OpenAIChatCompletionsModel } from "@openai/agents";
import OpenAI from "openai";

const ollamaClient = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    apiKey: 'ollama', // Required by the SDK but ignored by Ollama
    dangerouslyAllowBrowser: true
});

// 2. Configure the model wrapper with the custom client
export const ollamaModel = new OpenAIChatCompletionsModel(
    ollamaClient, // 1st: The OpenAI client instance
    'llama3.1:latest'    // 2nd: The model name string
);
