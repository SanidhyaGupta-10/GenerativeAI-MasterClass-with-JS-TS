import 'dotenv/config'
import { Agent, run, setTracingDisabled, tool } from "@openai/agents";
import { ollamaModel } from "./agent/ollama";
import { groqModel } from "./agent/groq";
import { z } from "zod";
import fs from "node:fs/promises"

// This is will need if you are using ollama because 
setTracingDisabled(true)

const fetchAvailablePlans = tool({
    name: 'fetchAvailablePlans',
    description: 'fetch available plans',
    parameters: z.object({}),
    execute: async () => {
        console.log('Tool Calling 🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖')
        return [
            { plan_id: 1, price_inr: '399', speed: '30mb/s', desc: 'Basic Plan'},
            { plan_id: 2, price_inr: '699', speed: '50mb/s', desc: 'Standard Plan' },
            { plan_id: 3, price_inr: '999', speed: '100mb/s', desc: 'Premium Plan' }
        ]
    }
});

const processRefund = tool({
    name: 'process_Refund',
    description: 'You are expert in processing refunds. If user ask for refund process it',
    parameters: z.object({
        plan_id: z.string(), 
        customer_id: z.string(),
        reason: z.string().describe('Reason for refund'),
    }),
    execute: async ({ plan_id, customer_id, reason }) => {
        console.log('Tool Calling 🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖');
        const data = JSON.stringify({
            plan_id, customer_id, reason
        });
        await fs.appendFile(
            "./refunds.txt", 
            data + "\n",
            "utf-8"
        );
        return {
            refundIssued: true,
            customer_id: customer_id,
            plan_id: plan_id,
            reason: reason,
        };
    }
})

const refundAgent = new Agent({
    name: 'refund-agent',
    // model: ollamaModel,
    model: groqModel,
    instructions: `You are an expert at customer satisfaction.
        Refund agent: process refund if user ask for refund using process refund tool
        `,
    tools: [processRefund],
});

const salesAgent = new Agent({
    name: 'sales-agent',
    model: ollamaModel,
    instructions: `You are an expert sales agent for an internet broadband comapny.
        Talk to the user and help them with what they need`,
    tools: [
        fetchAvailablePlans, 
        refundAgent.asTool({
            toolName: 'refund-expert',
            toolDescription: 'use this tool if user ask for refund'
        })
    ],
})


async function main(query: string) {
    const result = await run(salesAgent, query);
    console.log(result.finalOutput);
}

main(
  `I had a plan 399. I need a refund right now. my cus id is cust123 because of I am shifting to a new place`
);