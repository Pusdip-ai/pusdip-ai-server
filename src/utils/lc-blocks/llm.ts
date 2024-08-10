import { VertexAI, VertexAIEmbeddings } from "@langchain/google-vertexai";

export const llm = new VertexAI({
  model: "gemini-1.5-pro",
  temperature: 0,
  maxRetries: 2,
});

export const embeddings = new VertexAIEmbeddings({
  model: "text-embedding-004",
});
