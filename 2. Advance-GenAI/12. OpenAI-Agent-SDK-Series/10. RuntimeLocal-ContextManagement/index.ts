import { run, Agent, tool, RunContext } from '@openai/agents';
import { groqModel } from './agent/openai';
import z from 'zod'

interface MyContext {
    userId: string,
    userName: string

    fetchUserInfoFromDB: () => Promise<string>
}

const getUserInfo = tool({
    name: 'get_user_info',
    description: 'Get the user info',
    parameters: z.object({
        // required empty object is mandatory if query is optional
        query: z.string().optional().describe('Optional filter keyword for plans'),
    }),
 
    execute: async (_, ctx?: RunContext<MyContext>): Promise<string | undefined> => {
        return await ctx?.context.fetchUserInfoFromDB()
        // return `Userid=${ctx?.context.userId}, \n 
        //         UserName=${ctx?.context.userName}`
    }
})

const CustomerQueryAgent = new Agent<MyContext>({
    name: `Customer_Query_Resolver`,
    model: groqModel,
    tools: [getUserInfo],
    instructions: ({ context }) => {
        return `You are an expert agent in resolving the user's query`
    }
});


async function main(query: string, ctx: MyContext) {
    const response = await run(CustomerQueryAgent, query, {
        context: ctx
    })
    console.log(`Response: ${response.finalOutput}`)
};

main(`Hey what is my name?`, {
    userId: "1",
    userName: "Sanidhya",
    fetchUserInfoFromDB: async () => "UserId=1, UserName=Sanidhya"
})