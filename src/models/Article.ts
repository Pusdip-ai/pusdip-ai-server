export enum ArticleSource {
  Scopus = "scopus",
  Entrez = "entrez",
  DOAJ = "DOAJ",
}

export interface IArticle {
  info: {
    authors: string[];
    title: string;
    abstract: string;
    journal: {
      title: string;
      volume?: number;
      issue?: number;
      year: number;
    };
    date: {
      year: number;
      day?: number;
      month?: number;
    };
    isOpenAccess?: boolean;
  };
  links?: {
    doi?: string;
    url?: string;
    fulltext?: string;
    source?: ArticleSource;
  };
}

export class Article implements IArticle {
  constructor(
    public info: IArticle["info"],
    public links: IArticle["links"]
  ) {}
}
