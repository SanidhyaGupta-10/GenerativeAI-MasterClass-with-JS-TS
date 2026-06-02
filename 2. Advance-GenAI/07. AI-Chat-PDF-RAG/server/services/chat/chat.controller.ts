import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from '../../db/ollama';
import type { Request, Response } from "express";
import { llm } from "../../db/groq";

/**
 * @controller chat
 * @desc Handles incoming user chat messages. It queries the Qdrant vector store to retrieve relevant document chunks (context) and passes them to the LLM to generate an informed response.
 */
async function chat(req: Request, res: Response) {
    try {
        console.log("This is service got hitted")
        /**
         * 1. Fetch Query
         * 2. than vector search
         * 3. than create response from context
         * 4. than return response
         */
        const query = (req.body.query as string) || "What to learn in DSA";

        /**
         * Setup vector store
         */
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            embeddings,
            {
                url: "http://localhost:6333",
                collectionName: `pdf_chat_v1`,
            }
        );

        /**
         * Perform similarity search directly on the vector store
         */
        const result = await vectorStore.similaritySearch(query, 2);
        console.log('Service hitted it goes to llm=>')
        /**
         * Create response from context
         */
         const response = await llm.invoke([
          { role: "system", content: `You are a helpful assistant. Use the context to answer the question.` },
           { role: "user", content: `${query} . Context: ${JSON.stringify(result)}` }
        ]);

        console.log('LLM hitted and responded')
        res.json({ 
            message: "Success", 
            data: response 
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }

}

export { chat };