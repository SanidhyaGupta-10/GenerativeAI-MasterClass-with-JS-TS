import 'dotenv/config';
import { groqModel } from './agent/groq';
import { z } from 'zod';
import {
    Agent,
    run,
    setTracingDisabled,
    type InputGuardrail,
    InputGuardrailTripwireTriggered
} from '@openai/agents';

setTracingDisabled(true);

// Zod schema for guardrail output validation
const GuardrailOutput = z.object({
    isValidSQLQuestion: z.boolean().describe('if the question is a SQL question'),
    reason: z.string().optional().describe('reason to reject'),
});

// Guardrail classifier agent — checks if user query is a valid SQL question
const sqlInputAgent = new Agent({
    model: groqModel,
    name: 'SQL query checker',
    instructions: `
    You are an input guardrail agent that checks if the user query is a SQL question or not.
    Rules:
    - The question has to be strictly a SQL query only.
    - Reject any other kind of request even if related to SQL.

    You MUST respond with ONLY a valid JSON object in this exact format, no other text:
    {"isValidSQLQuestion": true}
    or
    {"isValidSQLQuestion": false, "reason": "explanation here"}
    `,
});

// Input guardrail definition — runs the classifier and triggers tripwire if invalid
const sqlInputGuardrail: InputGuardrail = {
    name: 'SQL Guardrail',
    execute: async ({ input }) => {
        const result = await run(sqlInputAgent, input);

        // Parse the LLM's text response and validate with Zod
        const parsed = GuardrailOutput.safeParse(
            JSON.parse(result.finalOutput as string)
        );

        if (!parsed.success) {
            // If Zod validation fails, block the request
            return {
                outputInfo: { reason: 'Guardrail response was malformed.' },
                tripwireTriggered: true,
            };
        }

        return {
            outputInfo: parsed.data,
            tripwireTriggered: !parsed.data.isValidSQLQuestion,
        };
    },
};

// Main SQL agent — protected by the input guardrail
const sqlAgent = new Agent({
    model: groqModel,
    name: 'SQL Agent',
    instructions: 'You are an expert SQL ai agent',
    inputGuardrails: [sqlInputGuardrail],
});

async function main(q: string) {
    console.log(`Running SQL agent with query: ${q}...\n`);

    try {
        const result = await run(sqlAgent, q);
        console.log('Result:', result.finalOutput);
    } catch (e) {
        if (e instanceof InputGuardrailTripwireTriggered) {
            console.log(`⛔ Invalid Input: Rejected because ${e.message}`);
        } else {
            console.error('Unexpected error:', e);
        }
    }
}

main(`show me all the tables`);