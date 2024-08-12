import { askPuschatLocalStore } from "../utils/puschat";
import { fetchPuscrapperArticles } from "../utils/scrappers/puscrapper";

const q = "Apa itu hubungan cinta dan kebahagiaan?";

describe("Puschat with local articles", async () => {
  it("Answers the question based on the provided articles", async () => {
    const articles = await fetchPuscrapperArticles(q);
    const answer = await askPuschatLocalStore(q, articles.slice(0, 5));

    expect(answer).toBeDefined();
    console.log(answer);
  });
});
