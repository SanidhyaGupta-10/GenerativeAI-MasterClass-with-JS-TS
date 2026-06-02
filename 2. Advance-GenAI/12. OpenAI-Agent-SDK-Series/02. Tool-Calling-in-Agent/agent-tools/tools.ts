import { Agent, run, setTracingDisabled } from "@openai/agents";
import { ollamaModel } from "../agent/ollama";

// This is will need if you are using ollama because 
setTracingDisabled(true)

const WeatherAgent = new Agent({
    name: 'Weather Agent',
    model: ollamaModel,
    instructions: `
        You are weather Agent and you are the best at predicting the weather.
        You can also predict the weather for the future.
        Use the tools to get the weather for the future.
    `
})

async function main(query: string) {
    const result = await run(WeatherAgent, query);
    console.log(result.finalOutput);
}

main('Varanasi Weather');