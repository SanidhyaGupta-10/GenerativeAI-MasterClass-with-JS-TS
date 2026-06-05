import 'dotenv/config'
import { Agent, run, setTracingDisabled, tool } from "@openai/agents";
import { ollamaModel } from "../agent/ollama";
import { z } from "zod";

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
})

const salesAgent = new Agent({
    name: 'sales-agent',
    model: ollamaModel,
    instructions: `You are a sales agent for a fiber internet provider.
    And Talk in English
    When the user asks for a plan, use the fetchAvailablePlans tool to get the available plans. 
    Then, respond to the user with the best plan for them.`,
    tools: [fetchAvailablePlans],
})


async function main(query: string) {
    const result = await run(salesAgent, query);
    console.log(result.finalOutput);
}

main('Hey there🙌')