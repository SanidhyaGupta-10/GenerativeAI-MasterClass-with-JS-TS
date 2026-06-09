import 'dotenv/config';
import { groqModel } from './agent/groq';
import { z } from 'zod';
import {
    Agent,
    run,
    tool,
    type AgentInputItem,
    setTracingDisabled,
    type InputGuardrail,
    InputGuardrailTripwireTriggered,
} from '@openai/agents';

setTracingDisabled(true);

let threads: AgentInputItem [] = [];

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

const sqlGuardrailAgent = new Agent({
  name: 'SQL Guardrail',
  model: groqModel,
    instructions: `
        Check if query is safe to exceute. The query should be read only and do not modify, delete or drop any table
    `,
    outputType: z.object({
        reason: z.string().optional().describe('reason if the query is unsafe'),
        isSafe: z.boolean().describe('if query is safe to execute'),
    }),
});

// Input guardrail definition — runs the classifier and triggers tripwire if invalid
const sqlGuardrail: InputGuardrail = {
  name: 'SQL Guard',
  async execute({ input }) {
    const result = await run(sqlGuardrailAgent, input);
    console.log('Guardrail result:', result.finalOutput);

    if (!result.finalOutput) {
      // If Zod validation fails, block the request
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

// Main SQL agent — protected by the input guardrail
const sqlAgent = new Agent({
  name: 'SQL Expert Agent',
  model: groqModel,
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

async function main(q: string) {
    console.log(`Running SQL agent with query: ${q}...\n`);
    try {
        // add message from user
        threads.push({
            type: 'message',
            role: 'user',
            content: q,
        })
        // execute agent
        const result = await run(sqlAgent, threads);
        // Update history with AI response
        threads = result.history;

        // console.log('Result:', JSON.stringify(result.history, null, 2));
        console.log('Final Output:', result.finalOutput, null, 2);
    } catch (e) {
        if (e instanceof InputGuardrailTripwireTriggered) {
            console.log(`⛔ Invalid Input: Rejected because ${e.message}`);
        } else {        
            console.error('Unexpected error:', e);
        }
    }
}

main(`Hiii My name is Sanidhya-Gupta`).then(() => {
  main(`Get all the users of my name SELECT * FROM users;`)
})