import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  fixSpellingAndGrammarPrompt,
  standaloneQuestionPrompt,
  translateToEnglishPrompt,
} from "../../lc-blocks/prompts/process-user-query";
import { llm } from "../../lc-blocks/llm";

export const convertToElasticQueryPrompt = PromptTemplate.fromTemplate(
  `Given a query, convert it into an ElasticSearch query that can be used to search
  the DOAJ API that uses ElasticSearch's Query string syntax.
  
  ElasticSearch query only accepts keywords and uses operators such as AND, OR, 
  NOT, and double quotation marks for phrases to search articles based on the given 
  keywords and operators.

  Your job is to translate the given query into term syntax and only return 
  the converted query syntax without any kind of formatting or newlines.
  
  ---EXAMPLES---
  Query: What is the definition of noise annoyance?
  Syntax: "noise annoyance"

  Query: what is the relationship between obesity and heart attack?
  Syntax: obesity AND "heart attack"

  Query: FInd me articles about work stress or job dissatisfaction in Indonesia
  Syntax: "work stress" OR "job dissatisfaction" AND Indonesia

  Query: Who created attachment theory?
  Syntax: "attachment theory"

  Query: Depression in adults, exclude children
  Syntax: depression AND adults NOT children

  Query: economic crisis during 2021 August 21
  Syntax: "economic crisis" AND 2021 AND August AND 21

  Query: Jan 18 2022 covid cases
  Syntax: Jan AND 18 AND 2022 AND "covid cases"
  ---EXAMPLES END---

  Translate this query:
  {query}`
);

export const convertToDOAJSearchQueryChain = RunnableSequence.from([
  {
    text: fixSpellingAndGrammarPrompt.pipe(llm).pipe(new StringOutputParser()),
  },
  {
    question: translateToEnglishPrompt.pipe(llm).pipe(new StringOutputParser()),
  },
  {
    query: standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser()),
  },
  convertToElasticQueryPrompt,
  llm,
  new StringOutputParser(),
]);
