// console.log("Setting-up Our First Agent with OpenAI-SDK in TypeScript");
import "dotenv/config";
import {
 run, Agent, setTracingDisabled
} from '@openai/agents';
import { ollamaModel } from "./agent/ollama";

// This is will need if you are using ollama because 
setTracingDisabled(true)

const location = 'india';

const firstAgent = new Agent({
    model: ollamaModel,
    name: "Agent",
    instructions: async function () {
        if (location === "india") {
            return "Response In Namaste in Indian Language Help to resolve the queries"
        }
        else return "Response in English and a bit different from indian culture.. in US Style"  // 
    }
})

async function main() {
    const result = await run(firstAgent, "Namaste");
    console.log(result.finalOutput);
}

main();