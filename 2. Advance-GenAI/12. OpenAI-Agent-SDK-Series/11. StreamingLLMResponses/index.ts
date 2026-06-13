import { run, Agent } from "@openai/agents";
import { groqModel } from '../04. Multi-agentSystem/agent/groq';

const StoryAgent = new Agent({
    name: "Story_Agent",
    instructions: `You are a expert literature story teller, write a interesting story with dramatic and thrilling climax`,
    model: groqModel
})

async function* streamOutput(prompt: string) {
    const response = await run(StoryAgent, prompt, { stream: true });
    const stream = response.toTextStream();

    for await (const val of stream) {
        yield { isCompleted: false, content: val };
    }

    yield { isCompleted: true, content: response.finalOutput };
}

async function main(query: string) {
    for await (const o of streamOutput(query)) {
        if (o.isCompleted) {
            console.log(o.content);
        } else {
            process.stdout.write(o.content || '');
        }
    }
}

main('Can u make a story of revenge of a poor farmer');