import 'dotenv/config'
import { Agent, run, setTracingDisabled, tool } from "@openai/agents";
import { ollamaModel } from "./agent/ollama";
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
    execute: async (plan_id, customer_id, reason) => {
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
    model: ollamaModel,
    instructions: `You are a refund agent for a fiber internet provider.
    And Talk in English
    When the user asks for a refund, use the refund tool to get the refund. 
    Then, respond to the user with the best plan for them.`,
    tools: [processRefund],
});

const salesAgent = new Agent({
    name: 'sales-agent',
    model: ollamaModel,
    instructions: `You are a sales agent for a fiber internet provider.
    And Talk in English
    When the user asks for a plan, use the fetchAvailablePlans tool to get the available plans. 
    Then, respond to the user with the best plan for them.`,
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

main(`Hey i had 399rs plan and i want refund its not working properly my customre 
    id is cust123 and the reason is net is not working and also 
    i'm shifting to new location so i want refund`)