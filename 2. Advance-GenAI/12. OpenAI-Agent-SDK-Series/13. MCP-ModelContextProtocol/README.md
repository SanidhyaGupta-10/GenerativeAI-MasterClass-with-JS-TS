# 13. MCP — Model Context Protocol

Connect AI agents to external tools and data sources using the **Model Context Protocol (MCP)** with the OpenAI Agents SDK.

## 📌 What is MCP?

MCP (Model Context Protocol) is an open standard that lets AI agents discover and call external tools at runtime — without hardcoding tool definitions. Think of it as a **universal adapter** between LLMs and the outside world.

This chapter demonstrates two ways to use MCP with the OpenAI Agents SDK:

| Approach | File | API Used | MCP Execution |
|---|---|---|---|
| **Hosted MCP** | `index.ts` | Responses API | Server-side (OpenAI handles it) |
| **Streamable HTTP MCP** | `streamableMCP.ts` | Chat Completions API | Client-side (your code calls the MCP server) |

---

## 🏗️ Architecture

### 1. Hosted MCP Server Tools (`index.ts`)

OpenAI connects to the MCP server on your behalf — zero setup on the client.

```
Client → Query → OpenAI Server (gpt-4.1) → MCP Tool (e.g., GitMCP)
                                           ↓
Client ← Response ← OpenAI Server ← MCP Response
```

> **⚠️ Limitation:** Only works with OpenAI's **Responses API** (default models). Does NOT work with `OpenAIChatCompletionsModel` (e.g., Groq, Ollama, or any custom provider).

### 2. Streamable HTTP MCP Servers (`streamableMCP.ts`)

The client manages the MCP connection itself — works with **any model provider**.

```
Client → Query → OpenAI Server (any model)
                    ↓ (MCP tool request)
Client ← ← ← ← ← ↓
Client → Calls MCP Server Endpoint → MCP Response
Client → Sends MCP Response back → OpenAI Server
Client ← Final Response ← OpenAI Server
```

> **✅ Advantage:** Works with any model via `OpenAIChatCompletionsModel` — Groq, Ollama, Azure, etc.

---

## 📁 Project Structure

```
13. MCP-ModelContextProtocol/
├── index.ts              # Hosted MCP approach (OpenAI Responses API)
├── streamableMCP.ts      # Streamable HTTP MCP approach (any provider)
├── agent/
│   └── groq.ts           # Groq model configuration (Chat Completions API)
├── mcp.txt               # Architecture notes
├── .env                  # API keys (GROQ_API_KEY, OPENAI_API_KEY)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.com) runtime installed
- API keys for OpenAI and/or Groq

### Install Dependencies

```bash
bun install
```

### Set Up Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=sk-your-openai-key
GROQ_API_KEY=gsk_your-groq-key
```

### Run — Hosted MCP (OpenAI only)

```bash
bun run index.ts
```

### Run — Streamable HTTP MCP (works with any provider)

```bash
bun run streamableMCP.ts
```

---

## 🔍 Code Walkthrough

### Hosted MCP (`index.ts`)

Uses `hostedMcpTool()` — OpenAI handles the MCP connection server-side:

```typescript
import { Agent, run, hostedMcpTool } from '@openai/agents';

const agent = new Agent({
  name: 'MCP Assistant',
  instructions: 'Use MCP tools to answer questions.',
  tools: [
    hostedMcpTool({
      serverLabel: 'gitmcp',
      serverUrl: 'https://gitmcp.io/openai/codex',
    }),
  ],
});

const res = await run(agent, 'What is this repo about?');
```

### Streamable HTTP MCP (`streamableMCP.ts`)

Uses `MCPServerStreamableHttp` — you manage the connection lifecycle:

```typescript
import { Agent, run, MCPServerStreamableHttp } from '@openai/agents';

const mcpServer = new MCPServerStreamableHttp({
  url: 'https://gitmcp.io/openai/codex',
  name: 'GitMCP Documentation Server',
});

const agent = new Agent({
  name: 'MCP Assistant',
  instructions: 'Use MCP tools to answer questions.',
  mcpServers: [mcpServer],
});

await mcpServer.connect();
const result = await run(agent, 'What is this repo about?');
console.log(result.finalOutput);
await mcpServer.close();
```

### Groq Model Setup (`agent/groq.ts`)

Custom model provider using `OpenAIChatCompletionsModel`:

```typescript
import { OpenAIChatCompletionsModel } from '@openai/agents';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const groqModel = new OpenAIChatCompletionsModel(client, 'openai/gpt-oss-120b');
```

---

## ⚡ Key Takeaways

1. **`hostedMcpTool()`** = simple, zero-config, but locked to OpenAI Responses API
2. **`MCPServerStreamableHttp`** = flexible, works with any provider, but you manage `connect()` / `close()`
3. **Chat Completions API ≠ Responses API** — hosted tools only work with Responses API
4. Always call `await server.close()` to clean up MCP connections
5. [GitMCP](https://gitmcp.io) turns any GitHub repo into an MCP endpoint for documentation queries

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `@openai/agents` | OpenAI Agents SDK (Agent, run, MCP tools) |
| `openai` | OpenAI client (also used for Groq via baseURL) |
| `dotenv` | Load environment variables from `.env` |
