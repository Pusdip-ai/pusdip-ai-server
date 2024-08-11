import axios from "axios";
import { convertToDOAJSearchQueryChain } from "./process-doaj-query";
import { DOAJArticleSearchRes } from "../../../types/DOAJ/DOAJArticleSearchRes";
import { Article, ArticleSource } from "../../../models/Article";

const baseUrl = "https://doaj.org/api";

export const searchDOAJArticles = async (
  q: string,
  pageSize = 30,
  page = 1
) => {
  // {{DOAJ_BASE_URL}}/search/articles/noise annoyance?pageSize=100&page=2
  const doajQ = await convertToDOAJSearchQueryChain.invoke({
    text: q,
  });

  const url = `${baseUrl}/search/articles/${doajQ}`;

  const res = await axios.get(url, {
    params: {
      pageSize,
      page,
    },
  });

  const data = res.data as DOAJArticleSearchRes;

  const articles: Article[] = data.results.map((result) => {
    const { bibjson } = result;

    const doi = bibjson.identifier.find((id) => id.type === "doi")?.id;
    const fulltext = bibjson.link.find((l) => l.type === "fulltext")?.url;
    const url = doi ? `https://doi.org/${doi}` : "";

    const article = new Article(
      {
        abstract: bibjson.abstract,
        title: bibjson.title,
        authors: bibjson.author.map((a) => a.name),
        date: {
          year: +bibjson.year,
        },
        journal: {
          title: bibjson.journal.title,
          year: +bibjson.year,
          issue: +bibjson.journal.number,
          volume: +bibjson.journal.volume,
        },
        isOpenAccess: true,
      },
      {
        source: ArticleSource.DOAJ,
        doi,
        url,
        fulltext,
      }
    );

    return article;
  });

  return articles;
};
