import 'dotenv/config';
import { Agent, run, hostedMcpTool, setTracingDisabled } from '@openai/agents';
import { groqModel } from './agent/groq';

setTracingDisabled(true);

const agent = new Agent({
  name: 'MCP Assistant',
  instructions: 'You must always use the MCP tools to answer questions.',
  // no model override — uses OpenAI Responses API by default
  tools: [
    hostedMcpTool({
      serverLabel: 'gitmcp',
      serverUrl: 'https://gitmcp.io/openai/codex',
    }),
  ],
});

async function main(query: string) {
    const res = await run(agent, query);
    console.log(res.finalOutput);
};

main("list all the repo for this user")