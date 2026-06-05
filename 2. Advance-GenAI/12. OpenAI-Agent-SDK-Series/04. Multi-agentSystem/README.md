# 🤖 OpenAI Agent SDK Series

A hands-on, progressive series exploring the **OpenAI Agent SDK** (`@openai/agents`) with **TypeScript** and **Bun**. Each module builds on the previous one — from creating your first agent to orchestrating multi-agent systems with tool calling.

> **Runtime:** [Bun](https://bun.com) · **Language:** TypeScript · **LLM Providers:** Ollama (local) & Groq (cloud)

---

## 📁 Series Overview

| # | Module | Key Concept |
|---|--------|-------------|
| 01 | [First Agent Setup](#01-first-agent-setup) | Creating & running a basic agent with Ollama |
| 02 | [Tool Calling in Agent](#02-tool-calling-in-agent) | Giving agents tools (weather API + email) |
| 03 | [Structured AI Outputs with Zod](#03-structured-ai-outputs-with-zod) | Runtime validation & type-safe schemas |
| 04 | [Multi-Agent System](#04-multi-agent-system) | Agent delegation, refund processing & file I/O |

---

## 01. First Agent Setup

> **Path:** `01. First-Agent-Setup/`

Your very first agent — connects to a local Ollama instance and answers a simple query.

### Files

| File | Description |
|------|-------------|
| `index.ts` | Entry point — creates an Ollama client, wraps it in `OpenAIChatCompletionsModel`, defines an `Agent` with basic instructions, and runs a "Rust vs Go" query |
| `package.json` | Dependencies: `@openai/agents`, `openai`, `dotenv`, `zod` |
| `tsconfig.json` | TypeScript configuration |
| `.gitignore` | Standard ignores |

### Key Concepts

- **`OpenAI` client** configured with Ollama's base URL (`http://localhost:11434/v1/`)
- **`OpenAIChatCompletionsModel`** wraps the client + model name (`qwen2.5:1.5b`)
- **`Agent`** with `name`, `model`, and `instructions`
- **`run()`** executes the agent with a user query
- **`setTracingDisabled(true)`** — required when using Ollama (no OpenAI tracing endpoint)

### Run

```bash
cd "01. First-Agent-Setup"
bun install
bun run index.ts
```

---

## 02. Tool Calling in Agent

> **Path:** `02. Tool-Calling-in-Agent/`

Extends the agent with **custom tools** — fetches real-time weather data from `wttr.in` and sends styled HTML emails via **Resend**.

### Files

| File | Description |
|------|-------------|
| `index.ts` | Entry point — creates a location-aware agent with dynamic instructions (India vs US style) |
| `agent/ollama.ts` | Reusable Ollama client & model export (`qwen2.5:7b`) |
| `agent-tools/tools.ts` | Defines two tools (`get_Weather`, `send_mail`), creates the `WeatherAgentData` agent, and runs a weather + email query |
| `resend/resend.config.ts` | Resend SDK setup — initializes client with API key, exports `sendEmail()` function |
| `resend/resend.template.ts` | Premium dark-themed HTML email template with weather icon, gradient header, and formatted body |
| `package.json` | Dependencies: `@openai/agents`, `openai`, `axios`, `resend`, `dotenv`, `zod` |
| `.env` | Environment variables: `RESEND_API_KEY`, `FROM_EMAIL`, `EMAIL_ADDRESS` |

### Key Concepts

- **`tool()`** function to define tools with `name`, `description`, `parameters` (Zod schema), and `execute`
- **Dynamic instructions** — `instructions` as an `async function` that returns different prompts based on `location`
- **Tool chaining** — agent fetches weather first, then sends the result via email
- **Zod parameter schemas** — `z.object({ city: z.string() })` for type-safe tool inputs
- **Destructured execute params** — `execute: async ({ city }) => { ... }`

### Run

```bash
cd "02. Tool-Calling-in-Agent"
bun install

# For the basic agent with dynamic instructions:
bun run index.ts

# For the weather + email agent with tool calling:
bun run agent-tools/tools.ts
```

### Environment Variables Required

```env
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_from_email@domain.com
EMAIL_ADDRESS=your_recipient_email@domain.com
```

---

## 03. Structured AI Outputs with Zod

> **Path:** `03. StructuredAIOutputswithZod/`

A standalone module focused purely on **Zod** — the runtime validation library used across this series for tool parameter schemas and structured outputs.

### Files

| File | Description |
|------|-------------|
| `index.ts` | Three examples: ✅ valid data parsing, ❌ invalid data with error messages, 🔮 type inference with `z.infer` |
| `package.json` | Minimal dependencies: `zod`, `@types/node` (no agent SDK needed) |

### Key Concepts

- **Why Zod?** — TypeScript types disappear at runtime; Zod validates at runtime
- **`z.object()`** — defines the shape data must follow
- **`.safeParse()`** — validates without throwing; returns `{ success, data }` or `{ success, error }`
- **Validation rules** — `.min()`, `.email()`, `.enum()`
- **`z.infer<typeof Schema>`** — generates TypeScript types from Zod schemas (one schema → validation + types)

### Run

```bash
cd "03. StructuredAIOutputswithZod"
bun install
bun run index.ts
```

---

## 04. Multi-Agent System

> **Path:** `04. Multi-agentSystem/`

The most advanced module — a **multi-agent system** where a sales agent delegates to a refund agent. Demonstrates agent-as-tool, dual model providers (Ollama + Groq), and file I/O.

### Files

| File | Description |
|------|-------------|
| `index.ts` | Defines two tools (`fetchAvailablePlans`, `process_Refund`), two agents (`refundAgent`, `salesAgent`), wires refundAgent as a tool for salesAgent, and runs a refund query |
| `agent/ollama.ts` | Ollama client & model export (`qwen2.5:7b`) — used by salesAgent |
| `agent/groq.ts` | Groq client & model export (`openai/gpt-oss-20b`) — used by refundAgent |
| `package.json` | Dependencies: `@openai/agents`, `openai`, `groq-sdk`, `axios`, `resend`, `dotenv`, `zod` |
| `.env` | Environment variables: `GROQ_API_KEY` |

### Architecture

```
User Query
    │
    ▼
┌──────────────┐
│  Sales Agent │  (Ollama - qwen2.5:7b)
│              │
│  Tools:      │
│  • fetchAvailablePlans
│  • refund-expert ──────┐
└──────────────┘         │
                         ▼
                ┌────────────────┐
                │  Refund Agent  │  (Groq - gpt-oss-20b)
                │                │
                │  Tools:        │
                │  • process_Refund → writes to refunds.txt
                └────────────────┘
```

### Key Concepts

- **`agent.asTool()`** — converts an agent into a tool that another agent can call
- **Multi-model setup** — salesAgent uses local Ollama, refundAgent uses cloud Groq
- **Tool with file I/O** — `process_Refund` appends refund data to `refunds.txt` using `fs.appendFile`
- **Destructured parameters** — `execute: async ({ plan_id, customer_id, reason }) => { ... }`
- **Agent delegation** — salesAgent decides when to hand off to refundAgent

### Run

```bash
cd "04. Multi-agentSystem"
bun install
bun run index.ts
```

### Environment Variables Required

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 🛠️ Prerequisites

- [Bun](https://bun.com) runtime installed
- [Ollama](https://ollama.com) running locally with required models pulled:
  ```bash
  ollama pull qwen2.5:1.5b   # Module 01
  ollama pull qwen2.5:7b     # Modules 02 & 04
  ```
- **Groq API key** (for Module 04) — get one at [console.groq.com](https://console.groq.com)
- **Resend API key** (for Module 02) — get one at [resend.com](https://resend.com)

---

## 📦 Common Dependencies

| Package | Purpose |
|---------|---------|
| `@openai/agents` | OpenAI Agent SDK — core framework |
| `openai` | OpenAI client (used for Ollama & Groq compatibility) |
| `zod` | Runtime schema validation & type inference |
| `dotenv` | Environment variable loading |
| `axios` | HTTP requests (weather API) |
| `resend` | Email sending service |
| `groq-sdk` | Groq cloud LLM provider |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone <repo-url>
cd "12. OpenAI-Agent-SDK-Series"

# Start with Module 01
cd "01. First-Agent-Setup"
bun install
bun run index.ts
```

Work through each module in order (01 → 04) for the best learning experience.
