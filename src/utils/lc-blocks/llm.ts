import { VertexAI, VertexAIEmbeddings } from "@langchain/google-vertexai";

export const llm = new VertexAI({
  model: "gemini-1.5-pro",
  temperature: 0,
  maxRetries: 2,
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_NONE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_NONE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_NONE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_NONE",
    },
  ],
});

export const embeddings = new VertexAIEmbeddings({
  model: "text-embedding-004",
});
