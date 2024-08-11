import { llm } from "../utils/lc-blocks/llm";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  fixSpellingAndGrammarPrompt,
  standaloneQuestionPrompt,
  translateToEnglishPrompt,
} from "../utils/lc-blocks/prompts/process-user-query";

describe("Process user query prompts", () => {
  test("fixSpellingAndGrammarPrompt", async () => {
    console.log(
      await fixSpellingAndGrammarPrompt
        .pipe(llm)
        .pipe(new StringOutputParser())
        .invoke({
          text: "mi is studan, mi go tu schoo",
        })
    );

    console.log(
      await fixSpellingAndGrammarPrompt
        .pipe(llm)
        .pipe(new StringOutputParser())
        .invoke({
          text: "gw tuh ska tiramizuu loh yaaa brokk, lu apee??",
        })
    );
  });
  test("translateToEnglishPrompt", async () => {
    console.log(
      await translateToEnglishPrompt
        .pipe(llm)
        .pipe(new StringOutputParser())
        .invoke({
          text: "Halo gw adalah Brio, gw suka makan bakso, meow meow",
        })
    );
  });
  test("standaloneQuestionPrompt", async () => {
    console.log(
      await standaloneQuestionPrompt
        .pipe(llm)
        .pipe(new StringOutputParser())
        .invoke({
          question:
            "I really wanna goo to Londoonnn, but I'm confused af on the best palces to goooo",
        })
    );
  });
});
