<p align="center">
  <img src="https://img.shields.io/badge/OpenAI-Agent_SDK-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI Agent SDK"/>
  <img src="https://img.shields.io/badge/Runtime-Bun_v1.3-F7DF1E?style=for-the-badge&logo=bun&logoColor=black" alt="Bun Runtime"/>
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/LLM-Ollama_Local-FF6F61?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama"/>
  <img src="https://img.shields.io/badge/LLM-Groq_Cloud-F55036?style=for-the-badge&logo=groq&logoColor=white" alt="Groq"/>
  <img src="https://img.shields.io/badge/LLM-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI"/>
  <img src="https://img.shields.io/badge/Validation-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"/>
</p>

<h1 align="center">🤖 OpenAI Agent SDK Series</h1>

<p align="center">
  <strong>A hands-on, progressive series exploring the OpenAI Agent SDK — from your first agent to multi-agent orchestration, guardrails, and beyond.</strong><br/>
  Powered by <a href="https://github.com/openai/openai-agents-js">OpenAI Agents SDK</a>, <a href="https://ollama.com">Ollama</a> & <a href="https://groq.com">Groq</a>.
</p>

<p align="center">
  <a href="#-series-roadmap">Roadmap</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-chapter-details">Chapters</a> •
  <a href="#-prerequisites">Prerequisites</a> •
  <a href="#-common-dependencies">Dependencies</a>
</p>

---

## 📖 Overview

This repository is an **11-part learning series** that takes you from zero to production-ready AI agent architectures using the [OpenAI Agents SDK](https://github.com/openai/openai-agents-js) (`@openai/agents`) with **TypeScript** and **Bun**. Each chapter builds on the previous one, progressively introducing new concepts.

> **Runtime:** [Bun](https://bun.sh) · **Language:** TypeScript · **LLM Providers:** Ollama (local), Groq (cloud) & OpenAI

### ✨ What You'll Learn

| Concept | Chapter |
|---------|:-------:|
| Agent creation & execution pipeline | 01 |
| Tool calling & external API integration | 02 |
| Runtime validation with Zod & structured outputs | 03 |
| Multi-agent delegation with `asTool()` | 04 |
| Autonomous handoffs & receptionist routing | 05 |
| Input guardrails & tripwire safety patterns | 06 |
| LLM-based output guardrails & SQL safety validation | 07 |
| Multi-turn conversations, chat threads & stateful agents | 08 |
| Server-side conversations via OpenAI Conversations API | 09 |
| Runtime-local context management & typed `RunContext` | 10 |
| Real-time streaming with async generators & `toTextStream()` | 11 |

---

## 🗺️ Series Roadmap

```mermaid
flowchart LR
    A["01\nFirst Agent\nSetup"] --> B["02\nTool Calling\nin Agent"]
    B --> C["03\nStructured\nOutputs (Zod)"]
    C --> D["04\nMulti-Agent\nSystem"]
    D --> E["05\nHands-off\nMulti-Agent"]
    E --> F["06\nInput\nGuardrails"]
    F --> G["07\nOutput\nGuardrails"]
    G --> H["08\nConversation\n& Threads"]
    H --> I["09\nServer-Side\nConversations"]
    I --> J["10\nRuntime-Local\nContext"]
    J --> K["11\nStreaming\nLLM Responses"]

    style A fill:#1e293b,stroke:#22c55e,stroke-width:2px,color:#e2e8f0
    style B fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#e2e8f0
    style C fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#e2e8f0
    style D fill:#1e293b,stroke:#8b5cf6,stroke-width:2px,color:#e2e8f0
    style E fill:#1e293b,stroke:#ef4444,stroke-width:2px,color:#e2e8f0
    style F fill:#1e293b,stroke:#ec4899,stroke-width:2px,color:#e2e8f0
    style G fill:#1e293b,stroke:#14b8a6,stroke-width:2px,color:#e2e8f0
    style H fill:#1e293b,stroke:#06b6d4,stroke-width:2px,color:#e2e8f0
    style I fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#e2e8f0
    style J fill:#1e293b,stroke:#f97316,stroke-width:2px,color:#e2e8f0
    style K fill:#1e293b,stroke:#06d6a0,stroke-width:2px,color:#e2e8f0
```

| # | Module | Key Concept | LLM Provider | Status |
|:-:|--------|-------------|:------------:|:------:|
| 01 | [First Agent Setup](./01.%20First-Agent-Setup/) | Basic agent creation & execution | Ollama | ✅ |
| 02 | [Tool Calling in Agent](./02.%20Tool-Calling-in-Agent/) | Tools, weather API & email integration | Ollama | ✅ |
| 03 | [Structured Outputs with Zod](./03.%20StructuredAIOutputswithZod/) | Runtime validation & type-safe schemas | Ollama | ✅ |
| 04 | [Multi-Agent System](./04.%20Multi-agentSystem/) | Agent delegation, `asTool()` & file I/O | Ollama + Groq | ✅ |
| 05 | [Hands-off Multi-Agent](./05.%20Hands-off%20(MultiAgentSystem)/) | Handoffs, receptionist routing & autonomous pipeline | Groq | ✅ |
| 06 | [Input Guardrails](./06.%20InputGuardrailsInAgents/) | Input validation, tripwires & safety patterns | Groq | ✅ |
| 07 | [Output Guardrails](./07.%20OutputGuardrailsInAgents/) | LLM-based guardrail agent, SQL safety & structured output | Groq | ✅ |
| 08 | [Conversation & Chat Threads](./08.%20ConversationandChatThreads/) | Multi-turn conversations, history management & stateful agents | Groq | ✅ |
| 09 | [Server-Side Conversations](./09.%20ServerConversation-ChatThreads/) | OpenAI Conversations API, server-managed threads & persistent memory | OpenAI | ✅ |
| 10 | [Runtime-Local Context Management](./10.%20RuntimeLocal-ContextManagement/) | Typed `RunContext`, in-memory threads & context injection | OpenAI | ✅ |
| 11 | [Streaming LLM Responses](./11.%20StreamingLLMResponses/) | Real-time streaming, async generators & `toTextStream()` | Groq | ✅ |

---

## 📚 Chapter Details

### 01. First Agent Setup

> **Path:** [`01. First-Agent-Setup/`](./01.%20First-Agent-Setup/)

Your very first AI agent — connects to a local **Ollama** instance and answers a query. Everything runs on your machine with zero cost.

| Concept | Description |
|---------|-------------|
| `OpenAIChatCompletionsModel` | Wraps Ollama's OpenAI-compatible API |
| `Agent` | Defines name, model & system instructions |
| `run()` | Executes the agent pipeline with a user query |
| `setTracingDisabled(true)` | Required for non-OpenAI model providers |

```bash
cd "01. First-Agent-Setup" && bun install && bun run index.ts
```

---

### 02. Tool Calling in Agent

> **Path:** [`02. Tool-Calling-in-Agent/`](./02.%20Tool-Calling-in-Agent/)

Give your agent **superpowers** — it autonomously fetches live weather data from [wttr.in](https://wttr.in) and sends premium HTML email reports via [Resend](https://resend.com).

| Concept | Description |
|---------|-------------|
| `tool()` | Define callable tools with Zod-validated parameters |
| Dynamic instructions | `instructions` as an async function for context-aware prompts |
| Tool chaining | Agent fetches weather → formats data → sends email |
| Modular architecture | Separate layers for agent, tools & email |

```bash
cd "02. Tool-Calling-in-Agent" && bun install && bun run agent-tools/tools.ts
```

**Requires:** `RESEND_API_KEY`, `FROM_EMAIL`, `EMAIL_ADDRESS` in `.env`

---

### 03. Structured AI Outputs with Zod

> **Path:** [`03. StructuredAIOutputswithZod/`](./03.%20StructuredAIOutputswithZod/)

A focused deep-dive into **Zod** — the runtime validation library that powers type-safe tool parameters and structured AI responses across the entire series.

| Concept | Description |
|---------|-------------|
| `z.object()` | Define the exact shape data must follow |
| `.safeParse()` | Validate without throwing — get detailed error reports |
| `z.infer<typeof Schema>` | One schema → runtime validation + TypeScript types |
| `outputType` | Force the entire agent response into a Zod schema |

```bash
cd "03. StructuredAIOutputswithZod" && bun install && bun run index.ts
```

---

### 04. Multi-Agent System

> **Path:** [`04. Multi-agentSystem/`](./04.%20Multi-agentSystem/)

The first **multi-agent** project — a Sales Agent delegates refund processing to a Refund Agent. Demonstrates dual model providers (Ollama + Groq) and file I/O.

| Concept | Description |
|---------|-------------|
| `agent.asTool()` | Convert an agent into a tool callable by another agent |
| Multi-model setup | Sales Agent → Ollama, Refund Agent → Groq |
| File I/O in tools | `process_Refund` appends data to `refunds.txt` |
| Agent delegation | Sales Agent decides when to hand off to Refund Agent |

```
User Query → Sales Agent (Ollama) → Refund Agent (Groq) → refunds.txt
```

```bash
cd "04. Multi-agentSystem" && bun install && bun run index.ts
```

**Requires:** `GROQ_API_KEY` in `.env`

---

### 05. Hands-off Multi-Agent System

> **Path:** [`05. Hands-off (MultiAgentSystem)/`](./05.%20Hands-off%20(MultiAgentSystem)/)

A fully **autonomous pipeline** — a Receptionist Agent triages requests and hands off to the right specialist. No follow-up questions, no human approval.

| Concept | Description |
|---------|-------------|
| `handoffs` | Agent-to-agent control transfer — the receiving agent takes over |
| `RECOMMENDED_PROMPT_PREFIX` | SDK's built-in prefix for reliable handoff behavior |
| Receptionist pattern | Central router that dispatches to specialist agents |
| Dual routing paths | Direct handoff + nested `asTool()` delegation |

```
User → Receptionist → Sales Agent or Refund Agent → Result
```

```bash
cd "05. Hands-off (MultiAgentSystem)" && bun install && bun run index.ts
```

**Requires:** `GROQ_API_KEY` in `.env`

---

### 06. Input Guardrails in Agents

> **Path:** [`06. InputGuardrailsInAgents/`](./06.%20InputGuardrailsInAgents/)

Protect your agents from off-topic or harmful inputs using **Input Guardrails**. A math-only agent rejects non-mathematical queries before the LLM even processes them.

| Concept | Description |
|---------|-------------|
| `InputGuardrail` | Define validation logic that runs before the agent |
| `tripwireTriggered` | Boolean flag that halts agent execution when `true` |
| `InputGuardrailTripwireTriggered` | Catchable error class for clean user-facing messages |
| `outputInfo` | Structured metadata explaining why input was accepted/rejected |

```typescript
// Guardrail returns { tripwireTriggered: true } → agent never runs
// Guardrail returns { tripwireTriggered: false } → agent proceeds normally
```

```bash
cd "06. InputGuardrailsInAgents" && bun install && bun run index.ts
```

**Requires:** `GROQ_API_KEY` in `.env`

---

### 07. Output Guardrails in Agents

> **Path:** [`07. OutputGuardrailsInAgents/`](./07.%20OutputGuardrailsInAgents/)

Level up from keyword-based guardrails — use a dedicated **LLM-powered guardrail agent** to intelligently validate SQL queries. The guardrail agent classifies queries as safe (read-only) or unsafe (modify/delete/drop) with structured Zod output.

| Concept | Description |
|---------|-------------|
| LLM-based guardrail | A dedicated agent classifies input safety — no keyword lists |
| Dual Zod schemas | Guardrail output (`isSafe` + `reason`) and agent output (`sqlQuery` + `explanation`) |
| `outputType` | Force agent responses into a strict Zod schema |
| Model compatibility | Structured outputs require `json_schema`-compatible models |

```typescript
// Guardrail agent returns { isSafe: true } → SQL agent runs
// Guardrail agent returns { isSafe: false, reason: "..." } → tripwire blocks
```

```bash
cd "07. OutputGuardrailsInAgents" && bun install && bun run index.ts
```

**Requires:** `GROQ_API_KEY` in `.env`

---

### 08. Conversation & Chat Threads

> **Path:** [`08. ConversationandChatThreads/`](./08.%20ConversationandChatThreads/)

Build **multi-turn, stateful conversations** — maintain chat history across sequential agent runs so your agent remembers context from previous messages. Combines tool calling, LLM-based guardrails, and thread management.

| Concept | Description |
|---------|-------------|
| `AgentInputItem[]` | Typed conversation history passed to each `run()` call |
| `result.history` | Captures full conversation state after each agent run |
| Multi-turn context | Agent remembers user's name, prior queries & earlier answers |
| Thread + guardrails | Combines conversation threads with LLM-based safety checks |

```typescript
// Push user message → run with full history → update thread
threads.push({ type: 'message', role: 'user', content: query });
const result = await run(sqlAgent, threads);
threads = result.history;
```

```bash
cd "08. ConversationandChatThreads" && bun install && bun start
```

**Requires:** `GROQ_API_KEY` in `.env`

---

### 09. Server-Side Conversations & Chat Threads

> **Path:** [`09. ServerConversation-ChatThreads/`](./09.%20ServerConversation-ChatThreads/)

Upgrade from client-side history to **OpenAI's native Conversations API** — the server stores the full chat history, and you simply pass a `conversationId` to each `run()` call. No manual state management needed.

| Concept | Description |
|---------|-------------|
| `client.conversations.create()` | Create a persistent server-side conversation thread |
| `conversationId` | Pass to `run()` — OpenAI stores & retrieves history automatically |
| Server-managed memory | No `threads` array, no `result.history` — server handles it |
| Persistent across restarts | Reuse a `conversationId` to resume any past conversation |

```typescript
// Create once, reuse forever
const conv = await client.conversations.create({});
const result = await run(sqlAgent, query, { conversationId: conv.id });
```

```bash
cd "09. ServerConversation-ChatThreads" && bun install && bun start
```

**Requires:** `OPENAI_API_KEY` in `.env`

---

### 10. Runtime-Local Context Management

> **Path:** [`10. RuntimeLocal-ContextManagement/`](./10.%20RuntimeLocal-ContextManagement/)

Ditch external conversation storage — manage context **in-memory** using the SDK's typed `RunContext<T>`. Define a custom context interface, inject user data, and let tools access it at runtime with full type safety.

| Concept | Description |
|---------|-------------|
| `RunContext<T>` | Generic typed context passed through the entire agent pipeline |
| Custom context interface | Define `MyContext` with `userId`, `userName` & async helpers |
| Context in tools | Tools receive `ctx: RunContext<MyContext>` for data access |
| In-memory threads | Stateless — history lives only in the running process |

```typescript
// Define context → pass to run() → tools access it automatically
const result = await run(agent, query, { context: myCtx });
```

```bash
cd "10. RuntimeLocal-ContextManagement" && bun install && bun run index.ts
```

**Requires:** `OPENAI_API_KEY` in `.env`

---

### 11. Streaming LLM Responses

> **Path:** [`11. StreamingLLMResponses/`](./11.%20StreamingLLMResponses/)

Stream AI-generated text **token by token** in real-time — using the SDK's built-in streaming API and a custom async generator. Creates a smooth, ChatGPT-like "typewriter" experience in the console.

| Concept | Description |
|---------|-------------|
| `{ stream: true }` | Enables streaming mode in the `run()` execution pipeline |
| `.toTextStream()` | Converts the streaming response into an async iterable of text chunks |
| `async function*` | Async generator that yields partial chunks as they arrive |
| `process.stdout.write()` | Writes raw text without newlines for smooth streaming output |

```typescript
// Stream tokens as they arrive — no waiting for the full response
const response = await run(StoryAgent, prompt, { stream: true });
for await (const val of response.toTextStream()) {
    process.stdout.write(val || '');
}
```

```bash
cd "11. StreamingLLMResponses" && bun install && bun run index.ts
```

**Requires:** `GROQ_API_KEY` in `.env`

---

## 🏗️ Architecture Overview

```mermaid
flowchart TD
    subgraph CH01["01 — First Agent"]
        direction TB
        C1["Agent + Ollama"]
    end

    subgraph CH02["02 — Tool Calling"]
        direction TB
        C2["Agent + Tools"]
        C2T1["🌦️ Weather API"]
        C2T2["📧 Email (Resend)"]
        C2 --> C2T1
        C2 --> C2T2
    end

    subgraph CH03["03 — Zod Validation"]
        direction TB
        C3["Runtime Schemas"]
    end

    subgraph CH04["04 — Multi-Agent"]
        direction TB
        C4S["💼 Sales Agent"]
        C4R["💰 Refund Agent"]
        C4S -->|asTool| C4R
    end

    subgraph CH05["05 — Hands-off"]
        direction TB
        C5REC["🏢 Receptionist"]
        C5S["💼 Sales"]
        C5R["💰 Refund"]
        C5REC -->|handoff| C5S
        C5REC -->|handoff| C5R
    end

    subgraph CH06["06 — Guardrails"]
        direction TB
        C6G["🛡️ Input Guardrail"]
        C6A["🤖 Math Agent"]
        C6G -->|validate| C6A
    end

    subgraph CH07["07 — Output Guardrails"]
        direction TB
        C7G["🛡️ Guardrail Agent"]
        C7A["🤖 SQL Agent"]
        C7G -->|LLM classify| C7A
    end

    subgraph CH08["08 — Conversations"]
        direction TB
        C8T["🧵 Thread History"]
        C8A["🤖 SQL Agent"]
        C8T -->|stateful| C8A
    end

    subgraph CH09["09 — Server Conversations"]
        direction TB
        C9C["🧵 Conversations API"]
        C9A["🤖 SQL Agent"]
        C9C -->|conversationId| C9A
    end

    subgraph CH10["10 — Runtime Context"]
        direction TB
        C10C["🧩 RunContext"]
        C10A["🤖 Query Agent"]
        C10C -->|typed context| C10A
    end

    subgraph CH11["11 — Streaming"]
        direction TB
        C11S["🌊 Text Stream"]
        C11A["🤖 Story Agent"]
        C11S -->|toTextStream| C11A
    end

    CH01 --> CH02 --> CH03 --> CH04 --> CH05 --> CH06 --> CH07 --> CH08 --> CH09 --> CH10 --> CH11

    style CH01 fill:#1e293b,stroke:#22c55e,stroke-width:2px,color:#e2e8f0
    style CH02 fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#e2e8f0
    style CH03 fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#e2e8f0
    style CH04 fill:#1e293b,stroke:#8b5cf6,stroke-width:2px,color:#e2e8f0
    style CH05 fill:#1e293b,stroke:#ef4444,stroke-width:2px,color:#e2e8f0
    style CH06 fill:#1e293b,stroke:#ec4899,stroke-width:2px,color:#e2e8f0
    style CH07 fill:#1e293b,stroke:#14b8a6,stroke-width:2px,color:#e2e8f0
    style CH08 fill:#1e293b,stroke:#06b6d4,stroke-width:2px,color:#e2e8f0
    style CH09 fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#e2e8f0
    style CH10 fill:#1e293b,stroke:#f97316,stroke-width:2px,color:#e2e8f0
    style CH11 fill:#1e293b,stroke:#06d6a0,stroke-width:2px,color:#e2e8f0
```

---

## 📂 Repository Structure

```
12. OpenAI-Agent-SDK-Series/
├── 📖 README.md                              # You are here
│
├── 01. First-Agent-Setup/                     # 🤖 Basic agent + Ollama
│   ├── index.ts
│   └── package.json
│
├── 02. Tool-Calling-in-Agent/                 # 🛠️ Weather + Email tools
│   ├── index.ts
│   ├── agent/ollama.ts
│   ├── agent-tools/tools.ts
│   └── resend/
│       ├── resend.config.ts
│       └── resend.template.ts
│
├── 03. StructuredAIOutputswithZod/            # 🛡️ Zod validation deep-dive
│   ├── index.ts
│   └── agent/ollama.ts
│
├── 04. Multi-agentSystem/                     # 🔀 Agent delegation (asTool)
│   ├── index.ts
│   ├── agent/ollama.ts
│   └── agent/groq.ts
│
├── 05. Hands-off (MultiAgentSystem)/          # 🔄 Handoffs & receptionist
│   ├── index.ts
│   └── agent/groq.ts
│
├── 06. InputGuardrailsInAgents/               # 🛡️ Input guardrails & tripwires
│   ├── index.ts
│   └── agent/groq.ts
│
├── 07. OutputGuardrailsInAgents/              # 🛡️ LLM-based output guardrails
│   ├── index.ts
│   └── agent/groq.ts
│
├── 08. ConversationandChatThreads/            # 💬 Multi-turn chat threads
│   ├── index.ts
│   └── agent/groq.ts
│
├── 09. ServerConversation-ChatThreads/        # 🧵 Server-side conversations
│   ├── index.ts
│   └── agent/groq.ts
│
├── 10. RuntimeLocal-ContextManagement/        # 🧩 Runtime-local context
│   ├── index.ts
│   └── agent/openai.ts
│
└── 11. StreamingLLMResponses/                 # 🌊 Real-time streaming
    ├── index.ts
    └── agent/openai.ts
```

---

## ⚡ Quick Start

### Step 1 — Clone the Repository

```bash
git clone <repo-url>
cd "12. OpenAI-Agent-SDK-Series"
```

### Step 2 — Start with Chapter 01

```bash
cd "01. First-Agent-Setup"
bun install
bun run index.ts
```

### Step 3 — Work Through Each Chapter

Progress through the chapters in order (01 → 11) for the best learning experience. Each chapter builds on concepts from the previous one.

---

## 🔧 Prerequisites

| Requirement | Minimum Version | Used In | Purpose |
|-------------|:--------------:|:-------:|---------| 
| [Bun](https://bun.sh) | v1.3+ | All | JavaScript/TypeScript runtime |
| [Ollama](https://ollama.com) | Latest | 01–04 | Local LLM inference server |
| [Groq Account](https://console.groq.com) | Free tier | 04–08, 11 | Cloud LLM provider |
| [OpenAI Account](https://platform.openai.com) | API key | 09, 10 | OpenAI LLM & Conversations API |
| [Resend Account](https://resend.com) | Free tier | 02 | Email delivery service |

### Ollama Models Required

```bash
ollama pull qwen2.5:1.5b   # Chapter 01
ollama pull qwen2.5:7b      # Chapters 02, 03, 04
```

### Environment Variables

| Variable | Chapters | Description |
|----------|:--------:|-------------|
| `GROQ_API_KEY` | 04, 05, 06, 07, 08, 11 | Groq API key ([get one](https://console.groq.com/keys)) |
| `OPENAI_API_KEY` | 09, 10 | OpenAI API key ([get one](https://platform.openai.com/api-keys)) |
| `RESEND_API_KEY` | 02 | Resend API key ([get one](https://resend.com/api-keys)) |
| `FROM_EMAIL` | 02 | Sender email for Resend |
| `EMAIL_ADDRESS` | 02 | Recipient email for weather reports |

---

## 📦 Common Dependencies

| Package | Purpose | Chapters |
|---------|---------|:--------:|
| `@openai/agents` | OpenAI Agent SDK — core framework | All |
| `openai` | OpenAI client (Ollama & Groq compatibility) | All |
| `zod` | Runtime schema validation & type inference | 02–11 |
| `dotenv` | Environment variable loading | All |
| `axios` | HTTP client (weather API) | 02, 04 |
| `resend` | Email delivery service | 02 |

---

## 🧠 Concept Progression

```
Chapter 01: Agent ← simple query/response
Chapter 02: Agent + Tools ← external API calls
Chapter 03: Agent + Zod ← structured, validated outputs
Chapter 04: Agent + Agent (asTool) ← multi-agent delegation
Chapter 05: Agent + Agent (handoffs) ← autonomous routing
Chapter 06: Agent + Guardrails ← input safety & validation
Chapter 07: Agent + LLM Guardrail ← intelligent output validation
Chapter 08: Agent + Threads ← multi-turn stateful conversations
Chapter 09: Agent + Conversations API ← server-managed persistent threads
Chapter 10: Agent + RunContext     ← typed runtime-local context injection
Chapter 11: Agent + Streaming      ← real-time token-by-token output
```

Each chapter introduces **one new concept** while reinforcing the previous ones. By Chapter 11, you'll have covered the full spectrum of the OpenAI Agent SDK's capabilities.

---

## 📜 License

This project is built for **learning and experimentation**. Feel free to use, modify, and build upon it.

---

<p align="center">
  <sub>Built with ❤️ using OpenAI Agents SDK, Ollama, Groq & OpenAI</sub><br/>
  <sub>From your first agent to real-time streaming. 🤖→🌊</sub>
</p>
