import { Article } from "../../models/Article";
import {
  fixOriginalLanguageChain,
  puschatAnswerChain,
  standaloneQuestionChain,
} from "./chains";
import {
  convertArticlesToLocalDocs,
  convertDocsToResources,
  setupLocalVectorStore,
} from "./utils";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

export const askPuschatLocalStore = async (q: string, articles: Article[]) => {
  const fixedOriginalQ = await fixOriginalLanguageChain.invoke({
    text: q,
  });

  const standaloneQ = await standaloneQuestionChain.invoke({
    text: fixedOriginalQ,
  });

  // Setup VS
  const docs = convertArticlesToLocalDocs(articles);
  const splittedDocs = await splitter.splitDocuments(docs);
  const vectorStore = await setupLocalVectorStore(splittedDocs);
  const similarDocs = await vectorStore.similaritySearch(standaloneQ, 10);
  const resources = convertDocsToResources(similarDocs);

  const answer = await puschatAnswerChain.invoke({
    resources,
    user_question: fixedOriginalQ,
  });

  return answer;
};

export const askPuschatLocalStoreStream = async (
  q: string,
  articles: Article[]
) => {
  const fixedOriginalQ = await fixOriginalLanguageChain.invoke({
    text: q,
  });

  const standaloneQ = await standaloneQuestionChain.invoke({
    text: fixedOriginalQ,
  });

  // Setup VS
  const docs = convertArticlesToLocalDocs(articles);
  const splittedDocs = await splitter.splitDocuments(docs);
  const vectorStore = await setupLocalVectorStore(splittedDocs);
  const similarDocs = await vectorStore.similaritySearch(standaloneQ, 10);
  const resources = convertDocsToResources(similarDocs);

  const answer = await puschatAnswerChain.stream({
    resources,
    user_question: fixedOriginalQ,
  });

  return answer;
};
