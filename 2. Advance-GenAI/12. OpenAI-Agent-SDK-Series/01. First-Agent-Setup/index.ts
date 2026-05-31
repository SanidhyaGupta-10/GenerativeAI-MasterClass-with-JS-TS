// console.log("Setting-up Our First Agent with OpenAI-SDK in TypeScript");

import OpenAI from "openai"
import "dotenv/config";
import {
    OpenAIChatCompletionsModel, run, Agent
} from '@openai/agents'


// 1. Initialize OpenAI client to point to your local Ollama instance
const ollamaClient = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    apiKey: 'ollama', // Required by the SDK but ignored by Ollama
    dangerouslyAllowBrowser: true
});


// 2. Configure the model wrapper with the custom client
const ollamaModel = new OpenAIChatCompletionsModel(
    ollamaClient, // 1st: The OpenAI client instance
    'llama3.2:latest'    // 2nd: The model name string
);

