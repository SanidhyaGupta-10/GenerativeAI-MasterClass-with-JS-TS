import 'dotenv/config'
import OpenAI from "openai";

export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
});

export const conversation = await client.conversations.create({});
console.log(`🧵 Conversation ID: ${conversation.id}\n`);