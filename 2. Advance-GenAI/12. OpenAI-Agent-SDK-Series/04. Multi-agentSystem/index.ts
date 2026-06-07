import 'dotenv/config'
import { Agent, run, setTracingDisabled, tool } from "@openai/agents";
import { ollamaModel } from "./agent/ollama";
import { groqModel } from "./agent/groq";
import { z } from "zod";
import fs from "node:fs/promises"

// This is will need if you are using ollama because 
setTracingDisabled(true)

// Plans Tool 
const fetchAvailablePlans = tool({
    name: 'fetchAvailablePlans',
    description: 'fetch available plans',
    parameters: z.object({
        // required empty object is mandatory if query is optional
        query: z.string().optional().describe('Optional filter keyword for plans'),
    }),
    execute: async (_params) => {
        console.log('Tool Calling 🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖')
        return [
            { plan_id: 1, price_inr: '399', speed: '30mb/s', desc: 'Basic Plan'},
            { plan_id: 2, price_inr: '699', speed: '50mb/s', desc: 'Standard Plan' },
            { plan_id: 3, price_inr: '999', speed: '100mb/s', desc: 'Premium Plan' }
        ]
    }
});

// Refund Tool
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
});

// Refund Agent
const refundAgent = new Agent({
    name: 'refund-agent',
    model: groqModel,
    instructions: `You are a refund processing agent. When you receive a refund request, you MUST immediately call the process_Refund tool with the plan_id, customer_id, and reason provided. Do NOT ask follow-up questions. Just process the refund.`,
    tools: [processRefund],
});

// Sales Agent
const salesAgent = new Agent({
    name: 'sales-agent',
    model: ollamaModel,
    instructions: `You are a sales agent for an internet broadband company. When a user requests a refund, you MUST immediately use the refund-expert tool. Do NOT ask follow-up questions if the user has already provided their customer ID, plan, and reason. Pass all the information directly to the refund-expert tool.`,
    tools: [
        fetchAvailablePlans, 
        refundAgent.asTool({
            toolName: 'refund-expert',
            toolDescription: 'Use this tool when a user asks for a refund. Pass the full user message to this tool.'
        })
    ],
});

// Main Function
async function main(query: string) {
    const result = await run(salesAgent, query);
    console.log(result.finalOutput);
}

main(
  `I had a plan_id: 1, price_inr: 399. I need a refund right now. my cus id is cust123 because of I am shifting to a new place`
);