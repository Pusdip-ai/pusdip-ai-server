import express, { RequestHandler } from "express";
import { Article } from "../models/Article";
import { askPuschatLocalStore } from "../utils/puschat";

const puschatRouter = express.Router({ mergeParams: true });

const askPuschatHandler: RequestHandler<
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

puschatRouter.post("/ask", askPuschatHandler);

export default puschatRouter;
