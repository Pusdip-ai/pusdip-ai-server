import { Article } from "../../models/Article";
import { searchDOAJArticles } from "./DOAJ";

export const fetchPuscrapperArticles = async (
  q: string
): Promise<Article[]> => {
  // TODO use promise all/allSettled to run all at once
  const doajArticles = await searchDOAJArticles(q);

  return [...doajArticles];
};
