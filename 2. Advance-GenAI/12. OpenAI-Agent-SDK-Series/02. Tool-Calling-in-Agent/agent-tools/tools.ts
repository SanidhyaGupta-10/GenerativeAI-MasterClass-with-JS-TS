import { Agent, run, setTracingDisabled, tool } from "@openai/agents";
import { ollamaModel } from "../agent/ollama";
import { z } from "zod";
import axios from 'axios';

// This is will need if you are using ollama because 
setTracingDisabled(true)

const getWeatherAgent = tool({
    name: 'get_Weather',
    description: `
        returns the curret weather information for thr given city 
    `,
    parameters: z.object({
        city: z.string().describe("Enter city name")
    }),
    execute: async ({ city }: { city: string }) => {
        const url = `https://wttr.in/${encodeURIComponent(city.toLowerCase())}?format=3`;
        const res = await axios.post(url, {
            headers: {
                Accept: 'text/plain'
            }
        });
        const result = res.data;
        return `
            The current weather in ${city} is ${result}
        `
    }
})


const WeatherAgent = new Agent({
    name: 'Weather Agent',
    model: ollamaModel,
    instructions: `
        You are weather Agent and you are the best at predicting the weather.
        You can also predict the weather for the future.
        Use the tools to get the weather for the future.
    `,
    tools: [getWeatherAgent]
})

async function main(query: string) {
    const result = await run(WeatherAgent, query);
    console.log(result.finalOutput);
}

main('Varanasi Weather, call');