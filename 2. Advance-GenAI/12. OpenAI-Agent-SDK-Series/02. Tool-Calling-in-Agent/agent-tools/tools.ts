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
        console.log('Tool Calling 🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖')
        console.log('result', result);
        console.log(`function called for this city ${city}`)
        return `
            The current weather in ${city} is ${result}
        `
    }
})

const sendEmailAgent = tool({
    name: 'send_mail',
    description: `
        send an email to the user 
        all the weather data's he asked for
    `,
    parameters: z.object({
        to: z.string().email(),
        subject: z.string(),
        body: z.string(),
    }),
    execute: async ({ to, subject, body }: { to: string, subject: string, body: string }) => {
        console.log('Tool Calling 🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖')
        console.log('to', to);
        console.log('subject', subject);
        console.log('body', body);
        return `
            The email has been sent to ${to}
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

main(`New York,
     San Francisco, 
     Dubai, 
     Kyoto, 
     Tokyo, 
     Texas weathers of now, ( 
    give all cities weather in bullet form
    add emojis of weathers accordingly
    )`);