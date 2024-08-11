import { Article } from "../../models/Article";
import { searchDOAJArticles } from "../../utils/scrappers/DOAJ";

const q = "Metodologi terapi depresi pada ibu postpartum";

it("Returns a list of Articles", async () => {
  const articles = await searchDOAJArticles(q);

  expect(articles.length).toBeGreaterThan(0);

  expectTypeOf(articles).toEqualTypeOf<Article[]>();
});
