import { PromptTemplate } from "@langchain/core/prompts";

export const fixSpellingAndGrammarPrompt = PromptTemplate.fromTemplate(
  `Given a text, fix the spelling and grammar errors according to the linguistic
  rules of that language. If the text uses slang, convert it into the formal version
  of that language. Only return the corrected text in its original language without
  any kind of formatting.

  text: {text}`
);

export const translateToEnglishPrompt = PromptTemplate.fromTemplate(
  `Convert the given text into English. If you don't know the exact translation, 
  you can try to translate it based on the context. Only return the translated 
  text without unnecessary formatting.

  text: {text}`
);

export const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  `Convert the following question into a standalone question. 

  question: {question}`
);

export const summarizeTextPrompt = PromptTemplate.fromTemplate(
  `Summarize the given text in it's own language:
  
  text: {text}`
);
