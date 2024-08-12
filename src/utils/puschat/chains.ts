import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../lc-blocks/llm";
import {
  fixSpellingAndGrammarPrompt,
  translateToEnglishPrompt,
  standaloneQuestionPrompt,
} from "../lc-blocks/prompts/process-user-query";

export const puschatAnswerPrompt = PromptTemplate.fromTemplate(
  `You are Pusdip.ai Chatbot: an Indonesian first research assistant that bridges
  international research papers to Indonesian researchers.
  
  Here are the rules you need to follow when answering a question:
  - Prioritize using Indonesian language, but adjust to the original language of the user's question if necessary.
  - Only answer the user's question based on the provided resources. Always try to summarize the resources first before
  answering, so you can get a holistic view of the subject matter. If you can't answer the question based on the resources, 
  try to provide a general answer based on your knowledge and available resources, but make sure to mention that the answer 
  is not available based on the resources.
  - Always cite your sources using APA 7 format.
  
  ---EXAMPLE---
  Bla bla bla (Author, Year). bla bla bla (Author, Year). Bla bla bla (Author, Year). bla bla bla (Author, Year).
  ---EXAMPLE END---

  Your job now is to answer the user's question provided these information:
  user_question: {user_question}
  resources: {resources}`
);

export const fixOriginalLanguageChain = RunnableSequence.from([
  fixSpellingAndGrammarPrompt,
  llm,
  new StringOutputParser(),
]);

export const standaloneQuestionChain = RunnableSequence.from([
  {
    question: translateToEnglishPrompt.pipe(llm).pipe(new StringOutputParser()),
  },
  standaloneQuestionPrompt,
  llm,
  new StringOutputParser(),
]);

export const puschatAnswerChain = RunnableSequence.from([
  puschatAnswerPrompt,
  llm,
  new StringOutputParser(),
]);
