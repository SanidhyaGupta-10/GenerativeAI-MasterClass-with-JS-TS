# 🤖 First Agent Setup — OpenAI Agents SDK

A minimal starter project demonstrating how to build your **first AI agent** using the [OpenAI Agents SDK](https://github.com/openai/openai-agents-js) with **TypeScript** and **Ollama** as a local LLM backend.

---

## ✨ What This Project Does

- Creates a simple conversational agent powered by a locally-running **Ollama** model (`qwen2.5:1.5b`).
- Uses the `@openai/agents` SDK to define the agent's personality, model, and execution pipeline.
- Sends a prompt to the agent and prints the response to the console.

---

## 🛠️ Tech Stack

| Layer        | Technology                                       |
| ------------ | ------------------------------------------------ |
| **Runtime**  | [Bun](https://bun.sh)                            |
| **Language** | TypeScript                                       |
| **Agent SDK**| [`@openai/agents`](https://www.npmjs.com/package/@openai/agents) |
| **LLM**      | [Ollama](https://ollama.com) (local inference)   |
| **Model**    | `qwen2.5:1.5b`                                   |

---

## 📋 Prerequisites

1. **Bun** — Install from [bun.sh](https://bun.sh)
2. **Ollama** — Install from [ollama.com](https://ollama.com) and make sure it's running:
   ```bash
   ollama serve
   ```
3. **Pull the model** used in this project:
   ```bash
   ollama pull qwen2.5:1.5b
   ```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Create a `.env` file (optional)

```bash
# .env
OPENAI_API_KEY=your_key_here   # Not needed for Ollama, but required if switching to OpenAI
```

### 3. Run the agent

```bash
bun run index.ts
```

You should see the agent's response printed to your terminal.

---

## 📂 Project Structure

```
01. First-Agent-Setup/
├── index.ts          # Main entry — agent definition & execution
├── package.json      # Dependencies & project metadata
├── tsconfig.json     # TypeScript compiler configuration
├── .gitignore        # Ignored files & directories
├── bun.lock          # Bun lockfile
└── README.md         # You are here
```

---

## 🔑 Key Concepts

### Agent Definition

```typescript
const firstAgent = new Agent({
  model: ollamaModel,
  name: "Agent",
  instructions: "You are very Helpful agent that response and resolve the user queries",
});
```

- **`model`** — The LLM backend (Ollama via `OpenAIChatCompletionsModel`).
- **`name`** — A label for your agent.
- **`instructions`** — The system prompt that shapes the agent's behavior.

### Running the Agent

```typescript
const result = await run(firstAgent, "Your prompt here");
console.log(result.finalOutput);
```

The `run()` function sends the prompt through the agent pipeline and returns the final output.

---

## ⚙️ Switching to OpenAI API

To use OpenAI's hosted models instead of Ollama, replace the model configuration:

```typescript
// Remove the Ollama client setup and use:
const agent = new Agent({
  model: "gpt-4o-mini",      // or any OpenAI model
  name: "Agent",
  instructions: "Your system prompt here",
});
```

Make sure your `OPENAI_API_KEY` is set in a `.env` file.

---

## 📦 Dependencies

| Package            | Purpose                                 |
| ------------------ | --------------------------------------- |
| `@openai/agents`   | OpenAI Agents SDK for building agents   |
| `openai`           | OpenAI client library                   |
| `dotenv`           | Load environment variables from `.env`  |
| `zod`              | Schema validation (used internally)     |
| `@types/bun`       | TypeScript types for Bun runtime        |

---

## 📄 License

This project is part of the **OpenAI Agent SDK Series** — built for learning and experimentation.
