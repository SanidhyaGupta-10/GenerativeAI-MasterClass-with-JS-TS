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
        console.log(`\n🌍 ─── Weather Tool Called ───────────────────────`)
        console.log(`   🔧 City:    ${city}`)
        console.log(`   ✅ Result:  ${result.trim()}`)
        console.log(`   ─────────────────────────────────────────────\n`)
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
        console.log(`\n📧 ─── Email Tool Executing ─────────────────────`)
        console.log(`   📨 To:      ${to}`)
        console.log(`   📝 Subject: ${subject}`)
        console.log(`   📄 Body:    ${body.substring(0, 80)}${body.length > 80 ? '...' : ''}`)
        await sendEmail(to, subject, body)
        console.log(`   ✅ Email sent successfully!`)
        console.log(`   ─────────────────────────────────────────────\n`)
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
    let res = await run(agent, q);

    let hasInterruptions = res.interruptions.length > 0;
    while (hasInterruptions) {
        const currentState = res.state;
        for (const interupt of res.interruptions) {
            if (interupt.type === 'tool_approval_item') {
                const toolName = (interupt.rawItem as any).name;
                const toolArgs = JSON.stringify((interupt.rawItem as any).arguments);
                const isAllowed = await askUserForPermission(`
⏸️  ─── Approval Required ─────────────────────────
   🤖 Agent:  ${interupt.agent.name}
   🔧 Tool:   ${toolName}
   📦 Args:   ${toolArgs}
   ─────────────────────────────────────────────────`)
                if (isAllowed) {
                    currentState.approve(interupt)
                } else {
                    currentState.reject(interupt)
                }
            }
        }

        res = await run(agent, currentState);
        hasInterruptions = res.interruptions?.length > 0;
    }

    if (res.finalOutput) {
        console.log('\n📋 Final Output:', res.finalOutput);
    }
}

main(` 
    Los Angeles, 
    Tokyo, 
    Singapore, 
    weathers of now, ( 
    give all cities weather in bullet form
    add emojis of weathers accordingly
    and send all weather to ${EMAIL} using send email tool after all process.
    send all data to my email address only.
    )`).catch((err) => {
    console.error('💥 Error:', err instanceof Error ? err.message : String(err));
    process.exit(1);
});

