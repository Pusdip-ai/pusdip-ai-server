import { RequestHandler } from "express";
import { Article } from "../models/Article";
import {
  askPuschatLocalStore,
  askPuschatLocalStoreStream,
} from "../utils/puschat";

export const askPuschatHandler: RequestHandler<
  undefined,
  string,
  { q: string; articles: Article[] }
> = async (req, res, next) => {
  try {
    const { q, articles } = req.body;

    const answer = await askPuschatLocalStore(q, articles);

    res.send(answer);
  } catch (err) {
    next(err);
  }
};

export const askPuschatStreamHandler: RequestHandler<
  undefined,
  string,
  { q: string; articles: Article[] }
> = async (req, res, next) => {
  try {
    const { q, articles } = req.body;

    const answer = await askPuschatLocalStoreStream(q, articles);

    for await (const chunk of answer) {
      res.write(chunk);
    }

    res.end();
  } catch (err) {
    next(err);
  }
};
