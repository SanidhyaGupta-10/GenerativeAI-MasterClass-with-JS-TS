import { z } from "zod";
import axios from "axios";
import { Agent, run, setTracingDisabled, tool } from "@openai/agents";
import { groqModel } from "./agent/groq";
import { sendEmail } from "./resend/resend.config";
import readline from "node:readline/promises";

const EMAIL = process.env.EMAIL_ADDRESS as string;

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
});

const sendEmailAgent = tool({
    name: 'send_email',
    description: `
        Use this tool to send email to user at the end of the process
    `,
    needsApproval: true,
    parameters: z.object({
        to: z.string().describe("The recipient email address"),
        subject: z.string(),
        body: z.string(),
    }),
    execute: async ({ to, subject, body }: { to: string, subject: string, body: string }) => {
        console.log('sending email to', to);
        console.log('subject', subject);
        console.log('body', body);
        await sendEmail(to, subject, body)
    }
})

const agent = new Agent({
    name: "Agent",
    instructions: ` You are weather Agent and you are the best at predicting the weather.
        You can also predict the weather for the future.
        Use the tools to get the weather for the future.`,
    model: groqModel,
    tools: [getWeatherAgent, sendEmailAgent]
})

async function askUserForPermission(ques: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const answer = await rl.question(`${ques} (y/n) :`);
    const normalizedAnswer = answer.toLowerCase().trim();

    rl.close();
    return normalizedAnswer === 'y' || normalizedAnswer === 'yes';
}


async function main(q: string) {
    const res = await run(agent, q);

    let hasInterruptions = res.interruptions.length > 0;
    while (hasInterruptions) {
        const currentState = res.state;
        for (const interruption of res.interruptions) {
            if (interruption.type === 'tool_approval_item') {

                await askUserForPermission(`
                    Agent ${interruption.agent.name} asking for to approve the request ? 
                `)
            }
        }
    }
    console.log(res.interruptions);
}

main(`New York, 
    Los Angeles, 
    Mumbai, 
    New-Delhi, 
    weathers of now, ( 
    give all cities weather in bullet form
    add emojis of weathers accordingly
    and send all weather to ${EMAIL} using send email tool after all process.
    send all data to my email address only.
    )`);
