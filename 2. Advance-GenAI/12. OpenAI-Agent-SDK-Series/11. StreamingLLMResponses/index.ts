import { run, Agent } from "@openai/agents";
import { groqModel } from '../04. Multi-agentSystem/agent/groq';

const StoryAgent = new Agent({
    name: "Story_Agent",
    instructions: `You are a expert literature story teller, write a interesting story with dramatic and thrilling climax`,
    model: groqModel
})

async function main(prompt: string) {
    const response = await run(StoryAgent, prompt, { stream: true })
    const stream = response.toTextStream()

    for await (const chunk of stream) {
        process.stdout.write(chunk) // if u do this it will right/good response whole streaming experince if you do not do this it will give response at once
    }
    console.log()
}

main('Can u make a story of revenge of a poor farmer');