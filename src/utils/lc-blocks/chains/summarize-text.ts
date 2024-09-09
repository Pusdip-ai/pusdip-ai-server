import { RunnableSequence } from "@langchain/core/runnables";
import {
  fixSpellingAndGrammarPrompt,
  summarizeTextPrompt,
} from "../prompts/process-user-query";
import { llm } from "../llm";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const summarizeTextChain = RunnableSequence.from([
  {
    text: RunnableSequence.from([
      fixSpellingAndGrammarPrompt,
      llm,
      new StringOutputParser(),
    ]),
  },
  summarizeTextPrompt,
  llm,
  new StringOutputParser(),
]);
