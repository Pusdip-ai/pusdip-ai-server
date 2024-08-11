export interface DOAJArticle {
  last_updated: string;
  bibjson: Bibjson;
  admin: Admin;
  id: string;
  created_date: string;
}

export interface Bibjson {
  identifier: Identifier[];
  journal: Journal;
  month: string;
  end_page: string;
  keywords: string[];
  year: string;
  start_page: string;
  subject: Subject[];
  author: Author[];
  link: Link[];
  abstract: string;
  title: string;
}

export interface Identifier {
  id: string;
  type: string;
}

export interface Journal {
  volume: string;
  number: string;
  country: string;
  issns: string[];
  publisher: string;
  language: string[];
  title: string;
}

export interface Subject {
  code: string;
  scheme: string;
  term: string;
}

export interface Author {
  affiliation: string;
  name: string;
}

export interface Link {
  content_type: string;
  type: string;
  url: string;
}

export interface Admin {
  seal: boolean;
}
