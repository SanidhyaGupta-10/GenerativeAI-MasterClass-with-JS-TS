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
    isValidMathsQuestion: z.boolean().describe('if the question is a maths question'),
    reason: z.string().optional().describe('reason to reject'),
});

// Guardrail classifier agent — checks if user query is a valid maths question
const mathInputAgent = new Agent({
    model: groqModel,
    name: 'Math query checker',
    instructions: `
    You are an input guardrail agent that checks if the user query is a maths question or not.
    Rules:
    - The question has to be strictly a maths equation only.
    - Reject any other kind of request even if related to maths.

    You MUST respond with ONLY a valid JSON object in this exact format, no other text:
    {"isValidMathsQuestion": true}
    or
    {"isValidMathsQuestion": false, "reason": "explanation here"}
    `,
});

// Input guardrail definition — runs the classifier and triggers tripwire if invalid
const mathInputGuardrail: InputGuardrail = {
    name: 'Math Homework Guardrail',
    execute: async ({ input }) => {
        const result = await run(mathInputAgent, input);

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
            tripwireTriggered: !parsed.data.isValidMathsQuestion,
        };
    },
};

// Main maths agent — protected by the input guardrail
const mathsAgent = new Agent({
    model: groqModel,
    name: 'Maths Agent',
    instructions: 'You are an expert maths ai agent',
    inputGuardrails: [mathInputGuardrail],
});

async function main(q: string) {
    console.log(`Running maths agent with query: ${q}...\n`);

    try {
        const result = await run(mathsAgent, q);
        console.log('Result:', result.finalOutput);
    } catch (e) {
        if (e instanceof InputGuardrailTripwireTriggered) {
            console.log(`⛔ Invalid Input: Rejected because ${e.message}`);
        } else {
            console.error('Unexpected error:', e);
        }
    }
}

main(`2 + 2 = ?`);