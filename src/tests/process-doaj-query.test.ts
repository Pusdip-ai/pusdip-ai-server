import { llm } from "../utils/lc-blocks/llm";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  convertToDOAJSearchQueryChain,
  convertToElasticQueryPrompt,
} from "../utils/scrappers/DOAJ/process-doaj-query";

describe("Process DOAJ query", () => {
  test("convertToElasticQueryPrompt", async () => {
    const eaQuery = await convertToElasticQueryPrompt
      .pipe(llm)
      .pipe(new StringOutputParser())
      .invoke({
        query: "Articles about COVID-19 in children during 2021",
      });

    console.log(eaQuery);
  });
});

describe("convertToDOAJSearchQueryChain", () => {
  test("Good Indonesian query", async () => {
    const doajQuery = await convertToDOAJSearchQueryChain.invoke({
      text: "Carikan saya artikel tentang COVID-19 di Indonesia pada tahun 2021",
    });

    console.log(doajQuery);
  });

  test("Good English query", async () => {
    const doajQuery = await convertToDOAJSearchQueryChain.invoke({
      text: "Find me articles about COVID-19 in Indonesia during 2021",
    });

    console.log(doajQuery);
  });

  test("Weird Indonesian query", async () => {
    const doajQuery = await convertToDOAJSearchQueryChain.invoke({
      text: "Cariin gw artikel abouttt penyakit hewann padaa umm padaaaaa Indonesia di tahun 2018 EH tapi bukan untuk anjing kucing adjaaa",
    });

    console.log(doajQuery);
  });

  test("Weird English query", async () => {
    const doajQuery = await convertToDOAJSearchQueryChain.invoke({
      text: "Bhey gurlie pop, like find mi ya knoww umm the state of like economy or whataever in like Malaysia or sumn idk thx!",
    });

    console.log(doajQuery);
  });
});
