import { Agent, run, setTracingDisabled, InputGuardrailTripwireTriggered } from '@openai/agents';
import type { InputGuardrail } from '@openai/agents';
import 'dotenv/config';
import { groqModel } from './agent/groq';
setTracingDisabled(true);

// Math-related keywords to validate against
const MATH_KEYWORDS = [
    'add', 'subtract', 'multiply', 'divide',
    'sum', 'difference', 'product', 'quotient',
    'plus', 'minus', 'times', 'calculate',
    'equation', 'solve', 'math', 'number',
    'factorial', 'percentage', 'average', 'mean',
    'square', 'root', 'power', 'exponent',
    'integral', 'derivative', 'algebra', 'geometry',
    'trigonometry', 'logarithm', 'fraction',
];

const mathGuardrail: InputGuardrail = {
    name: 'math-guardrail',
    execute: async ({ agent, input, context }) => {
        // input can be a string or ModelItem[] — normalize to string
        const query = typeof input === 'string'
            ? input.toLowerCase()
            : JSON.stringify(input).toLowerCase();

        const isMathRelated = MATH_KEYWORDS.some((keyword) => query.includes(keyword));

        if (isMathRelated) {
            // Input is valid — no tripwire
            return {
                tripwireTriggered: false,
                outputInfo: { reason: 'Input is related to Mathematics.' },
            };
        }

        // Input is NOT math-related — trigger the tripwire
        return {
            tripwireTriggered: true,
            outputInfo: {
                reason: 'Input is not related to Mathematics. Request rejected.',
            },
        };
    },
};

const mathsAgent = new Agent({
    model: groqModel,
    name: 'maths-agent',
    inputGuardrails: [mathGuardrail],
    instructions:
        'You are a helpful maths assistant. Answer questions and use `calculator` tool for calculations.',
});

async function main(query: string) {
    console.log(`Running maths agent with query: ${query}...\n`);

    try {
        const result = await run(mathsAgent, query);
        console.log('Result:', result.finalOutput);
    } catch (error) {
        if (error instanceof InputGuardrailTripwireTriggered) {
            console.log('⛔ Guardrail Triggered!');
            console.log('Reason:', error.result.output.outputInfo?.reason ?? 'Off-topic request blocked.');
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

// Test with an off-topic query (should be rejected)
main('Give me While Loop example');