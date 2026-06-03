import 'dotenv/config'
import { Agent, run, setTracingDisabled, tool } from "@openai/agents";
import { ollamaModel } from "../agent/ollama";
import { z } from "zod";
import axios from 'axios';
import { sendEmail } from "../resend/resend.config";

// This is will need if you are using ollama because 
setTracingDisabled(true)

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS as string;

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
        const res = await axios.get(url, {
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
        await sendEmail(EMAIL_ADDRESS, subject, body);
        return `
            The email has been sent to ${EMAIL_ADDRESS}
        `
    }
})


const WeatherAgentData = new Agent({
    name: 'Weather Agent Send Data to Email',
    model: ollamaModel,
    instructions: `
        You are weather Agent and you are the best at predicting the weather.
        You can also predict the weather for the future.
        Use the tools to get the weather for the future.
        and send Weather data to user's email address using send email tool after all process.
    `,
    tools: [getWeatherAgent, sendEmailAgent]
})

async function main(query: string) {
    const result = await run(WeatherAgentData, query);
    console.log(result.finalOutput);
}

main(`New York, weathers of now, ( 
    give all cities weather in bullet form
    add emojis of weathers accordingly
    and send all weather to ${EMAIL_ADDRESS} using send email tool after all process.
    send all data to my email address only.
    )`)    