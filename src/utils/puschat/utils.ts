import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { embeddings } from "../lc-blocks/llm";
import { Article } from "../../models/Article";

// TODO add new typing for generic Document<Article>
export const convertDocsToResources = (docs: Document[]) => {
  const resources = docs
    .map((doc) => {
      return `CONTENTS: 
    ${doc.pageContent}
    
    METADATA:
    Title: ${doc.metadata.title}
    Authors: ${doc.metadata.authors}
    DOI: ${doc.metadata.doi}`;
    })
    .join("\n\n");

  return resources;
};

export const convertArticlesToLocalDocs = (articles: Article[]) => {
  const localDocs: Document[] = articles.map((article) => {
    return new Document({
      pageContent: article.info.abstract || article.info.title,
      metadata: {
        title: article.info.title,
        authors: article.info.authors.join(", "),
        doi: article.links?.doi,
      },
    });
  });

  return localDocs;
};

export const setupLocalVectorStore = async (docs: Document[]) => {
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

  return vectorStore;
};
