import { run, Agent } from '@openai/agents';
import { groqModel } from './agent/openai';


interface MyContext {
    userId: string,
    userName: string
}

const CustomerQueryAgent = new Agent<MyContext>({
    name: `Customer_Query_Resolver`,
    model: groqModel,
    instructions: ({ context }) => {
        return `You are an expert agent in resolving the user's query ${context}`
    }
});


async function main(query: string, ctx: MyContext) {
    const response = await run(CustomerQueryAgent, query, {
        context: ctx
    })
    console.log(`Response: ${response.finalOutput}`)
};

main(`Hello, i can't log in`, {
    userId: "1",
    userName: "Sanidhya"
})