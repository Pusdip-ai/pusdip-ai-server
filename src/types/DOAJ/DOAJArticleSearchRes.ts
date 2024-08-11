import { DOAJArticle } from "./DOAJArticle";

export interface DOAJArticleSearchRes {
  total: number;
  page: number;
  pageSize: number;
  timestamp: string;
  query: string;
  results: DOAJArticle[];
  next: string;
  last: string;
}
