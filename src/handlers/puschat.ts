import { RequestHandler } from "express";
import { Article } from "../models/Article";
import {
  askPuschatHistoryLocalStore,
  askPuschatLocalStore,
  askPuschatLocalStoreStream,
} from "../utils/puschat";
import { ChatHistory } from "../types/Puschat/Chat";

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

// CMT Better to use https://js.langchain.com/v0.2/docs/how_to/message_history/ in the future
export const askPuschatHistoryHandler: RequestHandler<
  undefined,
  string,
  { q: string; articles: Article[]; history: ChatHistory }
> = async (req, res, next) => {
  try {
    const { q, articles } = req.body;

    const history = req.body.history.slice(-5);

    const answer = await askPuschatHistoryLocalStore(q, articles, history);

    res.send(answer);
  } catch (err) {
    next(err);
  }
};
