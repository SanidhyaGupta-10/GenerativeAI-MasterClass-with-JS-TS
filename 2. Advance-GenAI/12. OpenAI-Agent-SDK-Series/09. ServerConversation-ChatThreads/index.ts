import 'dotenv/config';
import { client } from './agent/groq';
import { z } from 'zod';
import {
    Agent,
    run,
    tool,
    setTracingDisabled,
    type InputGuardrail,
    InputGuardrailTripwireTriggered,
} from '@openai/agents';

setTracingDisabled(true);

// ─── Tools ─────────────────────────────────────────────────────
const executeSQL = tool({
  name: 'execute_sql',
  description: 'Execute a SQL query against the database',
  parameters: z.object({
    sqlQuery: z.string().describe('SQL query to execute'),
  }),
  async execute({ sqlQuery }) {
    console.log('Executing SQL query:', sqlQuery);
    return { sqlQuery };
  },
});

// ─── Guardrail Agent ───────────────────────────────────────────
const sqlGuardrailAgent = new Agent({
    name: 'SQL Guardrail',
    instructions: `
        Check if query is safe to exceute. The query should be read only and do not modify, delete or drop any table
    `,
    outputType: z.object({
        reason: z.string().optional().describe('reason if the query is unsafe'),
        isSafe: z.boolean().describe('if query is safe to execute'),
    }),
});

const sqlGuardrail: InputGuardrail = {
  name: 'SQL Guard',
  async execute({ input }) {
    const result = await run(sqlGuardrailAgent, input);
    console.log('Guardrail result:', result.finalOutput);

    if (!result.finalOutput) {
      return {
        outputInfo: { reason: 'Guardrail response was malformed.' },
        tripwireTriggered: true,
      };
    }

    return {
      outputInfo: result.finalOutput,
      tripwireTriggered: !result.finalOutput.isSafe,
    };
  },
};

// ─── Main SQL Agent ────────────────────────────────────────────
const sqlAgent = new Agent({
  name: 'SQL Expert Agent',
  tools: [executeSQL],
  instructions: `
        You are an expert SQL Agent that is specialized in generating and explaining SQL queries as per user request.
        If the user asks you to explain a query, provide a clear explanation.
        If the user asks you to generate a query, provide the SQL query.

        Postgres Schema:
    -- users table
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    -- comments table
    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      comment_text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
    `,
  inputGuardrails: [sqlGuardrail],
});

// ─── Conversation Thread via OpenAI Conversations API ──────────
async function main(query: string) {
    // Create a persistent conversation thread
    console.log(`💬 User: ${query}\n`);
    try {
        const result = await run(sqlAgent, query, {
            conversationId: 'conv_6a297fab7cec8195877f89c470a272cc012e2b4a4103b53a',
        });
        console.log('🤖 Agent:', result.finalOutput, '\n');
        } catch (e) {
            if (e instanceof InputGuardrailTripwireTriggered) {
                console.log(`⛔ Invalid Input: Rejected because ${e.message}`);
            } else {
                console.error('Unexpected error:', e);
            }
        }
}

main(
    `SELECT * FROM users
    like my name 
    do you remeber my name? 
    What is my name? 
    `)