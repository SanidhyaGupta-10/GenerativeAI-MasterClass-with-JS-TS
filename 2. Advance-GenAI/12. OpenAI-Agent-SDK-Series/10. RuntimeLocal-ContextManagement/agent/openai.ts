import { OpenAIChatCompletionsModel } from '@openai/agents';
import 'dotenv/config'
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const groqModel = new OpenAIChatCompletionsModel(
    client,
    'openai/gpt-oss-120b'
)